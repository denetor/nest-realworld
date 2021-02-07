import {
    Body,
    Controller,
    InternalServerErrorException,
    Ip,
    Post,
    Request,
    Session,
    UseGuards
} from '@nestjs/common';
import { AuditLogsService } from './audit-logs.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import {
    ApiBearerAuth,
    ApiBody,
    ApiCreatedResponse,
    ApiTags
} from '@nestjs/swagger';
import { AuditLogDto } from './dto/audit-log.dto';
import { AuditLog } from './entities/audit-log.entity';

@Controller('audit-logs')
@ApiTags('audit-logs')
export class AuditLogsController {
    constructor(private readonly entitiesService: AuditLogsService) {}

    @Post()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiBody({ type: AuditLogDto })
    @ApiCreatedResponse({ description: '' })
    async insert(
        @Body() entity: AuditLogDto,
        @Request() req
    ): Promise<AuditLog | InternalServerErrorException> {
        let result = await this.entitiesService.insert(entity, req);
        if (result && result.identifiers && result.identifiers.length > 0) {
            return await this.entitiesService.findOne(result.identifiers[0].id);
        } else {
            throw new InternalServerErrorException();
        }
    }
}
