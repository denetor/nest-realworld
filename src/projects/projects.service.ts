import {
    Injectable,
    InternalServerErrorException,
    NotFoundException,
    Logger
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from './entities/project.entity';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@Injectable()
export class ProjectsService {
    private logger = new Logger(ProjectsService.name);

    /**
     *
     * @param entitiesRepository
     */
    constructor(
        @InjectRepository(Project)
        private readonly entitiesRepository: Repository<Project>,
    ) {}

    /**
     *
     * @param createProjectDto
     */
    async create(
        createProjectDto: CreateProjectDto
    ): Promise<Project | InternalServerErrorException | NotFoundException> {
        const o = new Project(createProjectDto);
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

    /**
     *
     */
    async findAll(): Promise<Project[] | InternalServerErrorException> {
        const entities = await this.entitiesRepository.find();
        if (entities || Array.isArray(entities)) {
            return entities;
        } else {
            throw new InternalServerErrorException();
        }
    }

    /**
     *
     * @param userId
     */
    async findAllByUser(
        userId: number
    ): Promise<Project[] | InternalServerErrorException> {
        this.logger.debug('ProjectsService.findAllByUser()');
        this.logger.debug({userId});
        const entities = await this.entitiesRepository
            .createQueryBuilder('project')
            .where('project.ownerId = :userId', { userId })
            .getMany();
        if (entities || Array.isArray(entities)) {
            return entities;
        } else {
            throw new InternalServerErrorException();
        }
    }

    /**
     *
     * @param id
     */
    async findOne(id: number): Promise<Project | NotFoundException> {
        const entity = await this.entitiesRepository.findOne(id);
        if (entity) {
            return entity;
        } else {
            throw new NotFoundException();
        }
    }

    /**
     *
     * @param id
     * @param updateProjectDto
     */
    async update(
        id: number,
        updateProjectDto: UpdateProjectDto
    ): Promise<Project | InternalServerErrorException | NotFoundException> {
        const entity = await this.entitiesRepository.findOne(id);
        if (entity && updateProjectDto) {
            entity.name = updateProjectDto.name || entity.name || '';
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

    /**
     *
     * @param id
     */
    async remove(
        id: number
    ): Promise<Project | InternalServerErrorException | NotFoundException> {
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
