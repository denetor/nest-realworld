import { Test, TestingModule } from '@nestjs/testing';
import { TeamsService } from './teams.service';
import { TeamRepositoryMock } from './mocks/team-repository.mock';
import { Team } from './entities/team.entity';
import { UpdateTeamDto } from './dto/update-team.dto';

describe('TeamsService', () => {
    let service: TeamsService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                TeamsService,
                {
                    provide: 'TeamRepository',
                    useClass: TeamRepositoryMock
                }
            ]
        }).compile();

        service = module.get<TeamsService>(TeamsService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should have methods defined', () => {
        expect(service.findAll).toBeDefined();
        expect(service.findOne).toBeDefined();
        expect(service.create).toBeDefined();
        expect(service.update).toBeDefined();
        expect(service.remove).toBeDefined();
    });

    it('findOne() should return an entity', () => {
        service.findOne(1).then(entity => {
            expect(typeof entity).toBe('Team');
        });
    });

    it('findAll() should return an array', () => {
        service.findAll().then(entities => {
            expect(typeof entities).toBe('Array');
        });
    });

    it('create() should return an entity', () => {
        const dto = new Team({ name: 'A Team' });
        const instance = service.create(dto).then(entity => {
            expect(typeof instance).toBe('Team');
        });
    });

    it('update() should return an entity', () => {
        const dto: UpdateTeamDto = { name: 'A Team' };
        service.update(1, dto).then(entity => {
            expect(typeof entity).toBe('Team');
        });
    });

    it('remove() should return an entity', () => {
        service.remove(1).then(entity => {
            expect(typeof entity).toBe('Team');
        });
    });
});
