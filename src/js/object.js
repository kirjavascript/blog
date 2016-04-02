function d3on(src,removeflag=null,datamod=d=>d,charge=-4600) {
    if(interrupt==true) return;

    if (removeflag==null) {
        svg.selectAll(".d3on")
            .transition()
            .duration(sp/2)
            .attr({transform:d=>
                "scale("+(d.scale?d.scale:1)+"),translate("+
                [x(rnd(1280)),y(rnd(800))]
                +"),rotate("+(d.rotate?d.rotate:0)+")"
            })
            .style("opacity",0.5)
            .remove();

        foreignObjects.selectAll(".d3on")
            .remove();
    }

    function load(data) {
        interrupt = true;
        data = datamod(shuffle(data));
        var cont = svg.append("g");
        var nodes = []; 
        ~function stagger() {
            nodes.push(data.shift());
            render(nodes,cont);
            if(data.length)setTimeout(stagger,30);
            else interrupt = false;
        }()
    }

    if(typeof src == "object") {
        load(src);
    }
    else {
        d3.json("json/" + src, (e,data) => {
            load(data);
        })
    }

    function render(data,parent) {

        // check if UID already exists

        data = data.filter(d => !document.getElementById(d.uid))

        var selector = removeflag ? '.d3on-dyn' : '.d3on';

        // SVG stuff

        var obj = parent.selectAll(selector)
            .data(data.filter(d => d.shape != "foreignObject"))

        var objGroup = obj.enter();

        objGroup.append(d => document.createElementNS(d3.ns.prefix.svg, d.shape))
            .classed("d3on", true)
            .call(setAttr, 'SVG')
            //.call(force.drag)

        // non-SVG stuff

        var fObj = foreignObjects.selectAll(selector)
            .data(data.filter(d => d.shape == "foreignObject"))

        var fObjGroup = fObj.enter();

        fObjGroup.append('div')
            .classed("d3on", true)
            .call(setAttr, 'foreignObject')

        force
            .nodes(data)
            .charge(charge)
            .start();

        force.on("tick", e => {
            var k = .5 * e.alpha;
            data.forEach(o=>{
                if(o.foci)o.y+=(o.foci.y-o.y)*k,o.x+=(o.foci.x-o.x)*k});

            svg.selectAll('.d3on')
                .attr('transform', d=>
                    "scale("+(d.scale?d.scale:1)+"),"+
                    "rotate("+(d.rotate?d.rotate:0)+"),"+
                    "translate("+[x(d.x),y(d.y)]+")")
                
            svg.select('#post-date')
                .attr('transform', d => "translate("+[x(d.x),0]+")")
                .attr("y", x(310)/2);

            foreignObjects.selectAll('.d3on')
                .style("transform", d => `translate(${x(d.x)}px, ${y(d.y)}px)`)

        });
        respond();
    }

    function setAttr(selection, type) {
        if(type == "SVG") {
            selection
                .attr({
                    width: d => x(d.size?d.size[0]:0),
                    height: d => y(d.size?d.size[1]:0),
                    r: d => d.size?d.size:0
                })
        }
        else if (type == 'foreignObject') {
            selection
                .style({
                    width: d => x(d.size[0])+'px',
                    height: d => (d.size[1]=="auto"?'auto': y(d.size[1])+'px'),
                })
        }

        selection
            .each(function(d, i) {
                var self = d3.select(this);

                if(d.style) 
                    for(var p in d.style)
                        d.style.hasOwnProperty(p)
                            && self.style(p,d.style[p]);

                if(d.attr) 
                    for(var p in d.attr)
                        d.attr.hasOwnProperty(p)
                            && self.attr(p,d.attr[p]);

                if(d.uid)
                    self.attr("id", d.uid);

                if(d.text) self
                    .attr('font-size',d.size+"rem")
                    .text(d.text);
                if(d.children)
                    render(d.children,self)
                if(d.html) {
                    var html = typeof d.html=="object"?d.html.join(""):d.html;
                    self.html(html);
                    parseJS(html);
                }
                if(d.ajax) {
                    d3.text(d.ajax, (e,d) => {
                        self.html(d);
                        parseJS(d);
                    })
                    
                }
                if(d.path) self
                    .attr("d",d=>d.path)

                //self.attr("transform","scale(0)");
            });
    }

    function parseJS(html) {
        var rx = /<script>([\s\S]*?)<\/script>/i;
        var js = rx.exec(html);
        js && eval(js.pop());
    }
}

function getForce() {
    return d3.layout.force()
        .friction(0.4) // 0.7
        .linkDistance(200)
        .gravity(0.5)
        .size([1200,800]);
}
