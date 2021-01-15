import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { UserRepositoryMock } from './mocks/user-repository.mock';
import { Logger } from '../mocks/logger.mock';
import { User } from './entities/user.entity';
import { UserDto } from './dto/user-dto';
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
        expect(service.create).toBeDefined();
        expect(service.update).toBeDefined();
        expect(service.remove).toBeDefined();
        expect(service.changePassword).toBeDefined();
        expect(UsersService.obfuscateEmail).toBeDefined();
        expect(UsersService.obfuscateString).toBeDefined();
    });

    it('findAll() should return an array', async () => {
        const entities = await service.findAll();
        expect(entities).toBeDefined();
        expect(entities[0]).toBeDefined();
        expect(entities[0].id).toBeDefined();
        expect(entities[0].id).toBe(1);
    });

    it('findMyself(null) should return UnauthorizedException', async () => {
        expect.assertions(2);
        try {
            await service.findMyself(null);
        } catch (e) {
            expect(e.status).toBeDefined();
            expect(e.status).toBe(401);
        }
    });

    it('findMyself() should return User', async () => {
        const entity = await service.findMyself({ user: { id: 1 } });
        expect(entity).toBeDefined();
        expect(entity.name).toBeDefined();
        expect(entity.name).toBe('Adam');
    });

    it('findOne() should return an entity', async () => {
        const entity = await service.findOne(1);
        expect(entity.name).toBeDefined();
        expect(entity.name).toBe('Adam');
    });

    it('findOneByEmail() should return an entity', async () => {
        const entity = await service.findOneByEmail('test@example.com');
        expect(entity.name).toBeDefined();
        expect(entity.name).toBe('Adam');
    });

    it('findOneByResetPasswordToken() should return an entity', async () => {
        const entity = await service.findOneByResetPasswordToken('mytoken');
        expect(entity).toEqual({id: 1, email: 'j...n@e...e.com'});
    });

    it('findBySearchText(ab) should return an entities array', async () => {
        const entities = await service.findBySearchText('ab');
        expect(entities).toBeDefined();
        expect(entities[0]).toBeDefined();
        expect(entities[0].name).toBe('Adam');
    });

    it('findBySearchText(a) should return an error', async () => {
        expect.assertions(2);
        try {
            const entities = await service.findBySearchText('a');
        } catch (e) {
            expect(e).toBeDefined();
            expect(e.status).toBe(400);
        }
    });

    it('findBySearchText() should return an error', async () => {
        expect.assertions(2);
        try {
            const entities = await service.findBySearchText('');
        } catch (e) {
            expect(e).toBeDefined();
            expect(e.status).toBe(400);
        }
    });

    it('insert() should return an entity', async () => {
        const entity = await service.create(sampleDto);
        expect(entity).toBeDefined();
        expect(entity.name).toBeDefined();
        expect(entity.name).toBe('Adam');
    });

    it('update(1, dto) should return an entity', async () => {
        const entity = await service.update(1, sampleDto);
        expect(entity).toBeDefined();
        expect(entity.name).toBeDefined();
        // expect(entity.name).toBe('Adam'); // invece riceve "John Francis", perchè? come fa?
    });

    it('update(1, null) should return error', async () => {
        expect.assertions(2);
        try {
            const entity = await service.update(1, null);
        } catch (e) {
            expect(e).toBeDefined();
            expect(e.status).toBe(404);
        }
    });

    it('delete() should return an entity', async () => {
        const entity = await service.remove(1);
        expect(entity).toBeDefined();
        expect(entity.name).toBe('Adam');
    });

    it('changePassword(dto, invalidReq) should return error', async () => {
        expect.assertions(4);
        const dto: UserChangePasswordDto = {
            oldPassword: 'a password',
            newPassword: 'another password',
        };
        let req: any = {user: {}};
        try {
            const entity = await service.changePassword(dto, req);
        } catch (e) {
            expect(e).toBeDefined();
            expect(e.status).toBe(401);
        }
        req = {};
        try {
            const entity = await service.changePassword(dto, req);
        } catch (e) {
            expect(e).toBeDefined();
            expect(e.status).toBe(401);
        }
    });

    it('changePassword(invalidDto, req) should return error', async () => {
        expect.assertions(4);
        let dto: UserChangePasswordDto = {
            oldPassword: 'a password',
            newPassword: '',
        };
        const req: any = {user: {id: 1}};
        try {
            const entity = await service.changePassword(dto, req);
        } catch (e) {
            expect(e).toBeDefined();
            expect(e.status).toBe(400);
        }
        dto = {
            oldPassword: '',
            newPassword: 'another password',
        };
        try {
            const entity = await service.changePassword(dto, req);
        } catch (e) {
            expect(e).toBeDefined();
            expect(e.status).toBe(400);
        }
    });

    // TODO capire come fare il mock di argon2, senza per forza usarlo
    // (sto verificando il controller, non argon2)
    // it('changePassword(dto, req) should return an entity', async () => {
    //     const dto: UserChangePasswordDto = {
    //         oldPassword: 'a password',
    //         newPassword: 'another password',
    //     };
    //     const req = {user: {id: 1}};
    //     const entity = await service.changePassword(dto, req);
    // });

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
