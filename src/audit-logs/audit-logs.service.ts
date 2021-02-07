import { Injectable, Request } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuditLog } from './entities/audit-log.entity';
import { User } from '../users/entities/user.entity';
import { AuditLogDto } from './dto/audit-log.dto';

@Injectable()
export class AuditLogsService {
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
    }
}
