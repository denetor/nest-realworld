import { CreateOrganizationDto } from '../dto/create-organization.dto';
import { UpdateOrganizationDto } from '../dto/update-organization.dto';

export class OrganizationsServiceMock {
    findAll() {}

    findOne(id: number) {}

    create(dto: CreateOrganizationDto) {}

    update(id: number, dto: UpdateOrganizationDto) {}

    remove(id: number) {}
}
