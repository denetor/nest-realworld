import { Test, TestingModule } from '@nestjs/testing';
import { OwlsController } from './owls.controller';

describe('OwlsController', () => {
  let controller: OwlsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OwlsController],
    }).compile();

    controller = module.get<OwlsController>(OwlsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
