const btn = document.querySelector('#btn');
const userPresentment = document.querySelector('.user-presentment');
const menuLogged = document.querySelector('.menu_type_logged');
const menuNotLogged = document.querySelector('.menu_type_notlogged');
const buttonsContainer = document.querySelector('.entrance-buttons-container');
const firstHeader = document.querySelector('#choice1');
const secondHeader = document.querySelector('#choice2');
firstHeader.checked = true;

function refresh(){
    if (firstHeader.checked){
    menuNotLogged.style.display = 'block';
    buttonsContainer.style.display = 'block';
    menuLogged.style.display = 'none';
    userPresentment.style.display = 'none';
  }
  else {
    menuNotLogged.style.display = 'none';
    buttonsContainer.style.display = 'none';
    menuLogged.style.display = 'block';
    userPresentment.style.display = 'flex';
    }
};

refresh();
btn.onclick = function (e) {
  e.preventDefault();
  refresh();
};
