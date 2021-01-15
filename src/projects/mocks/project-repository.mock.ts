import { Project } from '../entities/project.entity';
import { UpdateProjectDto } from '../dto/update-project.dto';

export class ProjectRepositoryMock {
    private sampleEntity: Project = {
        id: 1,
        name: 'Project Apollo',
        createdAt: new Date(),
        updatedAt: new Date(),
        owner: null,
    };

    async findOne(id: number): Promise<Project> {
        return this.sampleEntity;
    }

    async find(): Promise<Project[]> {
        return new Promise((resolve, reject) => {
            resolve([this.sampleEntity]);
        });
    }

    async findAll(): Promise<Project[]> {
        return new Promise((resolve, reject) => {
            resolve([this.sampleEntity]);
        });
    }

    async insert(entity: Project): Promise<any> {
        return new Promise((resolve, reject) => {
            resolve({ identifiers: [1] });
        });
    }

    async update(id: number, dto: UpdateProjectDto): Promise<Project> {
        return new Promise((resolve, reject) => {
            resolve(this.sampleEntity);
        });
    }

    async delete(id: number): Promise<Project> {
        return new Promise((resolve, reject) => {
            resolve(this.sampleEntity);
        });
    }
}
