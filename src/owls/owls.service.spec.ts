import { Test, TestingModule } from '@nestjs/testing';
import { OwlsService } from './owls.service';

describe('OwlsService', () => {
  let service: OwlsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OwlsService],
    }).compile();

    service = module.get<OwlsService>(OwlsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
