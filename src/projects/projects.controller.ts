import {
    Body,
    Controller, Delete, Get,
    InternalServerErrorException, NotFoundException, Param,
    Post, Put,
    UseGuards,
    UsePipes,
    ValidationPipe
} from '@nestjs/common';
import {OrganizationsService} from "../organizations/organizations.service";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {
    ApiBearerAuth,
    ApiCreatedResponse,
    ApiInternalServerErrorResponse,
    ApiNotFoundResponse,
    ApiOkResponse, ApiTags
} from "@nestjs/swagger";
import {CreateOrganizationDto} from "../organizations/dto/create-organization.dto";
import {Organization} from "../organizations/entities/organization.entity";
import {UpdateOrganizationDto} from "../organizations/dto/update-organization.dto";
import {ProjectsService} from "./projects.service";
import {CreateProjectDto} from "./dto/create-project.dto";
import {Project} from "./entities/project.entity.ts";
import {UpdateProjectDto} from "./dto/update-project.dto";

@Controller('projects')
@ApiTags('projects')
export class ProjectsController {
    constructor(private readonly projectsService: ProjectsService) {}

    @Post()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @UsePipes(new ValidationPipe({ transform: true }))
    @ApiCreatedResponse()
    @ApiNotFoundResponse()
    @ApiInternalServerErrorResponse()
    create(@Body() createProjectDto: CreateProjectDto):
        Promise<Project | InternalServerErrorException | NotFoundException> {
        return this.projectsService.create(createProjectDto);
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOkResponse()
    @ApiInternalServerErrorResponse()
    findAll(): Promise<Project[] | InternalServerErrorException> {
        return this.projectsService.findAll();
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOkResponse()
    @ApiNotFoundResponse()
    findOne(@Param('id') id: string): Promise<Project | NotFoundException> {
        return this.projectsService.findOne(+id);
    }

    @Put(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @UsePipes(new ValidationPipe({ transform: true }))
    @ApiOkResponse()
    @ApiNotFoundResponse()
    @ApiInternalServerErrorResponse()
    update(
        @Param('id') id: string,
        @Body() updateProjectDto: UpdateProjectDto
    ): Promise<Project | InternalServerErrorException | NotFoundException> {
        return this.projectsService.update(+id, updateProjectDto);
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOkResponse()
    @ApiNotFoundResponse()
    @ApiInternalServerErrorResponse()
    remove(@Param('id') id: string):
        Promise<Project | InternalServerErrorException | NotFoundException>{
        return this.projectsService.remove(+id);
    }
}
