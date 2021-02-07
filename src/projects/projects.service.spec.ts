import { Test, TestingModule } from '@nestjs/testing';
import { ProjectsService } from './projects.service';
import { ProjectRepositoryMock } from './mocks/project-repository.mock';
import { Project } from './entities/project.entity';
import { UpdateProjectDto } from './dto/update-project.dto';

describe('ProjectsService', () => {
    let service: ProjectsService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ProjectsService,
                {
                    provide: 'ProjectRepository',
                    useClass: ProjectRepositoryMock
                },
            ]
        }).compile();

        service = module.get<ProjectsService>(ProjectsService);
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
        expect(entity.name).toBe('Project Apollo');
    });

    it('findAll() should return an array', async () => {
        const entities = await service.findAll();
        expect(entities).toBeDefined();
        expect(entities[0]).toBeDefined();
        expect(entities[0].id).toBeDefined();
        expect(entities[0].id).toBe(1);
    });

    it('create() should return an entity', async () => {
        const dto = new Project({ name: 'Project Manhattan' });
        const instance = await service.create(dto);
        expect(instance).toBeDefined();
        expect(instance.name).toBeDefined();
        expect(instance.name).toBe('Project Apollo');
    });

    it('update() should return an entity', async () => {
        const dto: UpdateProjectDto = { name: 'Project Manhattan' };
        const instance = await service.update(1, dto);
        expect(instance).toBeDefined();
        expect(instance.name).toBeDefined();
    });

    it('remove() should return an entity', async () => {
        const instance = await service.remove(1);
        expect(instance).toBeDefined();
        expect(instance.name).toBeDefined();
    });
});
