import { Test, TestingModule } from '@nestjs/testing';
import { TeamsService } from './teams.service';
import { TeamRepositoryMock } from './mocks/team-repository.mock';
import { Team } from './entities/team.entity';
import { UpdateTeamDto } from './dto/update-team.dto';
import {Logger} from "../mocks/logger.mock";

describe('TeamsService', () => {
    let service: TeamsService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                TeamsService,
                {
                    provide: 'TeamRepository',
                    useClass: TeamRepositoryMock
                },
                Logger
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

    it('findOne() should return an entity', async () => {
        const entity = await service.findOne(1);
        expect(entity.name).toBeDefined();
        expect(entity.name).toBe('Drink team');
    });

    it('findAll() should return an array', async () => {
        const entities = await service.findAll();
        expect(entities).toBeDefined();
        expect(entities[0]).toBeDefined();
        expect(entities[0].id).toBeDefined();
        expect(entities[0].id).toBe(1);
    });

    it('create() should return an entity', async () => {
        const dto = new Team({ name: 'A Team' });
        const instance = await service.create(dto);
        expect(instance).toBeDefined();
        expect(instance.name).toBeDefined();
        expect(instance.name).toBe('Drink team');
    });

    it('update() should return an entity', async () => {
        const dto: UpdateTeamDto = { name: 'A Team' };
        const instance = await service.update(1, dto);
        expect(instance).toBeDefined();
        expect(instance.name).toBeDefined();
    });

    it('remove() should return an entity', async() => {
        const result = await service.remove(1);
        const instance = await service.remove(1);
        expect(instance).toBeDefined();
        expect(instance.name).toBeDefined();
    });
});
