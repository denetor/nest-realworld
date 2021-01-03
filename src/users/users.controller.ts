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
    UseGuards
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
    ApiBearerAuth
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
    findAll(): Promise<User[] | undefined> {
        return this.entitiesService.findAll();
    }

    @Get('myself')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @UsePipes(new ValidationPipe({ transform: true }))
    @ApiOkResponse({ description: 'Entity found' })
    @ApiUnauthorizedResponse({ description: 'Not authenticated' })
    async findMyself(@Request() req): Promise<User | undefined> {
        return await this.entitiesService.findMyself(req);
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOkResponse({ description: 'Entity found' })
    @ApiNotFoundResponse({ description: 'Entity not found' })
    findOne(@Param('id') id: number): Promise<User | undefined> {
        return this.entitiesService.findOne(id);
    }

    @Get('by-email/:email')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiParam({ name: 'email', description: 'User email' })
    @ApiOkResponse({ description: 'Entity found' })
    @ApiNotFoundResponse({ description: 'Entity not found' })
    async findOneByEmail(
        @Param('email') email: string
    ): Promise<User | undefined> {
        return await this.entitiesService.findOneByEmail(email);
    }

    @Get('by-resetpasswordtoken/:token')
    @ApiParam({ name: 'token', description: 'Reset password token' })
    @ApiOkResponse({ description: 'Entity found' })
    @ApiNotFoundResponse({ description: 'Entity not found' })
    async findOneByResetPasswordToken(
        @Param('token') token: string
    ): Promise<User | undefined> {
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
    @ApiBadRequestResponse({ description: 'Invalid parameters' })
    async findBySearchText(
        @Param('searchText') searchText: string
    ): Promise<User[] | undefined> {
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
    async insert(
        @Body() entity: UserDto,
        @Request() req
    ): Promise<User | undefined> {
        const ret = await this.entitiesService.insert(entity);
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
    async changePassword(
        @Body() entity: UserChangePasswordDto,
        @Request() req
    ): Promise<User | undefined> {
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
    async updateById(
        @Param('id') id: number,
        @Body() entity: UserDto,
        @Request() req
    ): Promise<User | undefined> {
        const previousValue = await this.entitiesService.findOne(id);
        const ret = await this.entitiesService.update(id, entity);
        return ret;
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOkResponse({ description: 'Entity changed' })
    @ApiInternalServerErrorResponse({ description: 'Error saving entity' })
    @ApiNotFoundResponse({ description: 'Entity not found' })
    async delete(
        @Param('id') id: number,
        @Request() req
    ): Promise<User | undefined> {
        const entity = await this.entitiesService.delete(id);
        return entity;
    }
}
