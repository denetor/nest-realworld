import { Test, TestingModule } from '@nestjs/testing';
import { OrganizationsController } from './organizations.controller';
import { OrganizationsService } from './organizations.service';
import { OrganizationsServiceMock } from './mocks/organizations.service.mock';

describe('OrganizationsController', () => {
    let controller: OrganizationsController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [OrganizationsController],
            providers: [
                {
                    provide: 'OrganizationsService',
                    useClass: OrganizationsServiceMock
                }
            ]
        }).compile();

        controller = module.get<OrganizationsController>(
            OrganizationsController
        );
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
