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
        return new Team({ name: 'sample team' });
    }

    async findAll(): Promise<Team[]> {
        return [this.sampleEntity];
    }

    async insert(entity: Team): Promise<any> {
        return { identifiers: [1] };
    }

    async update(id: number, dto: UpdateTeamDto): Promise<Team> {
        return this.sampleEntity;
    }

    async delete(id: number): Promise<Team> {
        return this.sampleEntity;
    }
}
