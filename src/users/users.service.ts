import {
    BadRequestException,
    ForbiddenException,
    Injectable,
    InternalServerErrorException,
    Logger,
    NotFoundException,
    UnauthorizedException,
} from '@nestjs/common';
import { Repository, Like } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserDto } from './user-dto';
import { UserChangePasswordDto } from './user-change-password-dto';
import * as argon2 from 'argon2';

@Injectable()
export class UsersService {


    constructor(
        @InjectRepository(User)
        private readonly entitiesRepository: Repository<User>,
        private readonly logger: Logger,
        // private appRolesRepository: Repository<AppRole>,
        // private mailerService: MailerService,
    ) {}


    async findAll(): Promise<User[] | undefined> {
        const entities = await this.entitiesRepository.find();
        if (entities || Array.isArray(entities)) {
            return entities;
        } else {
            throw new InternalServerErrorException();
        }
    }


    findMyself(req) {
        if (req && req.user && req.user.id) {
            return this.entitiesRepository
                .createQueryBuilder('user')
                .leftJoinAndSelect('user.userToOrganizations', 'userToOrganizations')
                .leftJoinAndSelect('userToOrganizations.organization', 'organization')
                .leftJoinAndSelect('userToOrganizations.role', 'role')
                .where('user.id = :id', { id: req.user.id })
                .getOne();
        } else {
            throw new UnauthorizedException();
        }
    }


    async findOne(id: number): Promise<User | undefined> {
        const entity = await this.entitiesRepository.findOne(id);
        if (entity) {
            return entity;
        } else {
            throw new NotFoundException();
        }
    }


    findOneByEmail(email: string): Promise<User | undefined> {
        return this.entitiesRepository
            .createQueryBuilder('users')
            .where('users.email = :email', { email })
            .getOne();
    }


    async findOneByResetPasswordToken(token: string): Promise<User | undefined> {
        const user = await this.entitiesRepository
            .createQueryBuilder('users')
            .where('users.resetPasswordToken = :token', { token })
            .getOne();
        if (user && user.id && user.email) {
            const entity = new User();
            entity.id = user.id;
            entity.email = UsersService.obfuscateEmail(user.email);
            return entity;
        } else {
            return undefined;
        }
    }


    /**
     * Find entities given part of name, lastname or email
     *
     * @param searchText
     */
    async findBySearchText(searchText: string): Promise<User[] | undefined> {
        searchText = searchText.trim().toLowerCase();
        if (searchText.length >= 2) {
            const whereConditions = [
                { name: Like('%' + searchText + '%')},
                { lastName: Like('%' + searchText + '%')},
                { email: Like('%' + searchText + '%')},
            ];
            const entities = await this.entitiesRepository
                .createQueryBuilder('users')
                .where(whereConditions)
                .getMany();
            if (entities || Array.isArray(entities)) {
                return entities;
            } else {
                throw new InternalServerErrorException();
            }
        } else {
            throw new BadRequestException('searchText must be at leas 2 characters');
        }
    }


    async insert(dto: UserDto) {
        this.logger.debug('UsersService.insert()');
        this.logger.debug({dto});
        const u = new User();
        u.name = dto.name || '';
        u.lastName = dto.lastName || '';
        u.email = dto.email || '';
        u.password = dto.password || '';
        u.technicalConsent = dto.technicalConsent || false;
        // if (!dto.appRoleId) {
        //     // default role, in not specified, is user
        //     const userRole = await this.appRolesRepository.createQueryBuilder('appRole')
        //         .where('name = :name', { name: 'user'})
        //         .getOne();
        //     if (userRole) {
        //         u.appRole = userRole;
        //     }
        // } else {
        //     // if role id specified, sets that role
        //     const userRole = await this.appRolesRepository.findOne(dto.appRoleId);
        //     if (userRole) {
        //         u.appRole = userRole;
        //     }
        // }
        const result = await this.entitiesRepository.insert(u);
        if (result && result.identifiers && result.identifiers.length > 0) {
            const entity = await this.entitiesRepository.findOne(result.identifiers[0].id);
            if (entity) {
                this.logger.debug({entity});
                return entity;
            } else {
                this.logger.debug('NotFoundException');
                throw new NotFoundException();
            }
        } else {
            this.logger.debug('InternalServerErrorException');
            throw new InternalServerErrorException();
        }
    }


    async update(id, dto: UserDto): Promise<User | undefined> {
        this.logger.debug('UsersService.update()');
        this.logger.debug({id, dto});
        // read current entity
        const entity = await this.entitiesRepository.findOne(id);
        if (entity && dto) {
            entity.name = dto.name || entity.name || '';
            entity.lastName = dto.lastName || entity.lastName || '';
            entity.email = dto.email || entity.email || '';
            // note: must use this long form or 'false' value seems the field is not filled
            if (dto.mustChangePassword === true || dto.mustChangePassword === false) {
                entity.mustChangePassword = dto.mustChangePassword;
            } else if (entity.mustChangePassword === true || entity.mustChangePassword === false) {
                // do nothing, the value remains
            } else {
                // set false if you have no clue
                entity.mustChangePassword = false;
            }
            const result = await this.entitiesRepository.update(id, entity);
            if (result) {
                const instance = this.entitiesRepository.findOne(id);
                if (instance) {
                    this.logger.debug({instance});
                    return instance;
                } else {
                    this.logger.debug('NotFoundException');
                    throw new NotFoundException();
                }
            } else {
                this.logger.debug('InternalServerErrorException');
                throw new InternalServerErrorException();
            }
        } else {
            this.logger.debug('NotFoundException');
            throw new NotFoundException();
        }
    }


    async delete(id: number): Promise<User | undefined> {
        this.logger.debug('UsersService.delete()');
        this.logger.debug({id});
        const entity = await this.entitiesRepository.findOne(id);
        if (entity) {
            const result = await this.entitiesRepository.delete(id);
            if (result && result.affected) {
                this.logger.debug({result});
                return entity;
            } else {
                throw new InternalServerErrorException({description: 'Error deleting entity'});
            }
        } else {
            this.logger.debug('NotFoundException');
            throw new NotFoundException();
        }
    }


    // /**
    //  * Sets a password recover token for an user and sends him a welcome email with a reset password link
    //  *
    //  * @param {UserRecoverPasswordDto} entity
    //  */
    // async notifyCreation(entity: UserRecoverPasswordDto) {
    //     if (entity && entity.email) {
    //         // read user by email
    //         const user = await this.findOneByEmail(entity.email);
    //         // update user with a password reset token (random 20-some chars string)
    //         if (user) {
    //             user.resetPasswordToken = Math.random().toString(36).substring(2, 15) +
    //                 Math.random().toString(36).substring(2, 15);
    //             const updatedUser = await this.entitiesRepository.save(user);
    //
    //             // send email with reset link
    //             let config = new Config();
    //             const mailData = {
    //                 to: user.email,
    //                 from: config.params.mail.from,
    //                 subject: 'Benvenuto in ' + config.app.name,
    //                 templateName: 'notify-creation',
    //                 templateFields: {
    //                     displayName: user.title + ' ' + user.name + ' ' + user.lastName,
    //                     appName: config.app.name,
    //                     resetPasswordUrl: config.params.url + '/reset-password/' + user.resetPasswordToken,
    //                 }
    //             };
    //             await this.mailerService.send(mailData);
    //
    //             return updatedUser;
    //         } else {
    //             throw new NotFoundException('Email not found');
    //         }
    //     } else {
    //         throw new NotFoundException('Invalid or missing email');
    //     }
    // }
    //
    //
    //
    // /**
    //  * Sets a password recover token for an user and sends him an email with recovery instructions.
    //  *
    //  * @param {UserRecoverPasswordDto} entity
    //  */
    // async recoverPassword(entity: UserRecoverPasswordDto) {
    //     if (entity && entity.email) {
    //         // read user by email
    //         const user = await this.findOneByEmail(entity.email);
    //         // update user with a password reset token (random 20-some chars string)
    //         if (user) {
    //             user.resetPasswordToken = Math.random().toString(36).substring(2, 15) +
    //                 Math.random().toString(36).substring(2, 15);
    //             const updatedUser = await this.entitiesRepository.save(user);
    //
    //             // send email with reset link
    //             let config = new Config();
    //             const mailData = {
    //                 to: user.email,
    //                 from: config.params.mail.from,
    //                 subject: 'Reset password ' + config.app.name,
    //                 templateName: 'recover-password',
    //                 templateFields: {
    //                     displayName: user.title + ' ' + user.name + ' ' + user.lastName,
    //                     appName: config.app.name,
    //                     resetPasswordUrl: config.params.url + '/reset-password/' + user.resetPasswordToken,
    //                 }
    //             };
    //             await this.mailerService.send(mailData);
    //
    //             return {
    //                 email: updatedUser.email,
    //                 updatedAt: updatedUser.updatedAt,
    //             };
    //         } else {
    //             throw new NotFoundException('Email not found');
    //         }
    //     } else {
    //         throw new NotFoundException('Invalid or missing email');
    //     }
    // }
    //
    //
    // /**
    //  * Perform password reset
    //  */
    // async resetPassword(id: number, entity: UserResetPasswordDto): Promise<any | undefined> {
    //     if (id && entity && entity.password && entity.token && entity.password.length >= 8) {
    //         const user = await this.entitiesRepository.findOne(id);
    //         if (user && user.resetPasswordToken && user.resetPasswordToken === entity.token) {
    //             user.resetPasswordToken = null;
    //             user.password = await argon2.hash(entity.password);
    //             const updatedUser = await this.entitiesRepository.save(user);
    //
    //             // send mail with reset password notification
    //             let config = new Config();
    //             const mailData = {
    //                 to: user.email,
    //                 from: config.params.mail.from,
    //                 subject: 'Reset password ' + config.app.name,
    //                 templateName: 'reset-password',
    //                 templateFields: {
    //                     displayName: user.title + ' ' + user.name + ' ' + user.lastName,
    //                     appName: config.app.name,
    //                 }
    //             };
    //             await this.mailerService.send(mailData);
    //
    //             return updatedUser;
    //         } else {
    //             throw new NotFoundException('User not found');
    //         }
    //     } else {
    //         throw new NotFoundException('Invalid or missing data');
    //     }
    // }


    /**
     * Change password for currently logged user
     *
     * @param {UserChangePasswordDto} entity
     * @param req
     */
    async changePassword(entity: UserChangePasswordDto, req): Promise<User | undefined> {
        this.logger.debug('UsersService.changePassword()');
        if (req && req.user && req.user.id) {
            this.logger.debug({id: req.user.id});
            if (entity && entity.oldPassword && entity.newPassword) {
                // load user
                const user = await this.entitiesRepository.findOne(req.user.id);
                if (user) {
                    // check if old password matches
                    const bufPassword = Buffer.from(entity.oldPassword);
                    const check = await argon2.verify(user.password, bufPassword);
                    if (check) {
                        // change password and reset password flags
                        user.password = await argon2.hash(entity.newPassword);
                        user.resetPasswordToken = null;
                        user.mustChangePassword = false;
                        const instance = await this.entitiesRepository.save(user);
                        if (instance) {
                            this.logger.debug('password changed');
                            return instance;
                        } else {
                            this.logger.debug('NotFoundException');
                            throw new NotFoundException({ description: 'Entity updated, but failed reading it back' });
                        }
                        // const result = await this.entitiesRepository.save(user);
                        // if (result && result.identifiers && result.identifiers.length > 0) {
                        //     const instance = await this.entitiesRepository.findOne(result.identifiers[0].id);
                        //     if (instance) {
                        //         return instance;
                        //     } else {
                        //         throw new NotFoundException({description: 'Entity updated, but failed reading it back'});
                        //     }
                        // } else {
                        //     throw new InternalServerErrorException({description: 'Failed updating entity'});
                        // }
                    } else {
                        this.logger.debug('ForbiddenException');
                        throw new ForbiddenException({ description: 'Old password does not match' });
                    }
                } else {
                    this.logger.debug('NotFoundException');
                    throw new NotFoundException('Entity not found');
                }
            } else {
                this.logger.debug('BadRequestException');
                throw new BadRequestException({ description: 'Invalid or missing parameters' });
            }
        } else {
            this.logger.debug('UnauthorizedException');
            throw new UnauthorizedException();
        }
    }


    /**
     * Return obfuscated version of email
     * Return obfuscated version of email
     *
     * @param email
     */
    private static obfuscateEmail(email: string) {
        let ret = '';
        const pieces = email.split('@');
        // obfuscate username
        if (pieces && pieces.length > 0) {
            ret += UsersService.obfuscateString(pieces[0]);
        }
        ret += '@';
        // obfuscate domain, without first level
        if (pieces && pieces.length > 1) {
            const domainPieces = pieces[1].split('.');
            let domain = '';
            for (let i = 0; i < domainPieces.length - 1; i++) {
                domain += domainPieces[i];
            }
            ret += UsersService.obfuscateString(domain);
            // append TLD
            ret += '.' + domainPieces[domainPieces.length - 1];
        }
        return ret;
    }


    private static obfuscateString(s: string) {
        let ret = '';
        if (s && s.length > 0) {
            ret += s[0] + '...';
        }
        if (s && s.length > 1) {
            ret += s[s.length - 1];
        }
        return ret;
    }


}
