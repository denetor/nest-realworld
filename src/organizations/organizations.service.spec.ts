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

    it('create() should return an entity', () => {
        const dto = new Organization({ name: 'Macrosoft' });
        const instance = service.create(dto).then(entity => {
            expect(typeof instance).toBe('Organization');
        });
    });

    it('update() should return an entity', () => {
        const dto: UpdateOrganizationDto = { name: 'Macrosoft' };
        service.update(1, dto).then(entity => {
            expect(typeof entity).toBe('Organization');
        });
    });

    it('remove() should return an entity', () => {
        service.remove(1).then(entity => {
            expect(typeof entity).toBe('Organization');
        });
    });
});
