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


    d3on("posts/0.json")
}

function post(d) {
    // add nav, tags, comments, etc
    // comments -> allow not clearing
    // d3 code in json?
    //<iframe src=\"http://bl.ocks.org/snkenjoi/raw/a8555a26b14f4088bf51/\"></iframe>
    return d;
}
