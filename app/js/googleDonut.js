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
    };

    const chart = new google.visualization.PieChart(
      document.getElementById("google-donut-widget")
    );
    
    chart.draw(data, options);
  }
})();
