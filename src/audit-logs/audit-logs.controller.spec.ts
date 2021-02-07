import { Test, TestingModule } from '@nestjs/testing';
import { AuditLogsController } from './audit-logs.controller';
import { AuditLogsServiceMock } from './mocks/audit-logs.service.mock';
import { AuditLogsRepositoryMock } from './mocks/audit-logs-repository.mock';

describe('AuditLogsController', () => {
    let controller: AuditLogsController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [AuditLogsController],
            providers: [
                {
                    provide: 'AuditLogsService',
                    useClass: AuditLogsServiceMock
                },
                {
                    provide: 'AuditLogsRepository',
                    useClass: AuditLogsRepositoryMock
                }
            ]
        }).compile();

        controller = module.get<AuditLogsController>(AuditLogsController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    it('should have methods defined', () => {
        expect(controller.insert).toBeDefined();
    });
});
