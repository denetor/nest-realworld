import { CreateProjectDto } from '../dto/create-project.dto';
import { UpdateProjectDto } from '../dto/update-project.dto';

export class ProjectsServiceMock {
    findAll() {}

    findOne(id: number) {}

    create(dto: CreateProjectDto) {}

    update(id: number, dto: UpdateProjectDto) {}

    remove(id: number) {}
}
