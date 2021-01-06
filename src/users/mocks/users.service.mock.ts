import {UserDto} from "../dto/user-dto";
import {UserChangePasswordDto} from "../dto/user-change-password-dto";

export class UsersServiceMock {
    findAll() {
    };

    findMyself(req) {
    };

    findOne(id: number) {
    };

    findOneByEmail(email: string) {
    };

    findOneByResetPasswordToken(token: string) {
    }

    findBySearchText(searchText: string) {
    };

    create(dto: UserDto) {
    };

    update(id: number, dto: UserDto) {
    }

    remove(id: number) {
    }

    changePassword(entity: UserChangePasswordDto, req) {
    }

    static obfuscateEmail(email: string) {
    }

    static obfuscateString(s: string) {
    }


};
