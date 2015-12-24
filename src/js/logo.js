function logo() {
    var l = svg.append("g")

    var r=1,g=1,b=1,seq=1;
    var hex="00 14 28 3C 50 64 78 8C A0 B4 C8 DC F0".split(" ");

    // reset bbox ?

    d3.json("json/logos/stuff.json", (err,data) => {

        var bbox = bboxHack(data);

        var p = l
            .selectAll("logo")
            .data(data)

        var pGroup = p
            .enter()
            .append("path")
            .attr("class", "logo")
            .attr("d", d => d)
            .attr("transform",particle)
            .style("fill",rndC)
            .style("stroke-width", 0)
        pGroup.transition()
            .duration(sp)
            .delay((d,i) => ((i)*3))
            .attr("transform","translate(0,0)")
            .style("fill", '#111')
            .style("stroke", '#111')
            .style("stroke-width", .6)


        l.attr(logoAttr(bbox))

        window.fragment = function(mesh) {

            pGroup
                .transition()
                // .delay(d => (((Math.random()*data.length)|0)*3))
                .delay((d,i) => ((i)*3))
                .duration(sp)
                .attr("transform",particle)
                .style("fill",rndC)
                .style("stroke-width", 0)
                .each("end", (d,i) => {

                    // on the final iteration...

                    i==data.length-1&&
                    d3.json(mesh, (err,data) => {

                        // remove old particles
                        l.selectAll(".logo")
                        .transition()
                        .duration(sp)
                        .attr("transform",particle)
                        .style("opacity", 0)
                        .remove()

                        // draw new particles
                        l.selectAll(".logo_buf")
                        .data(data)
                        .enter()
                        .append("path")
                        .attr("transform",particle)

                        .style("fill",rndC)
                        .attr("class", "logo")
                        .style("opacity", 0)
                        .transition()
                        .duration(sp)
                        .style("opacity", 1)
                        .attr("transform",particle)
                        .attr("d", d => d)
                        .each("end", (d,i) => {
                            i==data.length-1&&
                            l.selectAll(".logo")
                            .transition()
                            .duration(sp/2)
                            //.delay((d,i) => ((i)*3))
                            .attr("transform","translate(0,0)")
                            .style("fill", '#111')
                            .style("stroke", '#111')
                            .style("stroke-width", .6)
                        })
                    })


                })
        }

        setInterval(() => {
            l.attr(logoAttr(bbox))
        },sp*2)

    })

    function rndC() {
        6==seq&&(b--,0==b&&(seq=1));5==seq&&(r++,12==r&&(seq=6));4==seq&&(g--,0==g&&(seq=5));3==seq&&(b++,12==b&&(seq=4));2==seq&&(r--,0==r&&(seq=3));1==seq&&(g++,12==g&&(seq=2));return"#"+hex[r]+hex[g]+hex[b]
    }

    function particle() {
        var tx = x((Math.random()*120)|0);
        var ty = y((Math.random()*80)|0);
        return 'scale(1),translate('+[-tx/2,ty/2]+')';
    }

    function logoAttr(bbox) {
        return {
            transform: "scale(2),translate("+[
                (c.w/2)-(bbox.width/2),
                bbox.height/2
            ]+")"
        }
    }

    function bboxHack(data) {
        var tmp = svg.append("g").attr("transform","scale(2)")
            tmp.selectAll("tmp").data(data).enter().append("path")
                    .attr("class", "tmp")
                    .attr("d", d => d)
        var bbox = tmp.node().getBBox();
            tmp.remove();

        return bbox;
    }



};
