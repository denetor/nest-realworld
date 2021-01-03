import { Organization } from '../entities/organization.entity';
import {UpdateOrganizationDto} from "../dto/update-organization.dto";

export class OrganizationRepositoryMock {
    private sampleEntity: Organization = {
        id: 1,
        name: 'ACME inc.',
        createdAt: new Date(),
        updatedAt: new Date(),
    };

    async findOne(id: number): Promise<Organization> {
        return new Organization({ name: 'ACME' });
    }

    async findAll(): Promise<Organization[]> {
        return [this.sampleEntity];
    }

    async insert(entity: Organization): Promise<any> {
        return { identifiers: [1] };
    }

    async update(id: number, dto: UpdateOrganizationDto): Promise<Organization> {
        return this.sampleEntity;
    }

    async delete(id: number): Promise<Organization> {
        return this.sampleEntity;
    }
}
