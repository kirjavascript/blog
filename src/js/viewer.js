function viewport() {
    // setup container
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


    d3on("json/posts/0.json")
}

function post(d) {
    // add nav, tags, comments, etc
    return d;
}
