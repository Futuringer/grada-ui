(function () {
  google.charts.load("current", { packages: ["bar"] });
  google.charts.setOnLoadCallback(drawChart);

  function drawChart() {
    const data = google.visualization.arrayToDataTable([
      ["Year", "Sales", "Expenses", "Profit"],
      ["2014", 1000, 400, 200],
      ["2015", 1170, 460, 250],
      ["2016", 660, 1120, 300],
      ["2017", 1030, 540, 350],
    ]);

    const options = {
      hAxis: {
        title: "",
        textStyle: {
          color: "transparent",
        },
      },
      title: "",
      legend: {
        position: "none",
      },
      chart: {
        title: "",
        subtitle: "",
      },
      chartArea: {
        backgroundColor: "transparent",
      },
      backgroundColor: { fill: "transparent" },
    };

    const chart = new google.charts.Bar(
      document.getElementById("google-bar-widget")
    );

    chart.draw(data, google.charts.Bar.convertOptions(options));
  }
})();
