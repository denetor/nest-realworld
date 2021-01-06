import { Test, TestingModule } from '@nestjs/testing';
import { TeamsController } from './teams.controller';
import { TeamsService } from './teams.service';
import { TeamsServiceMock } from './mocks/teams.service.mock';

describe('TeamsController', () => {
    let controller: TeamsController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [TeamsController],
            providers: [
                {
                    provide: 'TeamsService',
                    useClass: TeamsServiceMock
                }
            ]
        }).compile();

        controller = module.get<TeamsController>(TeamsController);
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
