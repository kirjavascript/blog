import './data/analytics';

import { x, y, getW, getH } from './util';

import { loadPosts, getPost } from './data/post';

import thom from './gfx/thom';

import menu from './gfx/menu';

import social, { rGoo } from './gfx/social';

import * as vars from './config';

export function respond(sp=0) {
    // set root font size for rems
    d3.select("html")
        .transition()
        .duration(sp)
        .style('font-size',x(12.4)+"px")
}

window.addEventListener("load", e => {

    loadPosts((e,d) => {

        vars.posts = d;

        // setup svg and set viewbox based on w/h/margins
        vars.svg = d3.select("body").append("svg")
            .attr("width",vars.c.w).attr("height",vars.c.h)
            .attr("viewBox",[0,0,vars.c.w,vars.c.h].join(" "));

        // foreignObject container
        vars.foreignObjects = d3.select('body')
            .append('div')
            .classed('foreignObjects', true)

        // order defines order of containers
        thom();
        menu();
        social();
        getPost(0,true);

    })

})

window.addEventListener("resize", e => {
    // let newSize = {w:getW(),h:getH()};
    // let change = {w:vars.c.w-newSize.w,h:vars.c.h-newSize.h};
    // c = newSize;
    vars.c = {w:getW(),h:getH()};
    y.range([0,vars.c.h])
    x.range([0,vars.c.w])

    // used to fix the date text, may break stuff
    vars.force.stop();

    // logo
    d3.select("#thom")
    .transition()
    .duration(vars.sp)
    .attr({
        width:x(350)});

    // menu
    d3.selectAll("tspan")
        .transition()
        .duration(vars.sp)
        .attr("x", (d,i) => x(650) + i*x(200))
        .attr("y", y(160))
        .style("font-size", x(24.8)+"px")

    vars.svg.selectAll(".d3on")
        .transition()
        .duration(vars.sp)
        .attr({transform:d=>
                "scale("+(d.scale?d.scale:1)+"),translate("+
                [x(d.x),y(d.type=="date"?0:d.y)]
                +"),rotate("+(d.rotate?d.rotate:0)+")",
                "y":d=>d.type=="date"?x(310)/2:0
            })
        .attr({
                width: d => x(d.size?d.size[0]:0),
                height: d => y(d.size?d.size[1]:0),
                r: d => d.size?d.size:0
            })

    vars.foreignObjects.selectAll(".d3on")
        .transition()
        .duration(vars.sp)
        .style({
            width: d => x(d.size[0])+'px',
            height: d => (d.size[1]=="auto"?'auto': y(d.size[1])+'px'),
        })
        .styleTween('transform',function(d) {
            let bbox = d3.select(this).node().getBoundingClientRect();
            let xTween = d3.interpolate(bbox.x, x(d.x));
            let yTween = d3.interpolate(bbox.y, y(d.y));
            return t => `translate(${xTween(t)}px,${yTween(t)}px)`
        })

    respond(vars.sp);

    vars.svg
        .attr("width",vars.c.w).attr("height",vars.c.h)
        .attr("viewBox", [0,0,vars.c.w,vars.c.h].join(" "));

    rGoo(vars.sp);
})

document.addEventListener('keydown', e => {
    if (vars.interrupt==true) return;
    if(e.keyCode==39&&vars.postNum<vars.posts.length-1) {
        getPost(++vars.postNum)
    }
    else if (e.keyCode==37&&vars.postNum>0) {
        getPost(--vars.postNum)
    }
})