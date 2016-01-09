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
                "<p class=\"tags\">",
                "<a href=\"?"+encodeURIComponent(data.title).replace(/\ /g,'+')+"\">permalink</a>",
                "&emsp;tags: "+data.tags+"</p>"
            ],
            "foci": {
                "x": -600,
                "y": 1200
            }
        })

        // tags, comments, etc
        // comments -> allow not clearing
        // d3 code in json?
        //<iframe src=\"http://bl.ocks.org/snkenjoi/raw/a8555a26b14f4088bf51/\"></iframe>
        return d;
    })
}
