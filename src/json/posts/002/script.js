var tile = [3, 2, 2, 3, 4, 4, 3, 3, 2, 6, 6, 2, 4, 3, 3, 3, 7, 6, 6, 6, 2, 3, 3, 3, 7, 6, 6, 6, 7, 2, 2, 2, 7, 6, 6, 6, 5, 9, 6, 9, 4, 6, 6, 6, 5, 9, 7, 9, 10, 7, 6, 6, 15, 15, 11, 15, 10, 10, 10, 6, 6, 10, 10, 9];

var palette = ["000000", "000000", "2222aa", "2244cc", "4444ee", "6666ee", "eeeeee", "aaaaaa", "888888", "444444", "eeaa88", "aa6644", "ee0000", "880000", "eeaa00", "ee8800"];

// canvas rendering
var c = document.createElement('canvas');
c.width = 8*6;
c.height = 8*6;
c.style.float = "right";
var ctx = c.getContext("2d");
ctx.scale(6,6);
tile.forEach((d,i) => {
    ctx.fillStyle = '#' + palette[d];
    ctx.fillRect(i%8,(i/8)|0,1,1)
})
document.querySelector("#ctile").appendChild(c)

// png rendering
Array.prototype.forEach.call(document.querySelectorAll('.pngsrc'), d => {
  d.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAIAAABLbSncAAAA00lEQVQIHQHIADf/ACJEzCIiqiIiqiJEzERE7kRE7iJEzCJEzAAiIqru7u7u7u4iIqpERO4iRMwiRMwiRMwAqqqq7u7u7u7u7u7uIiKqIkTMIkTMIkTMAKqqqu7u7u7u7u7u7qqqqiIiqiIiqiIiqgCqqqru7u7u7u7u7u5mZu5ERETu7u5EREQARETu7u7u7u7u7u7uZmbuREREqqqqREREAO6qiKqqqu7u7u7u7u6IAO6IAKpmRO6IAADuqojuqojuqoju7u7u7u7uqojuqohERESSQHQVlFscsgAAAABJRU5ErkJggg=="
});

// box shadow
var s = [];
tile.forEach((d,i) => {
    s.push(((i*8)%64)+'px '+ (((i/8)|0)*8)+'px '+'#' + palette[d]);
})
var boxTile = document.querySelector("#boxTile")
boxTile.style.width = "8px";
boxTile.style.height = "8px";
boxTile.style.marginBottom = "64px";
boxTile.style.boxShadow = s.join(",");