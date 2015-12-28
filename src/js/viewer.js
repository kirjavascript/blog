function posts() {



    // setup container for mouse events
    viewer
        .attr({
            x:0,y:y(120),
            width:c.w,
            height: c.h,
            viewBox: [0, y(120), c.w, c.h - y(240)].join(" ")
        })
        //.style("cursor","move")
        //.call(zoom);

    // setup viewport
    vp = viewer.append("g")

    // d3.json("json/posts.json", (e,data) => {
    //     var posts = vp.selectAll(".post")
    //         .data(data)
    //
    //         // bbox snap
    //         // use native js scroll
    //
    //     var postGroup = posts.enter()
    //         .append("g")
    //         .attr("class","post")
    //
    //     postGroup.append("foreignObject")
    //         .attr("x", x(25))
    //         .attr("y", (d,i) => x(25) + i* y(475))
    //         .attr("width",x(700))
    //         .attr("height",y(400))
    //         .append("xhtml:body")
    //         .style("background-color","#DDD")
    //         .html(d => d.title);
    //
    // })

}

function zoomed() {
    // console.log(d3.event.scale)
    // vp.attr("transform", "translate(0," + d3.event.translate[1] + ")scale(" + d3.event.scale + ")");
    vp.attr("transform", "translate(0," + d3.event.scale + ")");
}

// var zoom = d3.behavior.zoom()
//     .scaleExtent([2000, 1])
//     .on("zoom", zoomed);
