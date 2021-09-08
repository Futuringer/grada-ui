(function () {
  const data = [{
      name: "1",
      value: 25
    },
    {
      name: "2",
      value: 35
    },
    {
      name: "3",
      value: 55
    },
    {
      name: "4",
      value: 42
    }
  ];

  const margin = {
    top: 20,
    right: 20,
    bottom: 40,
    left: 45
  }
  const svgWidth = 270;
  const svgHeight = 240;
  const width = svgWidth - margin.left - margin.right
  const height = svgHeight - margin.top - margin.bottom

  const svg = d3
    .select(".bar-widget__graph-container")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);

  const graphArea = svg
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

  const x = d3.scaleBand()
    .rangeRound([0, width])
    .domain(data.map(d => d.name))
    .padding(0.5); //bars width

  const y = d3.scaleLinear()
    .range([height, 0])
    .domain([0, 60])
    .nice();

  const xAxis = d3.axisBottom(x)
    .tickFormat(() => "")
    .tickSize(0)
    .tickValues([])

  const yAxis = d3.axisLeft(y).tickSize(0).ticks(6); //left numbers
  //bottom line
  graphArea
    .append("g")
    .attr("class", "axis")
    .attr("transform", `translate(0, ${height})`)
    .call(xAxis);

  //left line
  graphArea
    .append("g")
    .attr("class", "axis")
    .call(yAxis);

  const rx = 12;
  const ry = 12;
  const color = ["url(#MyGradient)", "url(#MyGradient)", "url(#MyGradient)", "url(#MyGradient)"]

  //horizontal lines
  const yScale = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.value)])
    .range([height, -0]);
  const yGridlines = d3.axisLeft()
    .scale(yScale)
    .ticks(4)
    .tickSize(-width, 0, 0)
    .tickFormat("")
    .tickSizeOuter(0) //hides outter y line
  //.tickSizeInner(0) //hides inner y line

  graphArea.append("g")
    .call(yGridlines)
    .classed("gridline", true);
  //

  graphArea
    .selectAll("bar")
    .data(data)
    .enter().append("path")
    .style("fill", function (d, i) {
      return color[i % 4]
    })
    .attr("d", item => `
        M${x(item.name)},${y(item.value) + ry}
        a${rx},${ry} 0 0 1 ${rx},${-ry}
        h${x.bandwidth() - 2 * rx}
        a${rx},${ry} 0 0 1 ${rx},${ry}
        v${height - y(item.value) - ry}
        h${-(x.bandwidth())}Z
      `);
})()
