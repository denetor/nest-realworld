import {AuditLog} from "../entities/audit-log.entity";

export class AuditLogsRepositoryMock {
    private sampleEntity: AuditLog = {
        id: 1,
        entity: 'Project',
        operation: 'findOne',
        oldData: null,
        newData: '{id: 1, name: \'Some project\'}',
        success: true,
        ip: '192.168.1.1',
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: 1,
        user: null,
        setUpdatedAt: () => {},
    };

    async findOne(id: number): Promise<AuditLog> {
        return this.sampleEntity;
    }

    async insert(entity: AuditLog): Promise<unknown> {
        return new Promise((resolve, reject) => {
            resolve({ identifiers: [1] });
        });
    }
}
