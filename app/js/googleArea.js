(function () {
  function drawChart() {

    const data = google.visualization.arrayToDataTable([
      ["Year", "Asia", "Europe"],
      ["2013", 200, 100],
      ["2014", 1400, 1260],
      ["2015", 700, 480],
      ["2016", 550, 240],
    ]);

    const options = {
      hAxis: {
        title: "",
        textStyle: {
          color: "transparent",
        },
      },
      vAxis: {
        title: "",
        textStyle: {
          color: "black",
        },
      },
      chartArea: {
        width: 200,
        height: 170,
        backgroundColor: "transparent",
      },
      title: "",
      legend: {
        position: "none",
      },
      backgroundColor: "transparent",
    };

    const chart = new google.visualization.AreaChart(
      document.getElementById("google-area-widget")
    );
    
    chart.draw(data, options);
  }
  google.charts.setOnLoadCallback(drawChart);
})();
