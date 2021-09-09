(function () {
  var wMaior = 150;
  var json = [
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
    var circleSize = 5;
    var strokeWidthPolygon = "6px";

    var RadarChart = {
      draw: function (id, data, options) {
        var cfg = {
          radius: circleSize,
          w: w,
          h: h,
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

        if ("undefined" !== typeof options) {
          for (var i in options) {
            if ("undefined" !== typeof options[i]) {
              cfg[i] = options[i];
            }
          }
        }

        cfg.maxValue = Math.max(
          cfg.maxValue,
          d3.max(data, function (i) {
            return d3.max(
              i.map(function (o) {
                return o.value;
              })
            );
          })
        );
        var allAxis = data[0].map(function (i, j) {
          return i.axis;
        });
        var total = allAxis.length;
        d3.select(id).select("svg").remove();

        var g = d3
          .select(id)
          .append("svg")
          .attr("width", cfg.w + cfg.ExtraWidthX)
          .attr("height", cfg.h + cfg.ExtraWidthY)
          .attr("class", "graph-svg-component")
          .append("g")
          .attr(
            "transform",
            "translate(" + cfg.TranslateX + "," + cfg.TranslateY + ")"
          );

        let series = 0;

        var axis = g
          .selectAll(".axis")
          .data(allAxis)
          .enter()
          .append("g")
          .attr("class", axis);

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
          .text(function (d) {
            return d;
          })
          .attr("text-anchor", "middle")
          .attr("dy", "1em")
          .attr("transform", function (d, i) {
            return "translate(0, -10)";
          })
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
            .attr("class", "radar-chart-series_" + series)
            .style("stroke-width", strokeWidthPolygon)
            .style("stroke", cfg.color(series))
            .attr("points", function (d) {
              var str = "";
              for (var pti = 0; pti < d.length; pti++) {
                str = str + d[pti][0] + "," + d[pti][1] + " ";
              }
              return str;
            })
            .style("fill", function (j, i) {
              return cfg.color(series);
            })
            .style("fill-opacity", cfg.opacityArea);
          series++;
        });
        series = 0;
      },
    };

    // Options for the Radar chart, other than default
    var myOptions = {
      w: w,
      h: h,
      ExtraWidthX: 180,
    };

    RadarChart.draw(divId, json, myOptions);
  }
  drawRadarCharts();
})();
