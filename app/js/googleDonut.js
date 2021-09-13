(function () {
  google.charts.load("current", { packages: ["corechart"] });
  google.charts.setOnLoadCallback(drawChart);

  function drawChart() {
    const data = google.visualization.arrayToDataTable([
      ["Task", "Hours per Day"],
      ["Work", 11],
      ["Eat", 2],
      ["Commute", 2],
      ["Watch TV", 2],
      ["Sleep", 7],
    ]);
    const options = {
      title: "",
      pieHole: 0.8,
      legend: "none",
      backgroundColor: "transparent",
      percent: "none",
      slices: {},
    };
    const chart = new google.visualization.PieChart(
      document.getElementById("google-donut-widget")
    );

    google.visualization.events.addListener(chart, "ready", () => {
      const donutWidget = document.querySelector(
        ".google-donut__graph-container"
      );
      const circleParts = donutWidget
        .querySelector("svg")
        .querySelectorAll("g");

      const colors = [
        "url(#MyGradient1)",
        "url(#MyGradient2)",
        "url(#MyGradient3)",
        "url(#MyGradient1)",
        "url(#MyGradient2)",
        "url(#MyGradient3)",
      ];

      circleParts.forEach((element, i) => {
        if (element.querySelector("path")) {
          let path = element.querySelector("path");
          path.setAttribute("fill", colors[i]);
        }
      });
      
    });
    chart.draw(data, options);
  }
})();
