//String.prototype.shift = Array.prototype.shift;

function loadPosts(callback) {
    d3.json("json/posts.json"+noCache(), callback);
}

function getPost(num=0,init=false) {

    if(init&&location.search.indexOf("?")!=~0) {
        var loc = location.search.replace(/( |-|_|\.|\,|%20)/g, " ").toLowerCase();
        let hit = false;
        
        for(let i=0;i<posts.length;i++) {
            if("?" + posts[i].title.toLowerCase()==loc) {
                post(i);
                hit = !hit;
                break;
            }
        }
        if(!hit) archive();
    }
    else {
        post(num);
    }
}

function post(num) {
    postNum = num;
    var data = posts[num];

    d3on(data.json,null, d => {
        document.title = data.title;

        // add tags
        d.push({
            "shape": "foreignObject",
            "size": [600,"auto"],
            "html": [
                "<p class=\"tags\">",
                "<a href=\"?"+encodeURIComponent(data.title.toLowerCase().replace(/ /g,'-'))+"\">permalink</a>",
                "&emsp;tags- "+data.tags+"</p>"
            ],
            "foci": {
                "x": -500,
                "y": 700
            }
        })

        // add date
        d.push({
            "shape": "text",
            "type": "date",
            "text": data.date,
            "attr": {
                id:"post-date"
            },
            "size": "2",
            "foci": {
                "x": -150,
                "y": 40
            }
        })

        return d;
    })
}
