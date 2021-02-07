import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import {Injectable, Logger} from '@nestjs/common';
import { config } from '../common/config/config';
import { UsersService } from '../users/users.service';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    private logger = new Logger(JwtStrategy.name);

    constructor(
        private readonly usersService: UsersService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: config.params.jwtSecret,
        });
    }


    async validate(payload: any) {
        this.logger.debug('JwtStrategy.validate()');
        this.logger.debug({payload});
        if (payload && payload.sub) {
            const user = this.usersService.findOne(payload.sub);
            return user;
        } else {
            return null;
        }
    }
}
