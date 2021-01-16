import { Injectable } from '@nestjs/common';
const d3 = require('d3');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

@Injectable()
export class OwlsService {
    // https://medium.com/@92sharmasaurabh/generate-svg-files-using-nodejs-d3-647d5b4f56eb
    // https://stackoverflow.com/questions/9948350/how-to-use-d3-in-node-js-properly
    test() {
        const dom = new JSDOM(`<!DOCTYPE html><body></body>`);
        let body = d3.select(dom.window.document.querySelector('body'));
        let svg = body
            .append('svg')
            .attr('width', 100)
            .attr('height', 100)
            .attr('xmlns', 'http://www.w3.org/2000/svg');
        // corpo
        svg.append('circle')
            .attr('cx', 50)
            .attr('cy', 50)
            .attr('r', 45)
            .style('fill', 'brown');
        // occhi
        svg.append('circle')
            .attr('cx', 50 - 18)
            .attr('cy', 30)
            .attr('r', 16)
            .style('fill', 'yellow');
        svg.append('circle')
            .attr('cx', 50 + 18)
            .attr('cy', 30)
            .attr('r', 16)
            .style('fill', 'yellow');
        // becco
        const becco = d3
            .symbol()
            .type(d3.symbolTriangle)
            .size(100);
        svg.append('path')
            .attr('d', becco)
            .attr('transform', function(d) {
                return 'translate(50,50),rotate(180,0,0)';
            })
            .style('fill', 'orange');

        return body.html();
    }
}
