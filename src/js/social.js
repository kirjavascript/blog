function social() {

    var items = [
        {
            name:"blocks",
            colour:'#FA0'
        },
        {
            name:"github",
            colour:'purple'
        },
        {
            name:"twitter",
            colour:'#00aced'
        },
        {
            name:"youtube",
            colour:'#b31217'
        },
    ];

    var s = svg.append("g")
        .attr({transform:"scale(0.5)"})

    var social = s.append("g")
        .selectAll(".social")
        .data(items)

    var sGroup = social.enter()
        .append("g")
        .attr("class", "social")
        .attr({
            transform: (d,i) => (d.name=="blocks"?
            'scale(0.2),translate('+[x(200),y(120)+(5*150)]+')':
            'translate('+[x(1180*2)-((items.length-i)*127),y(800*2)-157]+')')
        })
        .on("mouseover", function() {
            circle = d3.selectAll(".gooCircle")
                .attr("fill", d => d.colour)
                alert("test")
        })
        .each(function(d) {
            d3.xml("svg/"+d.name+".svg", (err,xml) => {
                d3.select(this).append(d => xml.querySelector("path"))
            })
        })



    // three visible circles gooey ?! social

    setInterval(() => {
        //line.transition().duration(sp)
    },sp)

    var goo = s.append("g")
    .attr({
        transform: (d,i) =>
        'translate('+[x(1180*2)-157,y(800*2)-157]+')'
    })
    var filter = gooey(goo);

    goo.on("mousemove", function() {
        var circle = d3.selectAll(".gooCircle");

        circle
            .attr("cx", d3.mouse(this)[0])
            .attr("cy", d3.mouse(this)[1])
    })

    // only in social bbox
    // set colour to specific colour

    goo.append("circle")
            .attr("class", "gooCircle")
            .attr("r", 40)
            .style("fill", "#FFF")

    goo.selectAll("socialCircle")
            .data(items)
            .enter()
            .append("circle")
            .attr("class", "socialCircle")
            .attr("cx", (d,i) => -i*157)
            .attr("cy", -50)
            .attr("r", 50)
            .style("fill", d => d.colour)
            .on("mouseover", d => {
                d3.select(".gooCircle")
                    .style("fill", d.colour)
            })



};
// github = purple

function gooey(container) {
    var defs = container.style("filter", "url(#gooey)").append('defs')
	var filter =  defs.append('filter').attr('id','gooey');
	filter.append('feGaussianBlur')
		.attr('in','SourceGraphic')
		.attr('stdDeviation','25')
		.attr('result','blur');
	filter.append('feColorMatrix')
		.attr('in','blur')
		.attr('mode','matrix')
		.attr('values','1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7')
		.attr('result','gooey');
	filter.append('feBlend')
		.attr('in','SourceGraphic')
		.attr('in2','gooey');
        return filter;
}
