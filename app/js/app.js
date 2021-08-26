const btn = document.querySelector('#btn');
const menuNotLogged = document.querySelector('.menu_type_notlogged');
const buttonsContainer = document.querySelector('.entrance-buttons-container')

btn.onclick = function (e) {
  e.preventDefault();
  const firstHeader = document.querySelector('#choice1');
  const secondHeader = document.querySelector('#choice2');
  if (firstHeader.checked){
    menuNotLogged.style.display = 'block';
    buttonsContainer.style.display = 'block';
  }
  else {
    menuNotLogged.style.display = 'none';
    buttonsContainer.style.display = 'none';
    }
};
