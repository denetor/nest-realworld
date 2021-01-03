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
import { OrganizationsService } from './organizations.service';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';
import {
    ApiBearerAuth,
    ApiCreatedResponse,
    ApiInternalServerErrorResponse,
    ApiNotFoundResponse, ApiOkResponse,
    ApiTags
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import {Organization} from "./entities/organization.entity";

@Controller('organizations')
@ApiTags('organizations')
export class OrganizationsController {
    constructor(private readonly organizationsService: OrganizationsService) {}

    @Post()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @UsePipes(new ValidationPipe({ transform: true }))
    @ApiCreatedResponse()
    @ApiNotFoundResponse()
    @ApiInternalServerErrorResponse()
    create(@Body() createOrganizationDto: CreateOrganizationDto):
        Promise<Organization | InternalServerErrorException | NotFoundException> {
        return this.organizationsService.create(createOrganizationDto);
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOkResponse()
    @ApiInternalServerErrorResponse()
    findAll(): Promise<Organization[] | InternalServerErrorException> {
        return this.organizationsService.findAll();
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOkResponse()
    @ApiNotFoundResponse()
    findOne(@Param('id') id: string): Promise<Organization | NotFoundException> {
        return this.organizationsService.findOne(+id);
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
        @Body() updateOrganizationDto: UpdateOrganizationDto
    ): Promise<Organization | InternalServerErrorException | NotFoundException> {
        return this.organizationsService.update(+id, updateOrganizationDto);
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOkResponse()
    @ApiNotFoundResponse()
    @ApiInternalServerErrorResponse()
    remove(@Param('id') id: string):
        Promise<Organization | InternalServerErrorException | NotFoundException>{
        return this.organizationsService.remove(+id);
    }
}
