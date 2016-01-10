//String.prototype.shift = Array.prototype.shift;

function getPost(num=0,init=false) {
    d3.json("json/posts.json"+noCache(), (e,d) => {
        //grab latest post

        if(init&&location.search.indexOf("?")!=~0) {
            var loc = location.search.replace(/( |-|_|\.|\,|%20)/g, " ").toLowerCase();
            let hit = false;

            for(let i=0;i<d.length;i++) {
                if("?" + d[i].title.toLowerCase()==loc) {
                    post(d[i]);
                    hit = !hit;
                    break;
                }
            }
            if(!hit) archive();
        }
        else {
            post(d[num]);
        }
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
                "<a href=\"?"+encodeURIComponent(data.title.toLowerCase().replace(/ /g,'-'))+"\">permalink</a>",
                "&emsp;tags: "+data.tags+"</p>"
            ],
            "foci": {
                "x": -500,
                "y": 1050
            }
        })

        // add date
        d.push({
            "shape": "text",
            "text": data.date,
            "attr": {
                id:"post-date"
            },
            "size": "2",
            "foci": {
                "x": -150,
                "y": 100
            }
        })

        // tags, comments, etc
        // comments -> allow not clearing
        // d3 code in json?
        //<iframe src=\"http://bl.ocks.org/snkenjoi/raw/a8555a26b14f4088bf51/\"></iframe>
        return d;
    })
}
