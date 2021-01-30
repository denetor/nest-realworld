import { Test, TestingModule } from '@nestjs/testing';
import { OrganizationsService } from './organizations.service';
import { OrganizationRepositoryMock } from './mocks/organization-repository.mock';
import { Organization } from './entities/organization.entity';
import { UpdateOrganizationDto } from './dto/update-organization.dto';

describe('OrganizationsService', () => {
    let service: OrganizationsService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                OrganizationsService,
                {
                    provide: 'OrganizationRepository',
                    useClass: OrganizationRepositoryMock
                }
            ]
        }).compile();

        service = module.get<OrganizationsService>(OrganizationsService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should have methods defined', () => {
        expect(service.findAll).toBeDefined();
        expect(service.findOne).toBeDefined();
        expect(service.create).toBeDefined();
        expect(service.update).toBeDefined();
        expect(service.remove).toBeDefined();
    });

    it('findOne() should return an entity', async () => {
        const entity = await service.findOne(1);
        expect(entity.name).toBeDefined();
        expect(entity.name).toBe('ACME inc.');
    });

    it('findAll() should return an array', async () => {
        const entities = await service.findAll();
        expect(entities).toBeDefined();
        expect(entities[0]).toBeDefined();
        expect(entities[0].id).toBeDefined();
        expect(entities[0].id).toBe(1);
    });

    it('create() should return an entity', async () => {
        const dto = new Organization({ name: 'Macrosoft' });
        const instance = await service.create(dto);
        expect(instance).toBeDefined();
        expect(instance.name).toBeDefined();
        expect(instance.name).toBe('ACME inc.');
    });

    it('update() should return an entity', async () => {
        const dto: UpdateOrganizationDto = { name: 'Macrosoft' };
        const instance = await service.update(1, dto);
        expect(instance).toBeDefined();
        expect(instance.name).toBeDefined();
    });

    it('remove() should return an entity', async () => {
        const instance = await service.remove(1);
        expect(instance).toBeDefined();
        expect(instance.name).toBeDefined();
    });
});
