import { AuditLogDto } from '../dto/audit-log.dto';

export class AuditLogsServiceMock {
    findOne(id: number) {}

    insert(dto: AuditLogDto, req) {}
}
