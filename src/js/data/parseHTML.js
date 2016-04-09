import { d3on } from './object';
import { getPost } from './post';

export default function(obj) {
    // load JS
    var rx = /<script>([\s\S]*?)<\/script>/i;
    var js = rx.exec(obj.html());
    js && eval(js.pop());

    // attach events
    
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

    obj.selectAll('[data-load-d3]')
        .each(function() {
            d3.select(this).node().contentWindow.d3 = d3;
        })

}