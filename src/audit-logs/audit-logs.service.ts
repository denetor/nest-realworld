import {Injectable, Logger} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuditLog } from './entities/audit-log.entity';
import { User } from '../users/entities/user.entity';
import { AuditLogDto } from './dto/audit-log.dto';
import { config } from '../common/config/config';

@Injectable()
export class AuditLogsService {
    private logger = new Logger(AuditLogsService.name);


    constructor(
        @InjectRepository(AuditLog)
        private entitiesRepository: Repository<AuditLog>,
        @InjectRepository(User)
        private usersRepository: Repository<User>
    ) {}

    async findOne(id: number): Promise<any> {
        return this.entitiesRepository.findOne(id);
    }

    async insert(dto: AuditLogDto, req): Promise<any> {
        // proceed if enabled by configuration
        if (this.canSaveLog(dto)) {
            let entity = new AuditLog(dto);
            // add request data
            if (req && req.ip) {
                entity.ip = req.ip;
            }
            // add user data if available
            if (req && req.user && req.user.id) {
                const user = await this.usersRepository.findOne(req.user.id);
                entity.user = user;
            } else if (dto && dto.userId) {
                const user = await this.usersRepository.findOne(dto.userId);
                entity.user = user;
            }
            return await this.entitiesRepository.insert(entity);
        } else {
            // this.logger.debug('Cannot save');
            return Promise.resolve(null);
        }
    }


    /**
     * Return TRUE if this entity/operation are not excluded from logging
     */
    private canSaveLog(dto: AuditLogDto): boolean {
        if (config && config.app && config.app.features && config.app.features.auditLog &&
            config.app.features.auditLog.enable) {
            let canSave = true;
            if (dto && dto.entity && config.app.features.auditLog.excludeEntities &&
                Array.isArray(config.app.features.auditLog.excludeEntities)) {
                    if (config.app.features.auditLog.excludeEntities.indexOf(dto.entity.toLowerCase()) >= 0) {
                        canSave = false;
                    }
            }
            if (canSave && dto.operation && config.app.features.auditLog.excludeOperations &&
                Array.isArray(config.app.features.auditLog.excludeOperations) &&
                config.app.features.auditLog.excludeOperations.indexOf(dto.operation.toLowerCase()) >= 0) {
                canSave = false;
            }
            return canSave;
        } else {
            return false;
        }
    }
}
