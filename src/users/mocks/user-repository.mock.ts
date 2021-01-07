import { User } from '../entities/user.entity';
import { UserDto } from '../dto/user-dto';

export class UserRepositoryMock {
    private sampleEntity: User = {
        id: 1,
        name: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        password: '',
        mustChangePassword: false,
        technicalConsent: true,
        marketingConsent: false,
        profilingConsent: false,
        isAdmin: false,
        resetPasswordToken: null,
        createdAt: new Date(),
        updatedAt: new Date(),
        lastLoginAt: new Date(),
        projects: [],
        hashPassword: async () => {}
    };

    async findOne(id: number): Promise<User> {
        return this.sampleEntity;
    }

    async findAll(): Promise<User[]> {
        return [this.sampleEntity];
    }

    async insert(entity: User): Promise<any> {
        return { identifiers: [1] };
    }

    async update(id: number, dto: UserDto): Promise<User> {
        return this.sampleEntity;
    }

    async delete(id: number): Promise<User> {
        return this.sampleEntity;
    }
}
