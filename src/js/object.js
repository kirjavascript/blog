function d3on(src) {
    
    // viewer.selectAll("*")
    //     .transition()
    //     .duration(sp)
    //     .attr({width:0,height:0,x:c.w/2,y:c.h/2})
    //     .remove();
    // put this in a seperate function and add a callback

    var ajax = d3.json("json/about.json", (e,data) => {
        render(data,vp);
    })
    
    function render(data,parent) {
        var obj = parent.selectAll(".d3on")
            .data(data)

        var objGroup = obj.enter()
            //.append("g")
            //.attr("class","d3on")

        .append(d => document.createElementNS("http://www.w3.org/2000/svg", d.shape))
            .attr({
                x: x(100), cx: x(100),
                y: (d,i)=> y(100*i), cy: (d,i)=> y(100*i),
                width: d => x(d.size?d.size[0]:0),
                height: d => y(d.size?d.size[1]:0),
                r: d => d.size?d.size:0
            })
            .each(function(d) {
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
            })

    }
    
    // use bboxHack & 2d binning for spacing
    // size attr
    // foreign object, rect, text, children
    // use rand pos b4 bbox and fade in etc
    // write preprocessor :D
    // children??
    
    //http://incise.org/2d-bin-packing-with-javascript-and-canvas.html
    // /http://codeincomplete.com/posts/2011/5/7/bin_packing/r
}
