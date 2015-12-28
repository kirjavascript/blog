function d3on(src,remove=null,datamod=d=>d) {
    if(interrupt==true) return;

    if(remove==null) {
        viewer.selectAll(".d3on")
            .transition()
            .duration(sp/2)
            .attr({transform:d=>
                "scale("+(d.scale?d.scale:1)+"),translate("+
                [x(rnd(1280)),y(rnd(800))]
                +")"
            })
            .style("opacity",0.5)
            .remove();
    }

    var ajax = d3.json("json/" + src, (e,data) => {
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
                if(d.html) {
                    self.html(typeof d.html=="object"?d.html.join(""):d.html)
                }
                if(d.path) self
                    .attr("d",d=>d.path)

                var bbox = self.node().getBBox()
                data[i].bbox = bbox;

                self.attr("transform","scale(0)")
            })
            // .call(force.drag)

            force
                .nodes(data)
                .charge(-4600)
                //.links(data.hierarchy)
                .start();

            force.on("tick", e => {
                var k = .5 * e.alpha;
                data.forEach(o=>{
                    if(o.foci)o.y+=(o.foci.y-o.y)*k,o.x+=(o.foci.x-o.x)*k});
                d3.selectAll('.d3on')
                    .attr({
                        transform:d=>
                        "scale("+(d.scale?d.scale:1)+"),"+
                        "rotate("+(d.rotate?d.rotate:0)+"),"+
                        "translate("+[d.x,d.y]+")"
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
