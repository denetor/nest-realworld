import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UserRepositoryMock } from '../users/mocks/user-repository.mock';
import { JwtServiceMock } from '../mocks/jwt.service.mock';
import { UsersServiceMock } from '../users/mocks/users.service.mock';

describe('AuthService', () => {
    let service: AuthService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AuthService,
                {
                    provide: 'UserRepository',
                    useClass: UserRepositoryMock
                },
                {
                    provide: 'UsersService',
                    useClass: UsersServiceMock
                },
                {
                    provide: 'JwtService',
                    useClass: JwtServiceMock
                }
            ]
        }).compile();

        service = module.get<AuthService>(AuthService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should have methods defined', () => {
        expect(service.validateUser).toBeDefined();
        expect(service.login).toBeDefined();
    });

    // TODO: how do we mock usersService when user does not exist?
    // it('validateUser should fail when user does not exist', async () => {
    //     expect.assertions(2);
    //     try {
    //         await service.validateUser('zzz', 'zzz');
    //     } catch (e) {
    //         expect(e.status).toBeDefined();
    //         expect(e.status).toBe(401);
    //     }
    // });

    it('validateUser should fail when password is missing', async () => {
        expect.assertions(2);
        try {
            await service.validateUser('zzz', '');
        } catch (e) {
            expect(e.status).toBeDefined();
            expect(e.status).toBe(401);
        }
    });

    // TODO how do we mock argon2?
    // it('validateUser should fail when password is not matched', async () => {
    //     expect.assertions(2);
    //     try {
    //         await service.validateUser('john@example.com', 'zzz');
    //     } catch (e) {
    //         expect(e.status).toBeDefined();
    //         expect(e.status).toBe(401);
    //     }
    // });


    it('login returns a token', async () => {
        const response = await service.login({ a: 'a', b: 'b' });
        expect(response).toBeDefined();
        expect(response.access_token).toBeDefined();
        expect(typeof response.access_token).toBe('string');
    });
});
