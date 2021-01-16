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
        svg.append('rect')
            .attr('x', 10)
            .attr('y', 10)
            .attr('width', 80)
            .attr('height', 80)
            .style('fill', 'orange');

        return body.html();
    }
}
