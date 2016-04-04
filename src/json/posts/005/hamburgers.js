~function() {

    // data //

    var burger = [
        {x1:"0",x2:"20",y1:"1",y2:"1"},
        {x1:"0",x2:"20",y1:"7",y2:"7"},
        {x1:"0",x2:"20",y1:"13",y2:"13"},
    ];

    var dot = [].map.call([7,7,7], d => ({x1:d,x2:d,y1:d,y2:d}));

    var line = [].map.call([7,7,7], d => ({x1:0,x2:20,y1:7,y2:7}));

    var cross = [
        {x1:"4",x2:"16",y1:"13",y2:"1"},
        {x1:"10",x2:"10",y1:"7",y2:"7"},
        {x1:"4",x2:"16",y1:"1",y2:"13"},
    ];

    var miniCross = [
        {x1:"7",x2:"13",y1:"10",y2:"4"},
        {x1:"7",x2:"13",y1:"4",y2:"10"},
    ];

    var arrow = [
        {x1:"11",x2:"18",y1:"1",y2:"7"},
        {x1:"1",x2:"17",y1:"7",y2:"7"},
        {x1:"11",x2:"18",y1:"13",y2:"7"},
    ];

    // CLONE

    var burgerShuffle = [
        [].map.call(burger, d => d),
        [].map.call(arrow, d => d),
        [].map.call(cross, d => d),
    ];

    // functions //

    var colour = d3.scale.category10();

    function init(i) {
        var svg = d3.select("body")
            .append("svg")
            .attr('viewBox', "-15 -15 51 45")
            .attr({"width":"100px", "height":"100px"})

        svg.append('g')
            .selectAll('line')
            .data(burger)
            .enter()
            .append('line')
            .attr("x1", d => d.x1)
            .attr("x2", d => d.x2)
            .attr("y1", d => d.y1)
            .attr("y2", d => d.y2)
            .call(makeLine, colour(i))

        return svg;
    }

    function setPos(selection) {
        selection
            .attr("x1", d => d.x1)
            .attr("x2", d => d.x2)
            .attr("y1", d => d.y1)
            .attr("y2", d => d.y2)
    }

    function makeLine(selection, colour) {
        selection.attr('fill', 'none')
            .attr('stroke', colour)
            .attr('stroke-width', '3')
            .attr('stroke-linecap', 'round')
    }

    function shuffle(o) {
        for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
            return o
    }

    // burgers //

    var num = 0;

    // (line-elastic)

    ~function(num) {

        var svg = init(num).on("click", morph)

        var state = 1;

        function morph() {

            svg.selectAll('line')
                .data(line)
                .transition()
                .ease("cubicInOut")
                .duration(200)
                .call(setPos)
                .each("end", d => {
                    svg.selectAll('line')
                        .data(state?cross:burger)
                        .transition()
                        .ease("elastic")
                        .duration(400)
                        .call(setPos)

                    state = state ? 0 : 1;
                })

        }

    } (num++)

    // (arrow-hover)

    ~function(num) {

        var svg = init(num).on("mouseenter", morph)
            .on("mouseleave", morph)
            .on("click", morph);

        function morph() {

            var type =  d3.event.type == "mouseenter" ? 1 :
                        d3.event.type == "click" ? 2 :
                        d3.event.type == "touchend" ? 2 : 0;

            svg.selectAll('line')
                .data(burgerShuffle.map(d => shuffle(d))[type])
                .transition()
                .duration(400)
                .call(setPos)

        }

    } (num++)

    // (line-rotate)

    ~function(num) {

        var svg = init(num).on("click", morph)

        var state = 0;

        function morph() {

            !state && svg
                .selectAll('line')
                .data(line)
                .transition()
                .ease("cubicInOut")
                .duration(200)
                .call(setPos)
                .each("end", function() {

                    d3.select(this)
                        .transition()
                        .ease("cubicInOut")
                        .duration(200)
                        .attr('transform', 'rotate(90,10,7)')
                        .each("end", d => {

                            svg.selectAll('line')
                                .data(cross)
                                .transition()
                                .ease("elastic")
                                .duration(400)
                                .call(setPos)

                            state = 1;
                        })

                })

            state && svg
                .selectAll('line')
                .data(line)
                .transition()
                .ease("cubicInOut")
                .duration(200)
                .call(setPos)
                .attr('transform', 'rotate(0,10,7)')
                .each("end", d => {

                    svg.selectAll('line')
                        .data(burger)
                        .transition()
                        .ease("cubicInOut")
                        .duration(200)
                        .call(setPos)

                    state = 0;
                })
        }

    } (num++)

    // (colour-hover)

    ~function(num) {

        var svg = init(num).on("mouseenter", morph)
            .on("mouseleave", morph)
            .on("click", morph);

        svg.selectAll('.colour')
            .data(burger)
            .enter()
            .append('line')
            .classed('colour', true)
            .call(setPos)
            .attr("x2", d => d.x1)
            .call(makeLine, colour(num+1))
            .attr('opacity', '0')

        var state = 0;

        function morph() {

            var type =  d3.event.type;

            !state &&
            (type == "mouseenter" || type == "mouseleave") && svg
                .selectAll('.colour')
                .attr('opacity', '1')
                .transition()
                .ease("linear")
                .duration(200)
                .delay((d,i) => type == "mouseenter"?i*50:2-i*50)
                .call(setPos)
                .attr("x2", d => type == "mouseenter"?d.x2:d.x1)
                .each("end", function() {
                    type == "mouseleave" &&
                    d3.select(this)
                        .attr('opacity', 0)
                })

            type == "click" && svg
                .selectAll('.colour, line')
                .data(cross.map(d=>shuffle(d)).concat(cross.map(d=>shuffle(d))))
                .transition()
                .ease("linear")
                .duration(200)
                .call(setPos)
                .attr('stroke', '#4099FF')
                .each("end", d => {state = 1})

            state &&
            type == "click" && svg
                .selectAll('.colour, line')
                .data(burger.concat(burger))
                .transition()
                .ease("linear")
                .duration(200)
                .call(setPos)
                .attr('stroke', colour(num+1))
                .each("end", d => {

                    state = 0;

                    svg.selectAll('line')
                        .attr('stroke',colour(num))

                    svg.selectAll('.colour')
                        .attr('stroke', colour(num+1))
                        .transition()
                        .ease("linear")
                        .duration(400)
                        .delay((d,i) => 2-i*100)
                        .call(setPos)
                        .attr("x2", d => d.x1)
                        .each("end", function() {
                            d3.select(this)
                                .attr('opacity', 0)
                        })

                })
                
        }

    } (num++)

    // (slide-fade)

    ~function(num) {

        var svg = init(num).on("click", morph);

        svg.selectAll('.cross')
            .data(dot) 
            .enter()
            .append('line')
            .classed('cross', true)
            .call(setPos)
            .call(makeLine, colour(4))
            .attr('opacity', 0)

        var state = 0;

        function morph() {

            !state && svg
                .selectAll('line')
                .data(burger)
                .transition()
                .ease("cubicInOut")
                .duration(200)
                .delay((d,i) => 2-i*70)
                .call(setPos)
                .attr("x2", d => d.x1)
                .each("end", function() {
                    d3.select(this)
                        .attr('opacity', 0)

                    svg.selectAll('.cross')
                        .data(cross)
                        .transition()
                        .ease("cubicInOut")
                        .duration(200)
                        .call(setPos)
                        .attr('opacity', 1)
                        .each("end", d => {state = 1})
                })

            state && svg
                .selectAll('.cross')
                .data(dot)
                .transition()
                .ease("cubicInOut")
                .duration(100)
                .call(setPos)
                .attr('opacity', 0)
                .each("end", d => {
                    svg.selectAll('line')
                        .attr('opacity', 1)
                        .data(burger)
                        .transition()
                        .ease("cubicInOut")
                        .duration(200)
                        .delay((d,i) => 2-i*70)
                        .call(setPos)
                        .each("end", d => {state = 0})
                });
                
        }

    } (num++)

    // 360

    ~function(num) {

        var svg = init(num).on("click", morph);

        svg.selectAll('line')
            .style('transform-origin', '10px 7px')

        var state = 2;

        function morph() {

            svg.selectAll('line')
                .data(shuffle(burgerShuffle[state]))
                .transition()
                .ease('sine')
                .duration(300)
                .call(setPos)
                .attrTween('transform', d => {
                    var i = d3.interpolate(0, 360);
                    return t => `rotate(${i(t)})`;
                })
                .each("end", d => {
                    state = state ? 0 : 2;
                })
        }

    } (num++)

    // bgcolour

    ~function(num) {

        var svg = init(num).on("click", morph);

        svg.insert('rect', 'g')
            .attr({
                x: -5,
                y: -7,
                width: 30,
                height: 28,
                fill: '#DDD'
            })

        var state = 0;

        function morph() {

            state = !state|0;

            svg.select('rect')
                .transition()
                .ease("linear")
                .duration(300)
                .attr('fill', state?colour(num):'#DDD')

            svg.selectAll('line')
                .data(shuffle(burgerShuffle[state?2:0]))
                .transition()
                .ease("elastic")
                .duration(600)
                .call(setPos)
                .attr('stroke', !state?colour(num):'#DDD')

        }

    } (num++)

    // down and bounce

    ~function(num) {

        var svg = init(num).on("click", morph);

        svg.select('g')
            .classed('burger', true)
            .attr('opacity', 1)

        svg.append('g')
            .attr('opacity', 0)
            .attr('transform', 'translate(0, -20)')
            .classed('cross', true)
            .selectAll('line')
            .data(cross)
            .enter()
            .append('line')
            .call(setPos)
            .call(makeLine, colour(num))
            

        var state = 0;

        function morph() {

            svg.select(state?'.cross':'.burger')
                .transition()
                .ease("easeCubicOut")
                .duration(300)
                .attr('transform', 'translate(0, 20)')
                .attr('opacity', 0)
                .each("end", function() {
                    d3.select(this)
                        .attr('transform', 'translate(0, -20)')
                })

            state = !state|0;

            svg.select(state?'.cross':'.burger')
                .transition()
                .ease("bounce")
                .duration(300)
                .attr('transform', 'translate(0, 0)')
                .attr('opacity', 1)

        }

    } (num++)

    // simple 3d

    ~function(num) {

        var svg = init(num).on("click", d => morph(false));

        function morph(state) {

            svg.on("click", null);

            svg.selectAll('line')
                .data(state?cross:burger)
                .call(setPos)

            svg.transition()
                .duration(200)
                .ease("linear")
                .styleTween('transform', d => state?tween(180, 270):tween(0, 90))
                .each("end", d => {
                    svg.selectAll('line')
                        .data(state?burger:cross)
                        .call(setPos)

                    svg.transition()
                        .duration(200)
                        .ease("linear")
                        .styleTween('transform', d => state?tween(270, 360):tween(90, 180))
                        .each("end", d => {svg.on("click", d => morph(!state))})
                })

        }

        function tween(a, b) {
            var i = d3.interpolate(a, b);
            return t => `rotateX(${i(t)}deg)`;
        }

    } (num++)


    // circle

    ~function(num) {

        var svg = init(num).on("click", morphCircle);

        var radius = 10;

        var circle = svg.append('circle')
            .attr('cx', 10)
            .attr('cy', 7)
            .attr('r', radius)
            .call(makeLine, colour(num))
            .attr("stroke-dasharray", radius*2*Math.PI)
            .attr("stroke-dashoffset", radius*2*Math.PI);

        function morphCircle() {

            svg.on('click', null);

            svg.selectAll('line')
                .transition()
                .duration(200)
                .ease("quad")
                .attr({x1:"20",x2:"20",y1:"7",y2:"7"})

            circle.transition()
                .duration(500)
                .ease("cubic")
                .attr("stroke-dashoffset", 0)
                .each("end", d => {
                    svg.selectAll('line')
                        .data(miniCross)
                        .attr({x1:"10",x2:"10",y1:"7",y2:"7"})
                        .transition()
                        .duration(450)
                        .ease('elastic')
                        .call(setPos)
                        .each("end", d => {svg.on('click', morphBurger)})
                })

        }

        function morphBurger() {

            svg.on('click', null);

            circle.transition()
                .duration(500)
                .ease("cubic")
                .attr("stroke-dashoffset", -radius*2*Math.PI)
                .each("end", d => {

                    circle.attr("stroke-dashoffset", radius*2*Math.PI)

                    svg.selectAll('line')
                        .data(burger)
                        .transition()
                        .duration(600)
                        .ease("elastic")
                        .call(setPos)
                        .each("end", d => {svg.on('click', morphCircle)})
                })

        }

    } (num++)

    // move out in line, move in inb line http://www.designcouch.com/
    // have tick? (down up wobble)
    // perspective back and forward bounce easing
    // make box with cross in it
    // smiley face CURVES only one
    // other curvy stuff d3.svg.path
    // simple diag mask transform

    // clean up colourful one (remove rounding) (break into two?)

    // other attrs

    

    // svg mesh burger delay opacity fade out (rnd?) in and d attr 2 burgers
    // paths bend (use paths with one line and stroke so you can dasharray hax :D)
    
} ()




