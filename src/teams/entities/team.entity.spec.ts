import { Team } from './team.entity';
import { CreateTeamDto } from '../dto/create-team.dto';

describe('Team class', () => {
    it('should be instantiable without dto', () => {
        const entity: Team = new Team(null);
        expect(entity).toBeDefined();
        expect(entity.name).toBeDefined();
    });

    it('should be instantiable with dto', () => {
        const dto: CreateTeamDto = { name: 'Drink team' };
        const entity: Team = new Team(dto);
        expect(entity).toBeDefined();
        expect(entity.name).toBeDefined();
        expect(entity.name).toBe('Drink team');
    });
});
