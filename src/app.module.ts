import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from './common/config/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { OrganizationsModule } from './organizations/organizations.module';
import { TeamsModule } from './teams/teams.module';
import { ProjectsModule } from './projects/projects.module';
import { CaslModule } from './casl/casl.module';

@Module({
  imports: [
      TypeOrmModule.forRoot({
          type: 'mariadb', // TODO understand which type to use for config.params.db.type,
          host: config.params.db.host,
          port: config.params.db.port,
          username: config.params.db.username,
          password: config.params.db.password,
          database: config.params.db.database,
          entities: ['dist/**/*.entity{.ts,.js}'],
          synchronize: true,
          autoLoadEntities: true,
          // logging: ['query', 'error'],
          logging: ['error'],
      }),
      AuthModule,
      OrganizationsModule,
      ProjectsModule,
      TeamsModule,
      UsersModule,
      CaslModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
