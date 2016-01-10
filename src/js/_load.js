var c = {w:getW(),h:getH()};
var svg, g;
var sp = 500;

var x = d3.scale.linear()
    .domain([0, 1200])
    .range([0,c.w])

var y = d3.scale.linear()
    .domain([0, 800])
    .range([0,c.h])

var viewer;

var force = getForce(); // responsive params?

var interrupt = false;

window.addEventListener("load", e => {

    ~function($) {

        // setup svg and set viewbox based on w/h/margins
        svg = d3.select("body").append("svg")
            .attr("width",c.w).attr("height",c.h)
            .attr("viewBox",[0,0,c.w,c.h].join(" "));

        g = svg.append("g")

        // main content container
        viewer = svg.append("svg")

        // order defines order of containers
        thom();
        menu();
        social();
        getPost(0,true);

    }((a,d=document)=>1==d[q='querySelector'](a).length?d[q](a)[0]:d[q](a));

})

window.addEventListener("resize", e => {
    c = {w:getW(),h:getH()};
    y.range([0,c.h])
    x.range([0,c.w])

    setTimeout(() => {
        svg.transition().duration(sp)
        .attr("width",c.w).attr("height",c.h)
        .attr("viewBox", [0,0,c.w,c.h].join(" "));

        force.size([c.w,c.h-y(120)]);

        rGoo(sp);

        force.resume();

        //logo(); // redefined function (see logo.js)
    },sp)
})

var rnd = qty => qty*Math.random()|0;

var clone = data => JSON.parse(JSON.stringify(data));

function getW(d=document,e='documentElement') {
    if (self.innerHeight) return self.innerWidth;
    if (d[e] && d[e].clientHeight) return d[e].clientWidth;
    if (d.body) return d.body.clientWidth;
}

function getH(a=document,b="documentElement") {
    if (self.innerHeight) return self.innerHeight;
    if (a[b] && a[b].clientHeight) return a[b].clientHeight;
    if (a.body) return a.body.clientHeight;
}

// ES5 pythag polyfill

Math.hypot = Math.hypot || ((x,y) => Math.sqrt(x*x + y*y));
Math.calcHype = ((x1,x2,y1,y2) => Math.hypot(x1-x2,y1-y2));

// random string

function noCache() {
    return "?" + Math.random().toString(36).substring(5);
}

function titleObject(txt,x,y) {
    return {
        "shape": "text",
        "text": txt,
        "size": "80",
        "attr" : {
            "stroke":"#000",
            "stroke-width":"4px"
        },
        "foci": {
            "x": x,
            "y": y
        }
    }
}