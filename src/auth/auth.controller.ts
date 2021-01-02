import { Controller, Post, UseGuards, Request, Body, ValidationPipe, UsePipes, Logger } from '@nestjs/common';
import { ApiTags, ApiBody } from '@nestjs/swagger';
import { LocalAuthGuard } from './local-auth.guard';
import { AuthService } from './auth.service';
import { UserLoginDto } from '../users/dto/user-login-dto';

@Controller('auth')
@ApiTags('auth')
export class AuthController {


    constructor(
        private readonly authService: AuthService,
        private readonly logger: Logger,
    ) {}


    @Post('login')
    @UseGuards(LocalAuthGuard)
    @UsePipes(new ValidationPipe({ transform: true }))
    @ApiBody({ type: UserLoginDto })
    async login(
        @Request() req,
    ) {
        this.logger.debug('AuthController.login()');
        return this.authService.login(req.user);
    }
}
