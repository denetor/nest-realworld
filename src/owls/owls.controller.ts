import {Controller, Get, Res} from '@nestjs/common';
import {ApiTags} from "@nestjs/swagger";
import {OwlsService} from "./owls.service";

@Controller('owls')
@ApiTags('owls')
export class OwlsController {

    constructor(
        private readonly owlsService: OwlsService,
    ) {}


    @Get('test.svg')
    testSvg(
        @Res() res,
    ) {
        if (!res.headers) {
            res.headers = {};
        }
        res.headers['Content-Type'] = 'image/svg+xml';
        res.headers['Content-Disposition'] = 'attachment; filename=test.svg';
        res.end(this.owlsService.test());
    }
}
