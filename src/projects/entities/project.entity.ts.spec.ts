import { Project } from './project.entity';
import { CreateProjectDto } from '../dto/create-project.dto';

describe('Project', () => {
    it('should be instantiable without dto', () => {
        const entity: Project = new Project(null);
        expect(entity).toBeDefined();
        expect(entity.name).toBeDefined();
    });

    it('should be instantiable with dto', () => {
        const dto: CreateProjectDto = { name: 'Prjname' };
        const entity: Project = new Project(dto);
        expect(entity).toBeDefined();
        expect(entity.name).toBeDefined();
        expect(entity.name).toBe('Prjname');
    });
});
