(function () {

google.load('visualization', '1', { packages: ['corechart', 'line'] });
google.setOnLoadCallback(drawBackgroundColor);

function drawBackgroundColor() {
    var data = new google.visualization.DataTable();
    data.addColumn('number', 'X');
    data.addColumn('number', 'Dogs');
    data.addColumn('number', 'CAts');
    data.addRows([
      [0, 0,2], [1, 10,3], [2, 23,5], [3, 17,6], [4, 18,3], [5, 9,2],
    ]);

    var options = {
    hAxis: {
        title: '',
        textStyle: {
            color: "#fff",
            fontSize: 11,
            bold: true,
            italic: false
        }
    },
        vAxis: {
        title: '',
        textStyle: {
            color: "#fff",

            fontSize: 11,
            bold: true,
            italic: false
        }
    },
        backgroundColor: 'transparent'
    };

    var chart = new google.visualization.LineChart(document.getElementById('google-line-widget'));
    google.visualization.events.addOneTimeListener(chart, 'ready', function () {
        addChartGradient(chart);
    });
    chart.draw(data, options);
}

function addChartGradient(chart) {
    var chartDiv = chart.getContainer();
    var svg = chartDiv.getElementsByTagName('svg')[0];
    var properties = {
        id: "chartGradient",
        x1: "0%",
        y1: "0%",
        x2: "0%",
        y2: "100%",
        stops: [
            { offset: '5%', 'stop-color': '#f60' },
            { offset: '95%', 'stop-color': '#ff6' }
        ]
    };
    

    createGradient(svg, properties);
    var chartPath = svg.getElementsByTagName('path')[2];
    chartPath.setAttribute('stroke', 'url(#chartGradient)');
    //chartPath.attr('fill', 'url(#chartGradient)');
}


function createGradient(svg, properties) {
    var svgNS = svg.namespaceURI;
    var grad = document.createElementNS(svgNS, 'linearGradient');
    grad.setAttribute('id', properties.id);
    ["x1","y1","x2","y2"].forEach(function(name) {
        if (properties.hasOwnProperty(name)) {
            grad.setAttribute(name, properties[name]);
        }
    });
    for (var i = 0; i < properties.stops.length; i++) {
        var attrs = properties.stops[i];
        var stop = document.createElementNS(svgNS, 'stop');
        for (var attr in attrs) {
            if (attrs.hasOwnProperty(attr)) stop.setAttribute(attr, attrs[attr]);
        }
        grad.appendChild(stop);
    }

    var defs = svg.querySelector('defs') ||
        svg.insertBefore(document.createElementNS(svgNS, 'defs'), svg.firstChild);
    return defs.appendChild(grad);
}

  })();
