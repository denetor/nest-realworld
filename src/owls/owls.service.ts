import { Injectable } from '@nestjs/common';
const d3 = require('d3');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

@Injectable()
export class OwlsService {
    // https://medium.com/@92sharmasaurabh/generate-svg-files-using-nodejs-d3-647d5b4f56eb
    // https://stackoverflow.com/questions/9948350/how-to-use-d3-in-node-js-properly
    test() {
        const owlData = {
            sizeX: 500,
            sizeY: 500,
        };
        const dom = new JSDOM(`<!DOCTYPE html><body></body>`);
        let body = d3.select(dom.window.document.querySelector('body'));
        let svg = this.getCanvas(body, owlData);
        this.appendBody(svg, owlData);
        this.appendEyes(svg, owlData);
        this.appendBeak(svg, owlData);

        return body.html();
    }

    getCanvas(body, owlData) {
        return body.append('svg')
            .attr('width', owlData.sizeX)
            .attr('height', owlData.sizeY)
            .attr('xmlns', 'http://www.w3.org/2000/svg');
    }

    appendBody(svg, owlData) {
        svg.append('circle')
            .attr('cx', owlData.sizeX / 2)
            .attr('cy', owlData.sizeY / 2)
            .attr('r', owlData.sizeX * 0.4)
            .style('fill', 'brown');
    }

    appendEyes(svg, owlData) {
        const eyeRadius = owlData.sizeX * 0.15;
        svg.append('circle')
            .attr('cx', owlData.sizeX / 2 - eyeRadius * 1.1)
            .attr('cy', owlData.sizeY / 2 - eyeRadius * 1)
            .attr('r', eyeRadius)
            .style('fill', 'yellow');
        svg.append('circle')
            .attr('cx', owlData.sizeX / 2 + eyeRadius * 1.1)
            .attr('cy', owlData.sizeY / 2 - eyeRadius * 1)
            .attr('r', eyeRadius)
            .style('fill', 'yellow');
    }

    appendBeak(svg, owlData) {
        const beak = d3
            .symbol()
            .type(d3.symbolTriangle);
            // .size(100);
        svg.append('path')
            .attr('d', beak)
            .attr('transform', function(d) {
                return 'translate(' + owlData.sizeX / 2 + ', ' + owlData.sizeY / 2 + '),' +
                    'rotate(180,0,0),' +
                    '';
            })
            .style('fill', 'orange');
    }
}
