import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { UserRepositoryMock } from './mocks/user-repository.mock';
import { Logger } from '../mocks/logger.mock';
import { User } from './entities/user.entity';
import { Organization } from '../organizations/entities/organization.entity';
import { UserDto } from './dto/user-dto';
import { sample } from 'rxjs/operators';
import {UserChangePasswordDto} from "./dto/user-change-password-dto";

describe('UsersService', () => {
    let service: UsersService;
    const sampleDto: UserDto = {
        id: 1,
        name: 'John Francis',
        lastName: 'Dooley',
        email: 'johnfrancisdooley@example.com',
        password: '',
        mustChangePassword: false,
        isAdmin: false,
        technicalConsent: true
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UsersService,
                {
                    provide: 'UserRepository',
                    useClass: UserRepositoryMock
                },
                Logger
            ]
        }).compile();

        service = module.get<UsersService>(UsersService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should have methods defined', () => {
        expect(service.findAll).toBeDefined();
        expect(service.findMyself).toBeDefined();
        expect(service.findOne).toBeDefined();
        expect(service.findOneByEmail).toBeDefined();
        expect(service.findOneByResetPasswordToken).toBeDefined();
        expect(service.findBySearchText).toBeDefined();
        expect(service.insert).toBeDefined();
        expect(service.update).toBeDefined();
        expect(service.delete).toBeDefined();
        expect(service.changePassword).toBeDefined();
        expect(UsersService.obfuscateEmail).toBeDefined();
        expect(UsersService.obfuscateString).toBeDefined();
    });

    it('findAll() should return an array', () => {
        service.findAll().then(entities => {
            expect(typeof entities).toBe('Array');
        });
    });

    it('findMyself() should return an entity', () => {
        service.findMyself(null).then(entity => {
            expect(typeof entity).toBe('User');
        });
    });

    it('findOne() should return an entity', () => {
        service.findOne(1).then(entity => {
            expect(typeof entity).toBe('User');
        });
    });

    it('findOneByEmail() should return an entity', () => {
        service.findOneByEmail('test@example.com').then(entity => {
            expect(typeof entity).toBe('User');
        });
    });

    it('findOneByResetPasswordToken() should return an entity', () => {
        service.findOneByResetPasswordToken('mytoken').then(entity => {
            expect(typeof entity).toBe('User');
        });
    });

    it('findOneByResetPasswordToken() should return an entity', () => {
        service.findBySearchText('mysearchtext').then(entity => {
            expect(typeof entity).toBe('User');
        });
    });

    it('insert() should return an entity', () => {
        const instance = service.insert(sampleDto).then(entity => {
            expect(typeof instance).toBe('User');
        });
    });

    it('update() should return an entity', () => {
        service.update(1, sampleDto).then(entity => {
            expect(typeof entity).toBe('User');
        });
    });

    it('delete() should return an entity', () => {
        service.delete(1).then(entity => {
            expect(typeof entity).toBe('User');
        });
    });

    it('changePassword() should return an entity', () => {
        const dto: UserChangePasswordDto = {
            oldPassword: 'a password',
            newPassword: 'another password',
        };
        service.changePassword(dto, null).then(entity => {
            expect(typeof entity).toBe('User');
        });
    });

    it('obfuscateEmail() should work properly', () => {
        expect(UsersService.obfuscateEmail('johndoe@example.com')).toBe('j...e@e...e.com');
        expect(UsersService.obfuscateEmail('john.doe@example.com')).toBe('j...e@e...e.com');
        expect(UsersService.obfuscateEmail('john.doe@finance.example.com')).toBe('j...e@f...e.com');
    });

    it('obfuscateString() should work properly', () => {
        expect(UsersService.obfuscateString('hello world')).toBe('h...d');
        expect(UsersService.obfuscateString('')).toBe('');
        expect(UsersService.obfuscateString('h')).toBe('h...');
        expect(UsersService.obfuscateString('hd')).toBe('h...d');
    });
});
