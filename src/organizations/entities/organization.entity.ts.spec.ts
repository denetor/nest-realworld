import { Organization } from './organization.entity';
import { CreateOrganizationDto } from '../dto/create-organization.dto';

describe('Organization', () => {
    it('should be instantiable without dto', () => {
        const entity: Organization = new Organization(null);
        expect(entity).toBeDefined();
        expect(entity.name).toBeDefined();
    });

    it('should be instantiable with dto', () => {
        const dto: CreateOrganizationDto = { name: 'Acme inc.' };
        const entity: Organization = new Organization(dto);
        expect(entity).toBeDefined();
        expect(entity.name).toBeDefined();
        expect(entity.name).toBe('Acme inc.');
    });
});
