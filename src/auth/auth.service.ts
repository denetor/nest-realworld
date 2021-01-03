import { BadRequestException, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as argon2 from 'argon2';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {


    constructor(
        @InjectRepository(User)
        private entitiesRepository: Repository<User>,
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
        private readonly logger: Logger,
    ) {}


    async validateUser(email: string, password: string): Promise<any> {
        this.logger.debug('AuthService.validateUser()');
        this.logger.debug({email, password});
        const user: any = await this.usersService.findOneByEmail(email);
        this.logger.debug({user});
        if (user && user.password && password) {
            const bufPassword = Buffer.from(password);
            const check = await argon2.verify(user.password, bufPassword);
            if (check) {
                this.logger.debug('Password matched');
                const { password, ...result } = user;
                return result;
            } else {
                this.logger.debug('Password not matched');
                // throw new UnauthorizedException('Bad username or password');
                return null;
            }
        } else {
            this.logger.debug('User not found: ' + email);
            // throw new UnauthorizedException('Bad username or password');
            return null;
        }
    }


    async login(user: any) {
        this.logger.debug('AuthService.login()');
        this.logger.debug({user});
        const payload = { username: user.username, sub: user.id };
        this.logger.debug({payload});
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}
