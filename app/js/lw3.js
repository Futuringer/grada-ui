(function () {

 var data=[{Day:"Monday",EC:4424},{Day:"Tuesday",EC:3408},{Day:"Wednesday",EC:3137},{Day:"Thursday",EC:2239},{Day:"Friday",EC:3090},{Day:"Saturday",EC:209},{Day:"Sunday",EC:1}];

var days=['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday','Sunday']

// set up a drawing context
var margin = {
    top: 40,
    right: 40,
    bottom: 70,
    left: 100
};
var width = 540 - margin.left - margin.right;
var height = 330 - margin.top - margin.bottom;
// d3 init
var x = d3.scaleBand().domain(days).range([0, width]);
var y = d3.scaleLinear().range([height, 0]);

var xAxis = d3.axisBottom(x)
        .ticks(6)
var yAxis = d3.axisLeft(y).ticks(10);
var svg = d3.select(".line-widget__graph-container").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")"
);

var line = d3.line()

  .x(function(d) { 
    console.log(d)
    console.log(d.Day)
    return x(d.Day)
  })

  .y(function(d) { 
    return y(d.EC)
  })
  

    // Scale the range of the data
    //x.domain(d3.extent(data.map(function(d) { return d.Day; })));
    y.domain([0, d3.max(data, function(d) {
        return d.EC;
    })]);

    svg.append("path") // Add the line path.
        .attr("d", line(data))
        .attr("class", "line");

    // Add the black dots
    svg.selectAll("dot")                                    
        .data(data)                                         
        .enter().append("circle")                               
        .attr("r", 5)
        .attr("cx", function(d) { return x(d.Day) })
        //.attr("cx", function(d) { return x(d.Day); })       
        .attr("cy", function(d) { return y(d.EC); }) 

    // Add the axes
    svg.append("g") // Add the X Axis
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis);

    svg.append("g") // Add the Y Axis
            .attr("class", "y axis")
            .call(yAxis);

})()
