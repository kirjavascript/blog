function menu() {

    var interrupt = false;

    var items = [
        {
            name:"blog",
            colour:"#B44642",
            click:() => {
                window.fragment("json/logos/stuff.json")
            }
        },
        {
            name:"about",
            colour:"#46B482",
            click:() => {
                window.fragment("json/logos/about.json");
                d3on("about.json");
            }
        },
        {
            name:"more",
            colour:"#4682B4",
            click:() => {
                window.fragment("json/logos/more.json")
            }
        },
    ];

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
        .on('click' , d => {typeof d.click=="function"&&d.click()})
        .on("mouseover", mmouseover)
        .on("mouseout", mmouseout)

    function mmouseover(d) {
        interrupt = true;
        d3.select(this)
            .transition()
            .duration(200)
            .style("font-size", fontSize(0,0,1.5))
            .style("fill", d.colour)
            .ease("elastic")
    }

    function mmouseout(d) {
        interrupt = false;
        d3.select(this)
            .transition()
            .duration(200)
            .style("font-size", fontSize)
            .style("fill", '#7A7A7A')
            .ease("elastic")
    }

    setInterval(() => {
        if(!interrupt) {
            line.transition().duration(sp)
                .attr(lineAttr())

            navGroup.transition().duration(sp)
                .delay((d,i)=>i*100)
                .attr(itemAttr())
                .style("font-size", fontSize)
        }
    },sp)

    function fontSize(d,i,s) {
        s = s || 1;
        return s*(y(3)*x(5))+"px";
    }
};
