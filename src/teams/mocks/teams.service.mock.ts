import {UpdateTeamDto} from "../dto/update-team.dto";
import {CreateTeamDto} from "../dto/create-team.dto";

export class TeamsServiceMock {
    findAll() {
    };

    findOne(id: number) {
    };

    create(dto: CreateTeamDto) {
    };

    update(id: number, dto: UpdateTeamDto) {
    }

    remove(id: number) {
    }
};
