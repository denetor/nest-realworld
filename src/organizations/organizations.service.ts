import {Injectable, InternalServerErrorException, NotFoundException} from '@nestjs/common';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Organization} from "./entities/organization.entity";

@Injectable()
export class OrganizationsService {

    constructor(
        @InjectRepository(Organization)
        private readonly entitiesRepository: Repository<Organization>,
    ) { }


    async create(createOrganizationDto: CreateOrganizationDto):
        Promise<Organization | InternalServerErrorException | NotFoundException> {
        const o = new Organization(createOrganizationDto);
        const result = await this.entitiesRepository.insert(o);
        if (result && result.identifiers && result.identifiers.length > 0) {
            // read just created instance
            const instance = await this.entitiesRepository.findOne(result.identifiers[0].id);
            if (instance) {
                return instance;
            } else {
                throw new NotFoundException();
            }
        } else {
            throw new InternalServerErrorException();
        }
    }

    async findAll(): Promise<Organization[] | InternalServerErrorException> {
        const entities = await this.entitiesRepository.find();
        if (entities || Array.isArray(entities)) {
            return entities;
        } else {
            throw new InternalServerErrorException();
        }
    }

    async findOne(id: number): Promise<Organization | NotFoundException> {
        const entity = await this.entitiesRepository.findOne(id);
        if (entity) {
            return entity;
        } else {
            throw new NotFoundException();
        }
    }

    async update(id: number, updateOrganizationDto: UpdateOrganizationDto):
        Promise<Organization | InternalServerErrorException | NotFoundException> {
        const entity = await this.entitiesRepository.findOne(id);
        if (entity && updateOrganizationDto) {
            entity.name = updateOrganizationDto.name || entity.name || '';
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

    async remove(id: number): Promise<Organization | undefined> {
        const entity = await this.entitiesRepository.findOne(id);
        if (entity) {
            const result = await this.entitiesRepository.delete(id);
            if (result && result.affected) {
                return entity;
            } else {
                throw new InternalServerErrorException({description: 'Error deleting entity'});
            }
        } else {
            throw new NotFoundException();
        }
    }
}
