import {
    Controller,
    Get,
    Post,
    Body,
    Put,
    Param,
    Delete,
    UseGuards, UsePipes, ValidationPipe, InternalServerErrorException, NotFoundException
} from '@nestjs/common';
import { TeamsService } from './teams.service';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import {
    ApiBearerAuth,
    ApiCreatedResponse,
    ApiInternalServerErrorResponse,
    ApiNotFoundResponse, ApiOkResponse,
    ApiTags
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import {Team} from "./entities/team.entity";

@Controller('teams')
@ApiTags('teams')
export class TeamsController {
    constructor(private readonly teamsService: TeamsService) {}

    @Post()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @UsePipes(new ValidationPipe({ transform: true }))
    @ApiCreatedResponse()
    @ApiNotFoundResponse()
    @ApiInternalServerErrorResponse()
    create(@Body() createTeamDto: CreateTeamDto):
        Promise<Team | InternalServerErrorException | NotFoundException>{
        return this.teamsService.create(createTeamDto);
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOkResponse()
    @ApiInternalServerErrorResponse()
    findAll(): Promise<Team[] | InternalServerErrorException> {
        return this.teamsService.findAll();
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOkResponse()
    @ApiNotFoundResponse()
    findOne(@Param('id') id: string): Promise<Team | NotFoundException> {
        return this.teamsService.findOne(+id);
    }

    @Put(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @UsePipes(new ValidationPipe({ transform: true }))
    @ApiOkResponse()
    @ApiNotFoundResponse()
    @ApiInternalServerErrorResponse()
    update(@Param('id') id: string, @Body() updateTeamDto: UpdateTeamDto):
        Promise<Team | InternalServerErrorException | NotFoundException> {
        return this.teamsService.update(+id, updateTeamDto);
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOkResponse()
    @ApiNotFoundResponse()
    @ApiInternalServerErrorResponse()
    remove(@Param('id') id: string): Promise<Team | NotFoundException> {
        return this.teamsService.remove(+id);
    }
}
