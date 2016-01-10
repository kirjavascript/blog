function archive() {

    var c10 = d3.scale.category10();
    var c20 = d3.scale.category20();
    var c20b = d3.scale.category20b();
    var c20c = d3.scale.category20c();

    d3.json("json/posts.json"+noCache(), (e,d) => {
        var shapes = [titleObject("archive",1050,-200)];

        d.forEach((o,i) => {

            var inline = "style=\"background:"+c10(i)+"\"";
            shapes.push({
                    "shape": "foreignObject",
                    "size": [
                        x(600),
                        80
                    ],
                    "scale":0.7,
                    "html": [
                        '<div class="archive" onClick="getPost('+i+')" >',
                            "<div class='wrap' "+inline+">",
                                "<span class='title'>"+o.title+"</span>",
                                "<span class='date'>("+o.date+")</span>",
                            "</div>",
                        "</div>"
                    ],
                    "foci": {
                        "x": 600,
                        "y": 500 + (i*200)
                    }
                })
        })

        d3on(shapes);
    });

}

