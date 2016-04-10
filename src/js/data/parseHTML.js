import * as vars from '../config';
import { d3on } from './object';
import { getPost } from './post';

export default function(obj) {

    obj.selectAll('script')
        .each(function() {
            let self = d3.select(this);
            let src = self.attr('src');

            // inline
            if(!src) {
                src = "data:application/javascript;base64," + btoa(self.html());
            }

            vars.foreignObjects
                .append('script')
                .attr('src', src)
                .node()
                .async = true;
        })
    
    obj.selectAll('[data-getpost]')
        .each(function() {
            let self = d3.select(this);
            self.on('click', d => getPost(self.attr('data-getpost')));
        })

    obj.selectAll('[data-popup]')
        .each(function() {
            let self = d3.select(this);
            self.on('click', d => d3on(self.attr('data-popup'), true));
        })

    obj.selectAll('[data-close]')
        .on('click', function() {
            d3.select(this.parentNode.parentNode)
                .transition()
                .style('opacity', 0)
                .remove()
        })

}