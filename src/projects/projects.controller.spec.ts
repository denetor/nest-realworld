import { Test, TestingModule } from '@nestjs/testing';
import { ProjectsController } from './projects.controller';
import { ProjectsServiceMock } from './mocks/projects.service.mock';
import { CaslAbilityFactory } from '../mocks/casl-ability-factory.mock';

describe('ProjectsController', () => {
    let controller: ProjectsController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [ProjectsController],
            providers: [
                {
                    provide: 'ProjectsService',
                    useClass: ProjectsServiceMock
                },
                {
                    provide: 'CaslAbilityFactory',
                    useClass: CaslAbilityFactory
                }
            ]
        }).compile();

        controller = module.get<ProjectsController>(ProjectsController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    it('should have methods defined', () => {
        expect(controller.findAll).toBeDefined();
        expect(controller.findOne).toBeDefined();
        expect(controller.create).toBeDefined();
        expect(controller.update).toBeDefined();
        expect(controller.remove).toBeDefined();
    });
});
