(function () {
  const wMaior = 150;
  const json = [
    [
      { axis: "Curabitur", value: 6 },
      { axis: "Cociis", value: 4 },
      { axis: "Cursus", value: 6 },
      { axis: "Lorem", value: 5.5 },
      { axis: "Maecenas", value: 8 },
      { axis: "Amet", value: 7 },
    ],
  ];

  function drawRadarCharts() {
    drawRadarChart(".radar-widget__graph-container", wMaior, wMaior);
  }

  function drawRadarChart(divId, w, h) {
    const circleSize = 5;
    const strokeWidthPolygon = "6px";

    const RadarChart = {
      draw: function (id, data, options) {
        const cfg = {
          radius: circleSize,
          w,
          h,
          factor: 1.1, //scale
          factorLegend: 0.85,
          levels: 3,
          maxValue: 0,
          radians: 2 * Math.PI,
          opacityArea: 0.001,
          ToRight: 5,
          TranslateX: 60,
          TranslateY: 30,
          ExtraWidthX: 10,
          ExtraWidthY: 100,
          color: d3.scaleOrdinal(d3.schemeCategory10),
        };

        if (options) {
          for (i in options) {
            if (options.hasOwnProperty(i)) {
              cfg[i] = options[i];
            }
          }
        }

        cfg.maxValue = Math.max(
          cfg.maxValue,
          d3.max(data, (i) => d3.max(i.map((o) => o.value)))
        );

        const allAxis = data[0].map((i) => i.axis);
        const total = allAxis.length;

        d3.select(id).select("svg").remove();

        const g = d3
          .select(id)
          .append("svg")
          .attr("width", cfg.w + cfg.ExtraWidthX)
          .attr("height", cfg.h + cfg.ExtraWidthY)
          .attr("class", "graph-svg-component")
          .append("g")
          .attr("transform", `translate(${cfg.TranslateX},${cfg.TranslateY})`);

        const axis = g.selectAll(".axis").data(allAxis).enter().append("g");
        let series = 0;

        axis
          .append("line")
          .attr("x1", cfg.w / 2)
          .attr("y1", cfg.h / 2)
          .attr("x2", function (d, i) {
            return (
              (cfg.w / 2) *
              (1 - cfg.factor * Math.sin((i * cfg.radians) / total))
            );
          })
          .attr("y2", function (d, i) {
            return (
              (cfg.h / 2) *
              (1 - cfg.factor * Math.cos((i * cfg.radians) / total))
            );
          })
          .attr("class", "line")
          .style("stroke", "grey")
          .style("stroke-width", "1px");

        axis
          .append("text")
          .attr("class", "legend")
          .text((d) => d)
          .attr("text-anchor", "middle")
          .attr("dy", "1em")
          .attr("transform", "translate(0, -10)")
          .attr("x", function (d, i) {
            return (
              (cfg.w / 2) *
                (1 - cfg.factorLegend * Math.sin((i * cfg.radians) / total)) -
              60 * Math.sin((i * cfg.radians) / total)
            );
          })
          .attr("y", function (d, i) {
            return (
              (cfg.h / 2) * (1 - Math.cos((i * cfg.radians) / total)) -
              20 * Math.cos((i * cfg.radians) / total)
            );
          });

        data.forEach(function (y, x) {
          dataValues = [];
          g.selectAll(".nodes").data(y, function (j, i) {
            dataValues.push([
              (cfg.w / 2) *
                (1 -
                  (parseFloat(Math.max(j.value, 0)) / cfg.maxValue) *
                    cfg.factor *
                    Math.sin((i * cfg.radians) / total)),
              (cfg.h / 2) *
                (1 -
                  (parseFloat(Math.max(j.value, 0)) / cfg.maxValue) *
                    cfg.factor *
                    Math.cos((i * cfg.radians) / total)),
            ]);
          });
          
          dataValues.push(dataValues[0]);
          g.selectAll(".area")
            .data([dataValues])
            .enter()
            .append("polygon")
            .attr("class", `radar-chart-series_ ${series}`)
            .style("stroke-width", strokeWidthPolygon)
            .style("stroke", cfg.color(series))
            .attr("points", function (d) {
              let str = [];
              for (let pti = 0; pti < d.length; pti++) {
                str.push(`${d[pti][0]},${d[pti][1]}`);
              }
              return str;
            })
            .style("fill-opacity", cfg.opacityArea);
          series++;
        });
        series = 0;
      },
    };

    // Options for the Radar chart, other than default
    const myOptions = {
      w,
      h,
      ExtraWidthX: 180,
    };

    RadarChart.draw(divId, json, myOptions);
  }
  drawRadarCharts();
})();
