import { Team } from '../entities/team.entity';
import { UpdateTeamDto } from '../dto/update-team.dto';

export class TeamRepositoryMock {
    private sampleEntity: Team = {
        id: 1,
        name: 'Drink team',
        createdAt: new Date(),
        updatedAt: new Date(),
    };

    async findOne(id: number): Promise<Team> {
        return this.sampleEntity;
    }

    async find(): Promise<Team[]> {
        return new Promise((resolve, reject) => {
            resolve([this.sampleEntity]);
        });
    }

    async insert(entity: Team): Promise<unknown> {
        return new Promise((resolve, reject) => {
            resolve({ identifiers: [1] });
        });
    }

    async update(id: number, dto: UpdateTeamDto): Promise<Team> {
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
