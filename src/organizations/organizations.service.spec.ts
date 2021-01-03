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

    it('findOne() should return an entity', () => {
        service.findOne(1).then(entity => {
            expect(typeof entity).toBe('Organization');
        });
    });

    it('findAll() should return an array', () => {
        service.findAll().then(entities => {
            expect(typeof entities).toBe('Array');
        });
    });

    it('create() should return an entity', () => {
        const dto = new Organization({ name: 'ACME' });
        const instance = service.create(dto).then(entity => {
            expect(typeof instance).toBe('Organization');
        });
    });

    it('update() should return an entity', () => {
        const dto: UpdateOrganizationDto = { name: 'ACME' };
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
