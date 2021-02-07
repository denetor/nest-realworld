import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    private logger = new Logger(LocalStrategy.name);


    constructor(
        private authService: AuthService,
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
