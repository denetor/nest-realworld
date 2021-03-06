import {
    Controller,
    Get,
    Param,
    Patch,
    Post,
    Body,
    UsePipes,
    ValidationPipe,
    Request,
    Delete,
    UseGuards,
    InternalServerErrorException,
    UnauthorizedException,
    NotFoundException,
    BadRequestException,
    ForbiddenException
} from '@nestjs/common';
import {
    ApiTags,
    ApiOkResponse,
    ApiInternalServerErrorResponse,
    ApiNotFoundResponse,
    ApiParam,
    ApiBody,
    ApiCreatedResponse,
    ApiBadRequestResponse,
    ApiForbiddenResponse,
    ApiUnauthorizedResponse,
    ApiBearerAuth, ApiOperation
} from '@nestjs/swagger';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { UserDto } from './dto/user-dto';
import { UserChangePasswordDto } from './dto/user-change-password-dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('users')
@ApiTags('users')
export class UsersController {
    constructor(private readonly entitiesService: UsersService) {}

    @Get()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOkResponse({ description: 'Entity found' })
    @ApiInternalServerErrorResponse({ description: 'Some error occurred' })
    @ApiOperation({ summary: 'Get all items' })
    //@ApiResponse({ status: 200, description: 'Return all articles.'})
    async findAll(): Promise<User[] | InternalServerErrorException> {
        return await this.entitiesService.findAll();
    }

    @Get('myself')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @UsePipes(new ValidationPipe({ transform: true }))
    @ApiOkResponse({ description: 'Entity found' })
    @ApiUnauthorizedResponse({ description: 'Not authenticated' })
    @ApiOperation({ summary: 'Get details of the currently authenticated user' })
    async findMyself(@Request() req): Promise<User | UnauthorizedException> {
        return await this.entitiesService.findMyself(req);
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOkResponse({ description: 'Entity found' })
    @ApiNotFoundResponse({ description: 'Entity not found' })
    @ApiOperation({ summary: 'Get an items' })
    async findOne(@Param('id') id: number): Promise<User | NotFoundException> {
        return await this.entitiesService.findOne(id);
    }

    @Get('by-email/:email')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiParam({ name: 'email', description: 'User email' })
    @ApiOkResponse({ description: 'Entity found' })
    @ApiNotFoundResponse({ description: 'Entity not found' })
    @ApiOperation({ summary: 'Get a user given the email' })
    async findOneByEmail(
        @Param('email') email: string
    ): Promise<User | NotFoundException> {
        return await this.entitiesService.findOneByEmail(email);
    }

    @Get('by-resetpasswordtoken/:token')
    @ApiParam({ name: 'token', description: 'Reset password token' })
    @ApiOkResponse({ description: 'Entity found' })
    @ApiNotFoundResponse({ description: 'Entity not found' })
    @ApiOperation({ summary: 'Get a user given his password reset token' })
    async findOneByResetPasswordToken(
        @Param('token') token: string
    ): Promise<User | NotFoundException> {
        return await this.entitiesService.findOneByResetPasswordToken(token);
    }

    @Get('by-searchtext/:searchText')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiParam({
        name: 'searchText',
        description: 'Part of name, lastname or email'
    })
    @ApiOkResponse({ description: 'Some entity found' })
    @ApiInternalServerErrorResponse({
        description: 'Internal server error performing request'
    })
    @ApiBadRequestResponse({ description: 'At least 2 characters needed to perform search' })
    @ApiOperation({ summary: 'Get all users matching part of name, lastName or email' })
    async findBySearchText(
        @Param('searchText') searchText: string
    ): Promise<User[] | BadRequestException | InternalServerErrorException> {
        return await this.entitiesService.findBySearchText(searchText);
    }

    /**
     * User creation
     */
    @Post()
    @UseGuards(JwtAuthGuard /*, new AppRoleGuard('operator')*/)
    @ApiBearerAuth()
    @UsePipes(new ValidationPipe({ transform: true }))
    @ApiBody({ type: UserDto })
    @ApiCreatedResponse({ description: 'Entity created' })
    @ApiInternalServerErrorResponse({ description: 'Error inserting entity' })
    @ApiNotFoundResponse({
        description: 'Entity created, but failed to read it'
    })
    @ApiOperation({ summary: 'Create a new item' })
    async create(
        @Body() entity: UserDto,
        @Request() req
    ): Promise<User | NotFoundException | InternalServerErrorException> {
        const ret = await this.entitiesService.create(entity);
        return ret;
    }

    /**
     * Send user a notification of his/her account creation
     */
    // @Post('notify-creation')
    // // @UseGuards(JwtAuthGuard, new AppRoleGuard('operator'))
    // // @ApiBearerAuth()
    // @UsePipes(new ValidationPipe({ transform: true }))
    // @ApiBody({ type: UserRecoverPasswordDto })
    // @ApiCreatedResponse({description: ''})
    // async notifyCreation(
    //     @Body() entity: UserRecoverPasswordDto,
    //     @Request() req,
    // ): Promise<any | undefined> {
    //     let ret = await this.entitiesService.notifyCreation(entity);
    //     // log activity
    //     await this.auditLogsService.insert({
    //         entity: 'User',
    //         operation: 'notifyCreation',
    //         oldData: entity ? JSON.stringify(entity) : null,
    //         newData: ret ? JSON.stringify(ret) : null,
    //         success: (ret !== undefined),
    //         userId: null
    //     }, req);
    //     return ret;
    // }

    /**
     * Activate password recovery procedure
     */
    // @Post('recover-password')
    // @UsePipes(new ValidationPipe({ transform: true }))
    // @ApiBody({ type: UserRecoverPasswordDto })
    // @ApiCreatedResponse({description: ''})
    // async recoverPassword(
    //     @Body() entity: UserRecoverPasswordDto,
    //     @Request() req,
    // ): Promise<any | undefined> {
    //     let ret = await this.entitiesService.recoverPassword(entity);
    //     // log activity
    //     await this.auditLogsService.insert({
    //         entity: 'User',
    //         operation: 'recoverPassword',
    //         oldData: entity ? JSON.stringify(entity) : null,
    //         newData: ret ? JSON.stringify(ret) : null,
    //         success: (ret !== undefined),
    //         userId: null
    //     }, req);
    //     return ret;
    // }

    /**
     * Reset password for a user
     */
    // @Post(':id/reset-password')
    // @UsePipes(new ValidationPipe({ transform: true }))
    // @ApiBody({ type: UserResetPasswordDto })
    // @ApiCreatedResponse({description: ''})
    // async resetPassword(
    //     @Param('id') id: number,
    //     @Body() entity: UserResetPasswordDto,
    //     @Request() req,
    // ): Promise<any | undefined> {
    //     let ret = await this.entitiesService.resetPassword(id, entity);
    //     // obscuring password field from entity
    //     if (entity && entity.password) {
    //         entity.password = 'xxxxx';
    //     }
    //     // log activity
    //     await this.auditLogsService.insert({
    //         entity: 'User',
    //         operation: 'resetPassword',
    //         oldData: entity ? JSON.stringify(entity) : null,
    //         newData: ret ? JSON.stringify(ret) : null,
    //         success: (ret !== undefined),
    //         userId: id
    //     }, req);
    //     return ret;
    // }

    /**
     * Change the password for a user
     */
    @Post('change-password')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @UsePipes(new ValidationPipe({ transform: true }))
    @ApiBody({ type: UserChangePasswordDto })
    @ApiOkResponse()
    @ApiInternalServerErrorResponse({ description: 'Failed updating entity' })
    @ApiBadRequestResponse({ description: 'Invalid or missing parameters' })
    @ApiNotFoundResponse({
        description:
            'Entity not found | Entity updated, but failed reading it back'
    })
    @ApiForbiddenResponse({ description: 'Old password does not match' })
    @ApiUnauthorizedResponse({ description: 'User not logged in' })
    @ApiOperation({ summary: 'Sets a new pasword' })
    async changePassword(
        @Body() entity: UserChangePasswordDto,
        @Request() req
    ): Promise<User | ForbiddenException | NotFoundException | BadRequestException | UnauthorizedException> {
        const ret = await this.entitiesService.changePassword(entity, req);
        return ret;
    }

    @Patch(':id')
    @UseGuards(JwtAuthGuard /*, new AppRoleGuard('operator')*/)
    @ApiBearerAuth()
    @UsePipes(new ValidationPipe({ transform: true }))
    @ApiBody({ type: UserDto })
    @ApiOkResponse({ description: 'Entity changed' })
    @ApiInternalServerErrorResponse({ description: 'Error saving entity' })
    @ApiNotFoundResponse({ description: 'Entity not found' })
    @ApiOperation({ summary: 'Updates an item given its id' })
    async updateById(
        @Param('id') id: number,
        @Body() entity: UserDto,
        @Request() req
    ): Promise<User | NotFoundException | InternalServerErrorException> {
        // const previousValue = await this.entitiesService.findOne(id); // keep this for auditing, when will be done
        const ret = await this.entitiesService.update(id, entity);
        return ret;
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOkResponse({ description: 'Entity changed' })
    @ApiInternalServerErrorResponse({ description: 'Error saving entity' })
    @ApiNotFoundResponse({ description: 'Entity not found' })
    @ApiOperation({ summary: 'Delete an item' })
    async remove(
        @Param('id') id: number,
        @Request() req
    ): Promise<User | InternalServerErrorException | NotFoundException> {
        const entity = await this.entitiesService.remove(id);
        return entity;
    }
}
