var fs = require("fs");

// node newpost.js title "tags tags2"

var args = process.argv.slice(2);

var posts = JSON.parse(fs.readFileSync("src/json/posts.json","utf-8"));

function pad(a,b){return(1e15+a+"").slice(-b)}

var num = pad(posts.length, 3);

posts.unshift({
        "title":args[0],
        "json":"posts/"+num+".json",
        "tags":args[1],
        "date":(new Date()).toISOString().slice(0,10).replace(/-/g,"/") 
})

var ex = [
    {
        "shape": "text",
        "text": args[0],
        "size": "4",
        "attr" : {
            "stroke":"#000",
            "stroke-width":"4px"
        },
        "foci": {
            "x": 1000,
            "y": -200
        }
    },
    {
        "shape": "foreignObject",
        "size": [
            500,
            "auto"
        ],
        "ajax": "json/posts/"+num+"/main.html",
        "foci": {
            "x": -300,
            "y": 250
        }
    }];

var html = '<div class="post">\
    <p>...</p>\
</div>';

fs.writeFileSync("src/json/posts.json",JSON.stringify(posts, null, 4))
fs.mkdirSync("src/json/posts/"+num);
fs.writeFileSync("src/json/posts/"+num+".json",JSON.stringify(ex, null, 4))
fs.writeFileSync("src/json/posts/"+num+"/main.html",html)