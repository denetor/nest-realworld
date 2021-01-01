import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {


    constructor(
        private authService: AuthService,
        private readonly logger: Logger,
    ) {
        super({
            usernameField: 'email',
            passwordField: 'password',
        });
    }


    async validate(email: string, password: string): Promise<any> {
        this.logger.debug('LocalStrategy.validate()');
        this.logger.debug({email, password});
        const user = await this.authService.validateUser(email, password);
        this.logger.debug(user);
        if (!user) {
            this.logger.debug('User not authorized');
            throw new UnauthorizedException();
        }
        return user;
    }
}
