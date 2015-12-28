function d3on(src) {

    // viewer.selectAll("*")
    //     .transition()
    //     .duration(sp)
    //     .attr({width:0,height:0,x:c.w/2,y:c.h/2})
    //     .remove();
    // put this in a seperate function and add a callback

    var foci = [
        {x: 0, y: 0},
        {x: 800, y: -100},
        {x: 800, y: -150}
    ];

    var ajax = d3.json("json/about.json", (e,data) => {
        render(data,vp.append("g"));
    })

    // 100% vector gfx
    // stagger in/out setinterval call thingy

    function render(data,parent) {
        var obj = parent.selectAll(".d3on")
            .data(data)

        var objGroup = obj.enter();

        var f = forces.push(force());
            f = forces[--f];

        objGroup.append(d=>document.createElementNS("http://www.w3.org/2000/svg", d.shape))
            .classed("d3on", true)
            .attr({
                width: d => x(d.size?d.size[0]:0),
                height: d => y(d.size?d.size[1]:0),
                r: d => d.size?d.size:0
            })
            .each(function(d,i) {
                var self = d3.select(this);

                if(d.style) for(var p in d.style) {
                    d.style.hasOwnProperty(p)
                    &&
                    self.style(p,d.style[p])
                };
                if(d.attr) for(var p in d.attr) {
                    d.attr.hasOwnProperty(p)
                    &&
                    self.attr(p,d.attr[p])
                };
                if(d.text) self
                    .attr('font-size',d.size)
                    .text(d.text);
                if(d.children)
                    render(d.children,self)
                if(d.html) self
                    .html(d.html)

                var bbox = self.node().getBBox()
                data[i].bbox = bbox;

                self.attr({
                    transform:"translate("+[-bbox.width/2,-bbox.height/2]+")"
                })
            })
            //.call(f.drag)

            f
                .nodes(data)
                // .charge(d=>
                //     {
                //         var r= Math.sqrt(
                //             Math.pow(d.bbox.width/2,2) +
                //             Math.pow(d.bbox.height/2,2)
                //         );
                //         return (-r*r)*2;
                //     },-600
                //     )
                .charge(-4600)
                //.links(data.hierarchy)
                .start();

            f.on("tick", e => {
                var k = .5 * e.alpha;
                data.forEach(o=>{
                    if(o.foci)o.y+=(o.foci.y-o.y)*k,o.x+=(o.foci.x-o.x)*k});
                d3.selectAll('.d3on')
                    .attr({
                        x:d=>d.x,cx:d=>d.x,
                        y:d=>d.y,cy:d=>d.y,

                    })
            });

    }
}

function force() {
    return d3.layout.force()
        .friction(0.4) // 0.7
        .linkDistance(200)
        .gravity(0.5)
        .size([c.w,c.h-y(120)]);
}
