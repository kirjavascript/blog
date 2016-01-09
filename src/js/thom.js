function thom() {

    d3.xml("svg/thom.svg", "image/svg+xml", function(xml) {  
        document.body.appendChild(xml.documentElement);

        var lineLength = function() {return this.getTotalLength()};

        d3.select("#thom")
            .attr({
                width:x(350),
                zIndex:100
            })
            .selectAll(".scrawl")
            .attr({
                "stroke-dasharray":lineLength,
                "stroke-dashoffset":lineLength
            })
            .each(function(e,i){
                d3.select(this)
                .transition()
                .delay([0,167,490.75,641.5,1056][i])
                .duration([286,500,301,539,290][i])
                .attr("stroke-dashoffset",0)
            })
    });


}