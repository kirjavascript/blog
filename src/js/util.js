import { c } from './config';

// UI stuff

export let x = d3.scale.linear()
    .domain([0, 1200])
    .range([0,c.w])

export let y = d3.scale.linear()
    .domain([0, 800])
    .range([0,c.h])

export function getW(d=document,e='documentElement') {
    if (self.innerHeight) return self.innerWidth;
    if (d[e] && d[e].clientHeight) return d[e].clientWidth;
    if (d.body) return d.body.clientWidth;
}

export function getH(a=document,b="documentElement") {
    if (self.innerHeight) return self.innerHeight;
    if (a[b] && a[b].clientHeight) return a[b].clientHeight;
    if (a.body) return a.body.clientHeight;
}

export function titleObject(txt,x,y) {
    return {
        "shape": "text",
        "text": txt,
        "size": "4",
        "attr" : {
            "stroke":"#000",
            "stroke-width":"4px"
        },
        "foci": {
            "x": x,
            "y": y
        }
    }
}

// ES5 pythag polyfill

Math.hypot = Math.hypot || ((x,y) => Math.sqrt(x*x + y*y));
Math.calcHype = ((x1,x2,y1,y2) => Math.hypot(x1-x2,y1-y2));

// random string

export function noCache() {
    return "?" + Math.random().toString(36).substring(5);
}

// misc

export let rnd = qty => qty*Math.random()|0;

export function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

