function insertHTML(container, content) {
  container.innerHTML += content;
}

const firstCircleContainer = document.querySelector(
  ".circle-widget__graph-container"
);
const firstCircleContent = `<p class="progress-ring__number circle-widget__number"></p>
<svg class="progress-ring__svg" id="mainSVG" width="190" height="190">
  <defs>
    <linearGradient id="MyGradient">
      <stop offset="0%" stop-color="#F27A54" />
      <stop offset="100%" stop-color="#A154F2" />
    </linearGradient>
    
  </defs>
  <circle class="progress-ring__shadow" stroke="#30363D"
    stroke-width="10" cx="105" cy="105" r="80" fill="none" />
  <circle class="progress-ring__circle" stroke="url(#MyGradient)"
    stroke-width="8" cx="105" cy="95" r="80" fill="none" />

</svg>`;

const donutCircleContainer = document.querySelector(
  ".donut-widget__graph-container"
);

const donutCircleContent = `<p class="progress-ring__number donut-widget__number"></p>
<svg class="" width="168" height="168">
  <defs>
    <linearGradient id="MyGradient1">
      <stop offset="0%" stop-color="#F27A54" />
      <stop offset="100%" stop-color="#A154F2" />
    </linearGradient>
    <linearGradient id="MyGradient2">
      <stop offset="0%" stop-color="black" />
      <stop offset="100%" stop-color="green" />
    </linearGradient>
    <linearGradient id="MyGradient3">
      <stop offset="0%" stop-color="red" />
      <stop offset="100%" stop-color="pink" />
    </linearGradient>
  </defs>
</svg>`;

if (donutCircleContainer)
{
  insertHTML(donutCircleContainer, donutCircleContent);
}

if (firstCircleContainer) {
  insertHTML(firstCircleContainer, firstCircleContent);

  function setCircleProgress(percent) {
    const circle = document.querySelector(".progress-ring__circle");
    const radius = circle.r.baseVal.value;
    const circumference = 2 * Math.PI * radius;

    circle.style.strokeDasharray = `${circumference} ${circumference}`;
    circle.style.strokeDashoffset = circumference;

    const offset = circumference - (percent / 100) * circumference;

    circle.style.strokeDashoffset = offset;
    document.querySelector(".circle-widget__number").textContent =
      percent + "%";

    const shadeCircle = document.querySelector(".progress-ring__shadow");

    if (shadeCircle) {
      const shadeRadius = shadeCircle.r.baseVal.value;
      const shadeCircumference = 2 * Math.PI * shadeRadius;

      shadeCircle.style.strokeDasharray = `${shadeCircumference} ${shadeCircumference}`;
      shadeCircle.style.strokeDashoffset = shadeCircumference;

      const offset2 = shadeCircumference - (percent / 100) * shadeCircumference;

      shadeCircle.style.strokeDashoffset = offset2;
    }
    document.querySelector(".circle-widget__number").textContent =
      percent + "%";
  }
  setCircleProgress(75);
}

const circle1SVG = d3.select(".progress-ring__shadow");
const filter = circle1SVG
  .append("defs")
  .append("filter")
  .attr("id", "blur")
  .append("feGaussianBlur")
  .attr("stdDeviation", 3);

circle1SVG.attr("filter", "url(#blur)");

function setDonutProgress(data) {
  let actualShares = data.shares;

  if (data.circleIsClosed) {
    const sum = data.shares.reduce((sum, a) => sum + a, 0);
    const radiusCoefficient = Math.ceil((100 / sum) * 1000) / 1000; //allows us not to have 100 in sum
    actualShares = data.shares.map(element => element * radiusCoefficient); 
  }
  
  const drawingPart = function (circleNumber, percent, prevPercentsSum) {
    const circle = document.querySelector(
      `.${circleClassPreset}${circleNumber}`
    );
    const radius = circle.r.baseVal.value;
    const circumference = 2 * Math.PI * radius;

    circle.style.strokeDasharray = `${circumference} ${circumference}`;
    circle.style.strokeDashoffset = circumference;

    const offset = circumference - (percent / 100) * circumference;

    circle.style.strokeDashoffset = offset;
    circle.style.transform = `rotate(${prevPercentsSum * 3.6 - 90}deg)`;
  };

  const svgContainer = document
    .querySelector(".donut-widget")
    .querySelector("svg");
  const circleClassPreset = `progress-ring__circle`;
  let percentSum = 0;

  actualShares.forEach((percent, i, arr) => {

    svgContainer.innerHTML += `<circle class="${circleClassPreset}${
      i + 1
    } progress-ring__circle-base" stroke="url(#MyGradient${((i + 1) % 3) + 1})"
    stroke-width="8" cx="84" cy="84" r="80" fill="none" /> `;

    if (i > 0) {
      percentSum += arr[i - 1];
    }
    drawingPart(i + 1, percent , percentSum);
  });

  document.querySelector(".donut-widget__number").textContent = "1,455";
}

const secondCircleConfig = {
  shares: [30, 10, 30],
  circleIsClosed: true
}

setDonutProgress(secondCircleConfig);
