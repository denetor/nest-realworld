import {
    Body,
    Controller,
    Delete,
    Get,
    InternalServerErrorException,
    NotFoundException,
    Param,
    Post,
    Put,
    Req,
    UnauthorizedException,
    UseGuards,
    UsePipes,
    ValidationPipe
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import {
    ApiBearerAuth,
    ApiCreatedResponse,
    ApiInternalServerErrorResponse,
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiParam,
    ApiTags,
    ApiUnauthorizedResponse
} from '@nestjs/swagger';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { Project } from './entities/project.entity';
import { UpdateProjectDto } from './dto/update-project.dto';
import { CaslAbilityFactory } from '../casl/casl-ability.factory';
import { Action } from '../casl/ability.action';

@Controller('projects')
@ApiTags('projects')
export class ProjectsController {
    constructor(
        private readonly projectsService: ProjectsService,
        private readonly caslAbilityFactory: CaslAbilityFactory
    ) {}

    @Post()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @UsePipes(new ValidationPipe({ transform: true }))
    @ApiCreatedResponse()
    @ApiNotFoundResponse()
    @ApiInternalServerErrorResponse()
    @ApiUnauthorizedResponse({ description: 'user not authorized' })
    create(
        @Body() createProjectDto: CreateProjectDto,
        @Req() req: Request | any
    ): Promise<Project | InternalServerErrorException | NotFoundException> {
        if (req && req.user) {
            const ability = this.caslAbilityFactory.createForUser(req.user);
            if (ability.can(Action.Create, Project)) {
                return this.projectsService.create(createProjectDto);
            } else {
                throw new UnauthorizedException();
            }
        } else {
            throw new UnauthorizedException();
        }
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOkResponse()
    @ApiInternalServerErrorResponse()
    findAll(): Promise<Project[] | InternalServerErrorException> {
        return this.projectsService.findAll();
    }

    @Get('byuser/:userId')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiParam({ name: 'userId', description: 'Projects owner' })
    @ApiOkResponse()
    @ApiInternalServerErrorResponse()
    findAllByUser(
        @Param('userId') userId: number
    ): Promise<Project[] | InternalServerErrorException> {
        return this.projectsService.findAllByUser(+userId);
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
    remove(
        @Param('id') id: string
    ): Promise<Project | InternalServerErrorException | NotFoundException> {
        return this.projectsService.remove(+id);
    }
}
