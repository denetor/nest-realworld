import { User } from '../entities/user.entity';
import { UserDto } from '../dto/user-dto';

export class UserRepositoryMock {
    private sampleEntity: User = {
        id: 1,
        name: 'Adam',
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
        hashPassword: async () => {},
    };

    async findOne(id: number): Promise<User> {
        return this.sampleEntity;
    }

    async find(): Promise<User[]> {
        return new Promise((resolve, reject) => {
            resolve([this.sampleEntity]);
        });
    }

    createQueryBuilder(): User | User[] | any {
        const result = {
            leftJoinAndSelect: () => {
                return result;
            },
            where: () => {
                return result;
            },
            getOne: () => {
                return this.sampleEntity;
            },
            getMany: () => {
                const a: User[] = [];
                a.push(this.sampleEntity);
                a.push(this.sampleEntity);
                return a;
            },
        };
        return result;
    }

    async findAll(): Promise<User[]> {
        return new Promise((resolve, reject) => {
            resolve([this.sampleEntity]);
        });
    }

    async insert(entity: User): Promise<any> {
        return new Promise((resolve, reject) => {
            resolve({ identifiers: [1] });
        });
    }

    async update(id: number, dto: UserDto): Promise<User> {
        return new Promise((resolve, reject) => {
            resolve(this.sampleEntity);
        });
    }

    async delete(id: number): Promise<unknown> {
        return new Promise((resolve, reject) => {
            resolve({affected: 1});
        });
    }



}
