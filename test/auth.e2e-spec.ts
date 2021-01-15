import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../src/app.module';

describe('Auth (e2e)', () => {
    let app: INestApplication;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [
                AppModule
            ]
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    afterAll(async () => {
        await app.close();
    });

    it('/auth/login (POST)', () => {
        return request(app.getHttpServer())
            .post('/auth/login')
            .send({
                email: 'root@example.com',
                password: 'password'
            })
            .expect(201)
            .expect(inspectLoginResponse);
    });

    // it('/auth/login (POST with wrong password)', () => {
    //     return request(app.getHttpServer())
    //         .post('/auth/login')
    //         .send({
    //             email: 'root@example.com',
    //             password: 'wrongpassword'
    //         })
    //         .expect(401);
    // });

    function inspectLoginResponse(res) {
        if (!('access_token' in res.body))
            throw new Error('missing access_token');
    }
});
