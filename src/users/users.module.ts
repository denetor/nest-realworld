import { Logger, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
    imports: [
        Logger,
        TypeOrmModule.forFeature([User]),
    ],
    providers: [UsersService, Logger],
    controllers: [UsersController],
    exports: [UsersService],
})
export class UsersModule {}
