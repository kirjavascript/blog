function menu() {

    var m = svg.append('g');

    // line

    var lineAttr = $ => ({
        x1:x(120),
        x2:x(1200),
        y1:y(120),
        y2:y(120),
        class:"line"
    });

    var line = m.append("line").attr(lineAttr(1))

    // items

    var itemAttr = $ => ({
        x: (d,i) => x(140) + i*x(80),
        y: y(100),
        class: "menu"
    });

    var nav = m.append("text")
        .selectAll(".menu")
        .data(items)

    var navGroup = nav.enter()
        .append("tspan")
        .attr(itemAttr())
        .text(d => d.name)

    // three visible circles gooey ?! social

    setInterval(() => {
        line.transition().duration(sp)
            .attr(lineAttr())

        navGroup.transition().duration(sp)
            .delay((d,i)=>i*100)
            .attr(itemAttr())
            .style("font-size", y(3)*x(5)+"px")
    },sp)

};

var items = [
    {name:"blog"},
    {name:"about"},
    {name:"more"},
];
