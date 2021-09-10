(function () { 

  })();

  function onReady () {
    console.log("googleStyle")
    let barWidget = document.querySelector(".google-bubble__graph-container")
    let circle = barWidget.querySelector("circle");
    circle. setAttribute("fill","url(#MyGradient1)")
    console.log(barWidget);
    console.log(circle);
  }