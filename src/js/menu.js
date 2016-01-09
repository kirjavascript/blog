function menu() {

    var interrupt = false;

    var items = [
        {
            name:"about",
            colour:"#B44642",
            click:() => {
                window.fragment("json/logos/stuff.json");
                getLatestPost();
            }
        },
        {
            name:"archive",
            colour:"#46B482",
            click:() => {
                window.fragment("json/logos/about.json");
                d3on("about.json");
            }
        },
        {
            name:"stuff",
            colour:"#4682B4",
            click:() => {
                window.fragment("json/logos/more.json")
                d3on("more.json");
            }
        },
    ];

    var m = svg.append('g');

    // items

    var itemAttr = $ => ({
        x: (d,i) => x(650) + i*x(200),
        y: y(160),
        "font-size":fontSize(0,0,1.6),
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
            .style("font-size", fontSize(0,0,2))
            .style("fill", d.colour)
            .ease("elastic")
    }

    function mmouseout(d) {
        interrupt = false;
        d3.select(this)
            .transition()
            .duration(200)
            .style("font-size", fontSize(0,0,1.6))
            .style("fill", '#7A7A7A')
            .ease("elastic")
    }

    function fontSize(d,i,s) {
        s = s || 1;
        return s*(x(20))+"px";
    }
};
