import { Test, TestingModule } from '@nestjs/testing';
import {UsersController} from "./users.controller";
import {UsersServiceMock} from "./mocks/users.service.mock";

describe('UsersController', () => {
    let controller: UsersController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [UsersController],
            providers: [
                {
                    provide: 'UsersService',
                    useClass: UsersServiceMock
                }
            ]
        }).compile();

        controller = module.get<UsersController>(UsersController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    it('should have methods defined', () => {
        expect(controller.findAll).toBeDefined();
        expect(controller.findMyself).toBeDefined();
        expect(controller.findOne).toBeDefined();
        expect(controller.findOneByEmail).toBeDefined();
        expect(controller.findOneByResetPasswordToken).toBeDefined();
        expect(controller.findBySearchText).toBeDefined();
        expect(controller.insert).toBeDefined();
        expect(controller.changePassword).toBeDefined();
        expect(controller.updateById).toBeDefined();
        expect(controller.delete).toBeDefined();
    });
});
