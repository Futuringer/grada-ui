(function () {
  const sample = [{
      title: "1",
      value: 30,

    },
    {
      title: "2",
      value: 55,

    },
    {
      title: "3",
      value: 25,
    },
    {
      title: "4",
      value: 45,
    }
  ];

  const margin = 30;
  const width = 270 - 2 * margin;
  const height = 200 - 2 * margin;
  const svgContainer = d3.select(".nbar-widget__graph-container");
  const svg = svgContainer.select("svg");
  const chart = svg.append("g")
    .attr("transform", `translate(${margin}, ${margin})`)

  const yScale = d3.scaleLinear()
    .range([height, 0])
    .domain([0, 60])

  const xScale = d3.scaleBand()
    .range([0, width])
    .domain(sample.map((s) => s.title))
    .padding(0.4)

  const makeYLines = () => d3.axisLeft()
    .scale(yScale)
    .ticks(5) //количество полосок


  chart.append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(d3.axisBottom(xScale).tickFormat(() => ""))

  chart.append("g")
    .call(d3.axisLeft(yScale)
      .tickSize(0) //убрали черточки слева
      .ticks(5)); //количество цифр слева

  chart.append("g")
    .attr("class", "grid")
    .call(makeYLines()
      .tickSize(-width, 0, 0)
      .tickFormat("")
    )

  const barGroups = chart.selectAll()
    .data(sample)
    .enter()
  //.append("g")
  const color = ["url(#MyGradient1)", "url(#MyGradient2)", "url(#MyGradient3)", "url(#MyGradient)"]

  barGroups
    /*.append("path")
      .attr("d",`M 10 10 C 20 20, 40 20, 50 10`)
      .attr("stroke-width",5)
      .attr("stroke","blue")
      .attr("fill","blue")
      .attr("y", 25)*/
    .append("rect")
    .attr("class", "bar")
    .attr("x", (g) => xScale(g.title))
    .attr("y", (g) => yScale(g.value))
    .attr("height", (g) => height - yScale(g.value))
    .attr("width", xScale.bandwidth())
    .style("fill", function (d, i) {
      return color[i % 4] // функция берет цвета по очереди для каждого графика
    })
})()
