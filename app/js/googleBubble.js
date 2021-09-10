(function () {

  google.charts.load("current", { packages: ["corechart"] });
  google.charts.setOnLoadCallback(drawChart);

  function drawChart() {
    const data = google.visualization.arrayToDataTable([
      ["ID", "Life Expectancy", "Fertility Rate", "Region", "Population"],
      ["CAN", 80.66, 1.67, "North America", 33739900],
      ["DEU", 19.84, 1.36, "Europe", 81902307],
      ["DNK", 68.6, 1.84, "Europe", 5523095],
      ["EGY", 22.73, 2.78, "Middle East", 79716203],
      ["GBR", 30.05, 2, "Europe", 61801570],
      ["IRN", 92.49, 1.7, "Middle East", 73137148],
    ]);

    const options = {
      title: "0",
      hAxis: { title: "" },
      vAxis: { title: "" },
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
      onReady();
    });
    // var chart = new google.visualization.ColumnChart(document.getElementById('chart_div'));
    chart.draw(data, options);
  }

})();

