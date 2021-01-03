import { Organization } from '../entities/organization.entity';
import {UpdateOrganizationDto} from "../dto/update-organization.dto";

export class OrganizationRepositoryMock {
    async findOne(id: number): Promise<Organization> {
        return new Organization({ name: 'ACME' });
    }

    async findAll(): Promise<Organization[]> {
        return [new Organization({ name: 'ACME' })];
    }

    async insert(entity: Organization): Promise<any> {
        return { identifiers: [1] };
    }

    async update(id: number, dto: UpdateOrganizationDto): Promise<Organization> {
        return new Organization({ name: 'ACME' });
    }

    async delete(id: number): Promise<Organization> {
        return new Organization({ name: 'ACME' });
    }
}
