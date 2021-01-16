import {Controller, Get} from '@nestjs/common';
import {ApiTags} from "@nestjs/swagger";
import {OwlsService} from "./owls.service";

@Controller('owls')
@ApiTags('owls')
export class OwlsController {

    constructor(
        private readonly owlsService: OwlsService,
    ) {}


    @Get('test.svg')
    testSvg() {
        return this.owlsService.test();
    }
}
