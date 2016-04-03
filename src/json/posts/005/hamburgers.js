~function() {

    let burgerShuffle = [
        [   // burger
            {x1:"0",x2:"20",y1:"1",y2:"1"},
            {x1:"0",x2:"20",y1:"7",y2:"7"},
            {x1:"0",x2:"20",y1:"13",y2:"13"},
        ],
        [   // arrow
            {x1:"11",x2:"18",y1:"1",y2:"7"},
            {x1:"1",x2:"17",y1:"7",y2:"7"},
            {x1:"11",x2:"18",y1:"13",y2:"7"},
        ],
        [   // cross
            {x1:"4",x2:"16",y1:"13",y2:"1"},
            {x1:"10",x2:"10",y1:"7",y2:"7"},
            {x1:"4",x2:"16",y1:"1",y2:"13"},
        ],
    ];

    var dot = [].map.call([7,7,7], d => ({x1:d,x2:d,y1:d,y2:d}));

    var line = [].map.call([7,7,7], d => ({x1:0,x2:20,y1:7,y2:7}));;

    var cross = [
        {x1:"4",x2:"16",y1:"13",y2:"1"},
        {x1:"10",x2:"10",y1:"7",y2:"7"},
        {x1:"4",x2:"16",y1:"1",y2:"13"},
    ];

    var hamburger = [
        {x1:"0",x2:"20",y1:"1",y2:"1"},
        {x1:"0",x2:"20",y1:"7",y2:"7"},
        {x1:"0",x2:"20",y1:"13",y2:"13"},
    ];


    var c10 = d3.scale.category10();

    function init(i) {
        var svg = d3.select("body")
            .append("svg")
            .attr('viewBox', "-15 -15 51 45")
            .attr({"width":"100px", "height":"100px"})

        svg.append('g')
            .selectAll('line')
            .data(hamburger)
            .enter()
            .append('line')
            .attr("x1", d => d.x1)
            .attr("x2", d => d.x2)
            .attr("y1", d => d.y1)
            .attr("y2", d => d.y2)
            .attr('fill', 'none')
            .attr('stroke',c10(i))
            .attr('stroke-width', '3')
            .attr('stroke-linecap', 'round')

        return svg;
    }

    function setPos(selection) {
        selection
            .attr("x1", d => d.x1)
            .attr("x2", d => d.x2)
            .attr("y1", d => d.y1)
            .attr("y2", d => d.y2)
    }

    function shuffle(o) {
        for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
            return o
    }

    // first (line-elastic)

    init(0).on("click", morphFirst)

    var firstState = 1;

    function morphFirst(d) {

        d3.select(this)
            .selectAll('line')
            .data(line)
            .transition()
            .ease("cubicInOut")
            .duration(200)
            .call(setPos)
            .each("end", function(d) {
                d3.select(this.parentNode)
                    .selectAll('line')
                    .data(firstState?cross:hamburger)
                    .transition()
                    .ease("elastic")
                    .duration(400)
                    .call(setPos)

                firstState = firstState ? 0 : 1;
            })

    }

    // second (arrow-hover)

    init(1).on("mouseenter", morphSecond)
        .on("mouseleave", morphSecond)
        .on("click", morphSecond);

    function morphSecond(d) {

        let type =  d3.event.type == "mouseenter" ? 1 :
                    d3.event.type == "click" ? 2 :
                    d3.event.type == "touchend" ? 2 : 0;

        d3.select(this)
            .selectAll('line')
            .data(burgerShuffle.map(d => shuffle(d))[type])
            .transition()
            .duration(400)
            .call(setPos)

    }


    // third (line-rotate)

    init(2).on("click", morphThird)

    var stateThree = 0;

    function morphThird(d) {

        !stateThree &&
        d3.select(this)
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
                    .each("end", function() {
                        d3.select(this.parentNode)
                            .selectAll('line')
                            .data(cross)
                            .transition()
                            .ease("elastic")
                            .duration(400)
                            .call(setPos)
                        stateThree = 1;
                    })

            })

        stateThree &&
        d3.select(this)
            .selectAll('line')
            .data(line)
            .transition()
            .ease("cubicInOut")
            .duration(200)
            .call(setPos)
            .attr('transform', 'rotate(0,10,7)')
            .each("end", function() {
                d3.select(this.parentNode)
                    .selectAll('line')
                    .data(hamburger)
                    .transition()
                    .ease("cubicInOut")
                    .duration(200)
                    .call(setPos)
                stateThree = 0;
            })
    }

    // forth (colour-hover)

    init(3).on("mouseenter", morphFourth)
        .on("mouseleave", morphFourth)
        .on("click", morphFourth)
        .selectAll('.colour')
        .data(hamburger)
        .enter()
        .append('line')
        .classed('colour', true)
        .call(setPos)
        .attr("x2", d => d.x1)
        .attr('fill', 'none')
        .attr('stroke',c10(4))
        .attr('stroke-width', '3')
        .attr('stroke-linecap', 'round')
        .attr('opacity', '0')

    var stateFour = 0;

    function morphFourth(d) {

        let type =  d3.event.type;

        !stateFour &&
        (type == "mouseenter" || 
        type == "mouseleave") &&
        d3.select(this)
            .selectAll('.colour')
            .attr('opacity', '1')
            .transition()
            .ease("easeCubicInOut")
            .duration(200)
            .delay((d,i) => type == "mouseenter"?i*50:2-i*50)
            .call(setPos)
            .attr("x2", d => type == "mouseenter"?d.x2:d.x1)
            .each("end", function() {
                type == "mouseleave" &&
                d3.select(this)
                    .attr('opacity', 0)
            })

        type == "click" &&
        d3.select(this)
            .selectAll('.colour, line')
            .data(cross.map(d=>shuffle(d)).concat(cross.map(d=>shuffle(d))))
            .transition()
            .ease("easeCubicInOut")
            .duration(200)
            .call(setPos)
            .attr('stroke', '#4099FF')
            .each("end", d => {stateFour = 1})

        stateFour &&
        type == "click" &&
        d3.select(this)
            .selectAll('.colour, line')
            .data(hamburger.map(d => {d.colour = 1; return d}).concat(hamburger))
            .transition()
            .ease("easeCubicInOut")
            .duration(200)
            .call(setPos)
            .attr('stroke', c10(4))
            .each("end", function () {

                stateFour = 0;

                d3.select(this.parentNode)
                    .selectAll('line')
                    .attr('stroke',c10(3))

                d3.select(this.parentNode)
                    .selectAll('.colour')
                    .attr('stroke', c10(4))
                    .transition()
                    .ease("easeCubicInOut")
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

    // fifth (slide-fade)

    init(4).on("click", morphFifth)
        .selectAll('.cross')
        .data(dot) 
        .enter()
        .append('line')
        .classed('cross', true)
        .call(setPos)
        .attr('fill', 'none')
        .attr('stroke',c10(4))
        .attr('stroke-width', '3')
        .attr('opacity', 0)

    var stateFive = 0;

    function morphFifth(d) {

        !stateFive &&
        d3.select(this)
            .selectAll('line')
            .data(hamburger)
            .transition()
            .ease("cubicInOut")
            .duration(200)
            .delay((d,i) => i*70)
            .call(setPos)
            .attr("x2", d => d.x1)
            .each("end", function() {
                d3.select(this)
                    .attr('opacity', 0)

                d3.select(this.parentNode.parentNode)
                    .selectAll('.cross')
                    .data(cross)
                    .transition()
                    .ease("cubicInOut")
                    .duration(200)
                    .call(setPos)
                    .attr('opacity', 1)
                    .each("end", d => {stateFive = 1})
            })

        stateFive &&
        d3.select(this)
            .selectAll('.cross')
            .data(dot)
            .transition()
            .ease("cubicInOut")
            .duration(200)
            .call(setPos)
            .attr('opacity', 0)
            .each("end", function() {
                d3.select(this.parentNode)
                .selectAll('line')
                .attr('opacity', 1)
                .data(hamburger)
                .transition()
                .ease("cubicInOut")
                .duration(200)
                .delay((d,i) => 2-i*70)
                .call(setPos)
                .each("end", d => {stateFive = 0})
            });
            
    }

    // sixth 

    init(5).on("click", morphSixth)
        .on("mouseleave", morphSixth)
        .on("mouseenter", morphSixth)

        // triangle + rotate?

    function morphSixth(d) {

        var type = d3.event.type;

        type == "mouseenter" &&
        d3.select(this)
            .selectAll('line')
            .data(hamburger)
            .transition()
            .ease("elastic")
            .duration(400)
            .call(setPos)

        type == "click" &&
        d3.select(this)
            .selectAll('line')
            .data(cross)
            .transition()
            .ease("cubicInOut")
            .duration(400)
            .call(setPos)
    }

    init(6).on("click", morphSeventh)
        .insert('rect', 'g')
        .attr({
            x: -5,
            y: -7,
            width: 30,
            height: 28,
            fill: '#DDD'
        })

    var stateSeven = 0;

    function morphSeventh(d) {

        stateSeven = !stateSeven|0;

        d3.select(this)
            .select('rect')
            .transition()
            .ease("elastic")
            .duration(600)
            .attr('fill', stateSeven?c10(6):'#DDD')

        d3.select(this)
            .selectAll('line')
            .data(shuffle(burgerShuffle[stateSeven?2:0]))
            .transition()
            .ease("elastic")
            .duration(600)
            .call(setPos)
            .attr('stroke', !stateSeven?c10(6):'#DDD')

    }

    // http://tympanus.net/Development/ElasticSVGElements/hamburger.html
    // http://codepen.io/designcouch/pen/Atyop
    // https://dribbble.com/shots/2322176-Burger-Flip
    // https://dribbble.com/shots/2201588-Cato-List-Animation

    // rotate recode rotate + arrow
    // .map 10 7 rotate



    // init(6).on("click", morphSeventh)
    //     .on("mouseleave", morphSeventh)

    // function morphSeventh(d) {

    //     var type = d3.event.type == "click" ? 1 : 0;

    //     d3.select(this)
    //         .selectAll('line')
    //         .data(cross)
    //         .transition()
    //         .ease("cubicInOut")
    //         .duration(400)
    //         .call(setPos)
    // }


    
} ()




