(function () {
  const data = [
    {
      name: "1",
      values: [
        {
          date: "January",
          price: "0",
        },
        {
          date: "February",
          price: "5",
        },
        {
          date: "March",
          price: "15",
        },
        {
          date: "April",
          price: "18",
        },
        {
          date: "May",
          price: "33",
        },
        {
          date: "June",
          price: "32",
        },
        {
          date: "July",
          price: "42",
        },
      ],
    },
    {
      name: "2",
      values: [
        {
          date: "January",
          price: "10",
        },
        {
          date: "February",
          price: "20",
        },
        {
          date: "March",
          price: "25",
        },
        {
          date: "April",
          price: "41",
        },
        {
          date: "May",
          price: "49",
        },
        {
          date: "June",
          price: "45",
        },
        {
          date: "July",
          price: "50",
        },
      ],
    },
  ];

  const width = 270;
  const height = 170;
  const margin = 25;
  const lineOpacity = "0.25";
  const circleOpacity = "0.85";
  const circleRadius = 3;

  /* Format Data */
  const parseDate = d3.timeParse("%B");
  
  data.forEach((d) => {
    d.values.forEach((d) => {
      d.date = parseDate(d.date);
      d.price = +d.price;
    });
  });

  const xScale = d3
    .scaleTime()
    .domain(d3.extent(data[0].values, (d) => d.date))
    .range([0, width - margin]);

  const yScale = d3
    .scaleLinear()
    .domain([0, d3.max(data[1].values, (d) => d.price) + 10])
    .range([height - margin, 0]);

  /* Add SVG */
  const svg = d3
    .select(".line-widget__graph-container")
    .append("svg")
    .attr("width", `${width + margin}px`)
    .attr("height", `${width + margin}px`)
    .append("g")
    .attr("transform", `translate(${margin}, ${margin})`);

  /* Add line into SVG */
  const line = d3
    .line()
    .x((d) => xScale(d.date))
    .y((d) => yScale(d.price));

  const lines = svg.append("g");
  const color = ["blue", "pink"];

  lines
    .selectAll(".line-group")
    .data(data)
    .enter()
    .append("g")
    .attr("class", "line-group")
    .append("path")
    .attr("class", "line")
    .attr("d", (d) => line(d.values))
    .style("stroke", (d, i) => color[i % 2])
    .style("opacity", lineOpacity);

  /* Add circles in the line */
  lines
    .selectAll("circle-group")
    .data(data)
    .enter()
    .append("g")
    .style("fill", (d, i) => color[i % 5])
    .selectAll("circle")
    .data((d) => d.values)
    .enter()
    .append("g")
    .attr("class", "circle")

    .append("circle")
    .attr("cx", (d) => xScale(d.date))
    .attr("cy", (d) => yScale(d.price))
    .attr("r", circleRadius)
    .style("opacity", circleOpacity);

  const tickLabels = ["M", "T", "W", "T", "F", "S", "S"];
  const xAxis = d3.axisBottom(xScale).tickFormat((d, i) => tickLabels[i]);
  const yAxis = d3
    .axisLeft(yScale)
    .ticks(5)
    .tickSize(-width + margin, 0, 0);

  svg
    .append("g")
    .attr("class", "x axis")
    .attr("transform", `translate(0, ${height - margin})`)
    .call(xAxis);

  svg.append("g").attr("class", "y axis").call(yAxis);
})();
