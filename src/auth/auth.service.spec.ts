import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UserRepositoryMock } from '../users/mocks/user-repository.mock';
import { Logger } from '../mocks/logger.mock';
import { UsersService } from '../users/users.service';
import { JwtServiceMock } from '../mocks/jwt.service.mock';

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
                UsersService,
                {
                    provide: 'JwtService',
                    useClass: JwtServiceMock
                },
                Logger
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

    it('validateUser should fail when user is not existing', () => {
        service.validateUser('zzz', 'zzz').then(response => {
            expect(response).toBe(null);
        });
    });

    it('validateUser should fail when password is missing', () => {
        service.validateUser('zzz', '').then(response => {
            expect(response).toBe(null);
        });
    });

    it('validateUser should fail when password is not matched', () => {
        service.validateUser('john@example.com', 'zzz').then(response => {
            expect(response).toBe(null);
        });
    });

    it('login returns a token', () => {
        service.login({a: 'a', b: 'b'}).then(response => {
            expect(response.access_token).toBe('a signed token');
        });
    });
});
