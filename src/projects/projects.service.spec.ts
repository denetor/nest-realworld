import { Test, TestingModule } from '@nestjs/testing';
import { ProjectsService } from './projects.service';
import { ProjectRepositoryMock } from './mocks/project-repository.mock';
import { Logger } from '../mocks/logger.mock';

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
                Logger
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
});
