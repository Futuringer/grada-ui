
const data = [
  { name: "1", value: 40},
  { name: "2",      value: 25 },
  { name: "3",   value: 15 },
  { name: "4",      value: 10}
];

const margin = { top: 20, right: 20, bottom: 40, left: 45 }
const svgWidth = 270;
const svgHeight = 240;
const width = svgWidth - margin.left - margin.right
const height = svgHeight - margin.top - margin.bottom

const svg = d3
  .select('.bar-widget__graph-container')
  .append('svg')
  .attr('width', svgWidth)
  .attr('height', svgHeight);

const graphArea = svg
  .append('g')
  .attr('transform', `translate(${margin.left}, ${margin.top})`);

const x = d3.scaleBand()
  .rangeRound([0, width])
  .domain(data.map(d => d.name))
  .padding(0.5);  //регулирует толщину линий

const y = d3.scaleLinear()
  .range([height, 0])
  .domain([
    d3.min(data, d => d.value) - 5,
    d3.max(data, d => d.value) + 10  //на сколько шкала выше самого высокого графика
  ])
  .nice();

const xAxis = d3.axisBottom(x)
  .tickFormat(() => "")
  .tickSize(0)
  .tickValues([])

const yAxis = d3.axisLeft(y).tickSize(0);
//нижняя полоса
graphArea
  .append('g')
  .attr('class', 'axis')
  .attr('transform', `translate(0, ${height})`)
  .call(xAxis);
  
//левая полоса
graphArea
  .append('g')
  .attr('class', 'axis')
  .call(yAxis);

const rx = 12;
const ry = 12;
var color = ["pink", "orange", "blue","green"]


//линии горизонтальные
const yScale = d3.scaleLinear()
.domain([0, d3.max(data, d => d.value)])
.range([height, 0]);
const yGridlines = d3.axisLeft()
  .scale(yScale)
  .ticks(5)
  .tickSize(-width,0,0)
  .tickFormat('')
graphArea.append('g')
  .call(yGridlines)
  .classed('gridline', true);



graphArea
   .selectAll("bar")
   .data(data)
   .enter().append("path")
      .style("fill", function(d, i) {
          return color[i%4]  // функция берет цвета по очереди для каждого графика
        }) 
      .attr("d", item => `
        M${x(item.name)},${y(item.value) + ry}
        a${rx},${ry} 0 0 1 ${rx},${-ry}
        h${x.bandwidth() - 2 * rx}
        a${rx},${ry} 0 0 1 ${rx},${ry}
        v${height - y(item.value) - ry}
        h${-(x.bandwidth())}Z
      `);

      
