
function insertHTML(container, content) {
  container.innerHTML += content;
}

const firstCircleContainer = document.querySelector('.circle-widget__graph-container');
const firstCircleContent =
`<p class="progress-ring__number circle-widget__number"></p>
<svg class="" width="168" height="168">
  <defs>
    <linearGradient id="MyGradient">
      <stop offset="0%" stop-color="#F27A54" />
      <stop offset="100%" stop-color="#A154F2" />
    </linearGradient>
  </defs>
  <circle class="progress-ring__circle" stroke="url(#MyGradient)"
    stroke-width="8" cx="84" cy="84" r="80" fill="none" />
</svg>`

const donutCircleContainer = document.querySelector('.donut-widget__graph-container')
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
  <circle class="progress-ring__circle1" stroke="url(#MyGradient1)"
    stroke-width="8" cx="84" cy="84" r="80" fill="none" />
  <circle class="progress-ring__circle2" stroke="url(#MyGradient2)"
    stroke-width="8" cx="84" cy="84" r="80" fill="none" />
  <circle class="progress-ring__circle3" stroke="url(#MyGradient3)"
    stroke-width="8" cx="84" cy="84" r="80" fill="none" />  
</svg>`

insertHTML(firstCircleContainer, firstCircleContent);
insertHTML(donutCircleContainer, donutCircleContent);



//Первый виджет (circle)
//d3.select('body').append('svg');


function setCircleProgress(percent) {
  const circle = document.querySelector(".progress-ring__circle");
  const radius = circle.r.baseVal.value;
  const circumference = 2 * Math.PI * radius;
  circle.style.strokeDasharray = `${circumference} ${circumference}`;
  circle.style.strokeDashoffset = circumference;
  const offset = circumference - (percent / 100) * circumference;
  circle.style.strokeDashoffset = offset;
  document.querySelector(".circle-widget__number").textContent= percent + "%";
};
setCircleProgress(60);

//Первый виджет (circle)
function setDonutProgress(percent1,percent2,percent3) {
  const circle1 = document.querySelector(".progress-ring__circle1");
  const radius1 = circle1.r.baseVal.value;
  const circumference1 = 2 * Math.PI * radius1;
  circle1.style.strokeDasharray = `${circumference1} ${circumference1}`;
  circle1.style.strokeDashoffset = circumference1;
  const offset1 = circumference1 - (percent1 / 100) * circumference1;
  circle1.style.strokeDashoffset = offset1;
  circle1.style.transform = 'rotate(-90deg)';

  const circle2 = document.querySelector(".progress-ring__circle2");
  const radius2 = circle2.r.baseVal.value;
  const circumference2 = 2 * Math.PI * radius2;
  circle2.style.strokeDasharray = `${circumference2} ${circumference2}`;
  circle2.style.strokeDashoffset = circumference1;
  const offset2 = circumference2 - (percent2 / 100) * circumference2;
  circle2.style.strokeDashoffset = offset2;
  console.log(offset1,offset2,circumference1,circumference2,percent1);
  circle2.style.transform = `rotate(${percent1*3.6-90}deg)`;

  const circle3 = document.querySelector(".progress-ring__circle3");
  const radius3 = circle3.r.baseVal.value;
  const circumference3 = 2 * Math.PI * radius3;
  circle3.style.strokeDasharray = `${circumference3} ${circumference3}`;
  circle3.style.strokeDashoffset = circumference1;
  const offset3 = circumference3 - (percent3 / 100) * circumference3;
  circle3.style.strokeDashoffset = offset3;
  console.log(offset1,offset3,circumference1,circumference3,percent1);
  circle3.style.transform = `rotate(${(percent2+percent1)*3.6-90}deg)`;

  let number = '1,455'
  document.querySelector(".donut-widget__number").textContent= number;
};
setDonutProgress(35,46,17);