function d3on(src,datamod=d=>d) {
    if(interrupt==true) return;

    viewer.selectAll(".d3on")
        .transition()
        .duration(sp/2)
        .attr({x:d=>x(rnd(1280)),y:d=>y(rnd(800))})
        .style("opacity",0.5)
        .remove();

    var ajax = d3.json(src, (e,data) => {
        interrupt = true;
        data = datamod(data);
        var cont = vp.append("g");
        var nodes = [];
        ~function stagger() {
            nodes.push(data.shift());
            render(nodes,cont);
            if(data.length)setTimeout(stagger,30);
            else interrupt = false;
        }()
    })

    function render(data,parent) {
        var obj = parent.selectAll(".d3on")
            .data(data)

        var objGroup = obj.enter();

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
            // .call(force.drag)

            force
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

            force.on("tick", e => {
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

function getForce() {
    return d3.layout.force()
        .friction(0.4) // 0.7
        .linkDistance(200)
        .gravity(0.5)
        .size([c.w,c.h-y(120)]);
}
