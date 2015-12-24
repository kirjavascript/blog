function posts() {

    // setup container for mouse events
    viewer
        .attr({
            x:x(120),y:y(120),
            width:c.w-x(120),
            height: c.h-y(240),
            viewBox:[x(120),y(120),c.w-x(120),c.h-y(240)].join(" ")
        }).style("cursor","move")
        .call(zoom);

    // setup viewport
    vp = viewer.append("g")

    vp.append("rect")
        .attr({
            fill:"#DDD",
            x:x(120),y:y(120),
            width:240,
            height:240
        })

}

function zoomed() {
    vp.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
}

var zoom = d3.behavior.zoom()
    .scaleExtent([0.1, 20])
    .on("zoom", zoomed);
