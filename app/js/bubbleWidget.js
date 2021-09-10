(function () {
  const dataset = [
    { xCoord: 10, yCoord: 50, radius: 13, color: "blue" },
    { xCoord: 50, yCoord: 30, radius: 11, color: "red" },
    { xCoord: 30, yCoord: 10, radius: 12, color: "green" },
    { xCoord: 30, yCoord: 30, radius: 18, color: "blue" },
    { xCoord: 20, yCoord: 20, radius: 11, color: "red" },
    { xCoord: 10, yCoord: 10, radius: 22, color: "green" },
  ];

  const yMax = d3.max(dataset, (d) => d.yCoord);
  const xMax = d3.max(dataset, (d) => d.xCoord);

  const marginTop = 30;
  const marginRight = 30;
  const marginBottom = 30;
  const marginLeft = 30;
  const width = 295 - marginLeft - marginRight;
  const height = 195 - marginTop - marginBottom;

  const svg = d3
    .select(".bubble-widget__graph-container")
    .append("svg")
    .attr("width", width + marginLeft + marginRight)
    .attr("height", height + marginTop + marginBottom)
    .append("g")
    .attr("transform", `translate(${marginLeft},${marginTop})`);

  // Add X axis
  const x = d3
    .scaleLinear()
    .domain([0, xMax + 10])
    .range([0, width]);

  svg
    .append("g")
    .attr("transform", `translate(0,${height})`)
    .call(d3.axisBottom(x).ticks(7))
    .attr("class", "x-axe");

  // Add Y axis
  const y = d3
    .scaleLinear()
    .domain([0, yMax + 10])
    .range([height, 0]);

  svg.append("g").call(d3.axisLeft(y).ticks(7).tickSize(-width, 0, 0));

  // Add bubbles
  svg
    .append("g")
    .selectAll("bubble")
    .data(dataset)
    .enter()
    .append("circle")
    .attr("cx", (d) => x(d.xCoord)) // 50 is offset
    .attr("cy", (d) => y(d.yCoord))
    .attr("r", (d) => d.radius)
    .style("fill", (d) => d.color)
    .attr("stroke", "none");
})();
