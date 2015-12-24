var c = {w:getW(),h:getH()};
var svg, g;
var sp = 500;

var x = d3.scale.linear()
    .domain([0, 1200])
    .range([0,c.w])

var y = d3.scale.linear()
    .domain([0, 800])
    .range([0,c.h])


window.addEventListener("load", e => {

    ~function($) {

        // setup svg and set viewbox based on w/h/margins
        svg = d3.select("body").append("svg")
            .attr("width",c.w).attr("height",c.h)
            .attr("viewBox",[0,0,c.w,c.h].join(" "));

        g = svg.append("g");

        g.append("rect")
        .attr({x:0,y:0,width:c.w,height:c.h,fill:"#EEE"})

        menu();
        logo();

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

        g.select('rect').transition().duration(sp)
        .attr({width:c.w,height:c.h})
    },sp)
})

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
