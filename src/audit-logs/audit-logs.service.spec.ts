import { Test, TestingModule } from '@nestjs/testing';
import { AuditLogsService } from './audit-logs.service';
import { AuditLogsServiceMock } from './mocks/audit-logs.service.mock';

describe('AuditLogsService', () => {
    let service: AuditLogsService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                {
                    provide: 'AuditLogsService',
                    useClass: AuditLogsServiceMock
                }
            ]
        }).compile();

        service = module.get<AuditLogsService>(AuditLogsService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should have methods defined', () => {
        expect(service.findOne).toBeDefined();
        expect(service.insert).toBeDefined();
    });
});
