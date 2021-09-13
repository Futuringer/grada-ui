(function () {
  google.charts.load("current", { packages: ["corechart"] });
  google.charts.setOnLoadCallback(drawChart);

  function drawChart() {
    const data = google.visualization.arrayToDataTable([
      ["", "Life Expectancy", "Fertility Rate", "Region", "Population"],
      ["", 80.66, 1.67, "North America", 33739900],
      ["", 19.84, 3.36, "Europe", 71902307],
      ["", 68.6, 1.84, "Europe", 5523095],
      ["", 17.73, 6.78, "Middle East", 59716203],
      ["", 30.05, 2, "Europe", 61801570],
      ["", 92.49, 4.7, "Middle East", 73137148],
    ]);
    const rangeX = data.getColumnRange(1);
    const options = {
      chartArea: {
        width: 200,
        height: 190,
        backgroundColor: "transparent",
      },
      backgroundColor: "transparent",
      legend: {
        position: "none",
      },
      hAxis: {
        baselineColor: "none",
        viewWindow: {
          min: rangeX.min - 20,
          max: rangeX.max + 20,
        },
        gridlines: {
          color: "transparent",
        },
        title: "",
      },
      vAxis: {
        baselineColor: "none",
        textStyle: {
          color: "black",
          fontSize: 11,
        },
        title: "",
      },
      bubble: {
        textStyle: {
          auraColor: "none",
        },
      },
    };

    chart = new google.visualization.BubbleChart(
      document.getElementById("google-bubble-widget")
    );
    google.visualization.events.addListener(chart, "ready", () => {
      const barWidget = document.querySelector(
        ".google-bubble__graph-container"
      );

      const circle = barWidget.querySelector("circle");
      
      circle.setAttribute("fill", "url(#MyGradient1)");
    });
    chart.draw(data, options);
  }
})();
