import {
    Injectable,
    InternalServerErrorException, Logger,
    NotFoundException
} from '@nestjs/common';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Team } from './entities/team.entity';

@Injectable()
export class TeamsService {
    constructor(
        @InjectRepository(Team)
        private readonly entitiesRepository: Repository<Team>,
        private readonly logger: Logger
    ) {}

    async create(
        createTeamDto: CreateTeamDto
    ): Promise<Team | InternalServerErrorException | NotFoundException> {
        const o = new Team(createTeamDto);
        const result = await this.entitiesRepository.insert(o);
        if (result && result.identifiers && result.identifiers.length > 0) {
            // read just created instance
            const instance = await this.entitiesRepository.findOne(
                result.identifiers[0].id
            );
            if (instance) {
                return instance;
            } else {
                throw new NotFoundException();
            }
        } else {
            throw new InternalServerErrorException();
        }
    }

    async findAll(): Promise<Team[] | InternalServerErrorException> {
        const entities = await this.entitiesRepository.find();
        if (entities || Array.isArray(entities)) {
            return entities;
        } else {
            throw new InternalServerErrorException();
        }
    }

    async findOne(id: number): Promise<Team | NotFoundException> {
        const entity = await this.entitiesRepository.findOne(id);
        if (entity) {
            return entity;
        } else {
            throw new NotFoundException();
        }
    }

    async update(
        id: number,
        updateTeamDto: UpdateTeamDto
    ): Promise<Team | InternalServerErrorException | NotFoundException> {
        const entity = await this.entitiesRepository.findOne(id);
        if (entity && updateTeamDto) {
            entity.name = updateTeamDto.name || entity.name || '';
            const result = await this.entitiesRepository.update(id, entity);
            if (result) {
                const instance = this.entitiesRepository.findOne(id);
                if (instance) {
                    return instance;
                } else {
                    throw new NotFoundException();
                }
            } else {
                throw new InternalServerErrorException();
            }
        } else {
            throw new NotFoundException();
        }
    }

    async remove(id: number): Promise<Team | InternalServerErrorException | NotFoundException> {
        const entity = await this.entitiesRepository.findOne(id);
        if (entity) {
            const result = await this.entitiesRepository.delete(id);
            if (result && result.affected) {
                return entity;
            } else {
                throw new InternalServerErrorException({
                    description: 'Error deleting entity'
                });
            }
        } else {
            throw new NotFoundException();
        }
    }
}
