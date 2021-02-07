import { AuditLog } from './audit-log.entity';

describe('AuditLog', () => {
  it('should be defined', () => {
    expect(new AuditLog(null)).toBeDefined();
  });
});
