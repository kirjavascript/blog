function viewport() {
    // setup container
    viewer
        .attr(viewAttr())
        //.style("cursor","move")
        //.call(zoom);

    // setup viewport
    vp = viewer.append("g")

    getLatestPost();
}

function viewAttr() {
    return {
        x:0,y:y(120),
        width:c.w,
        height: c.h,
        viewBox: [0, y(120), c.w, c.h - y(240)].join(" ")
    };
}

function getLatestPost() {
    d3.json("json/posts.json", (e,d) => {
        //grab latest post
        post(d[0]);
    })
}

function post(data) {
    d3on(data.json,null, d => {

        document.title = data.title;

        // add tags
        d.push({
            "shape": "foreignObject",
            "size": [600,100],
            "html": [
                "<p class=\"tags\">tags: "+data.tags+"</p>",
                "share: ",
                "<a href=\"?"+encodeURIComponent(data.title).replace(/\ /g,'+')+"\">permalink</a>"
            ],
            "foci": {
                "x": -300,
                "y": 900
            }
        })

        // add nav, tags, comments, etc
        // comments -> allow not clearing
        // d3 code in json?
        //<iframe src=\"http://bl.ocks.org/snkenjoi/raw/a8555a26b14f4088bf51/\"></iframe>
        return d;
    })
}
