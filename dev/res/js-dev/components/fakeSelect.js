

function who() {
  return document.querySelector('.cardNumber');
}

function getString(string) {
  let numbers = '';
  [].slice.call(string.value).forEach(item => {
    numbers += `<span class="cardNumberElement">${item}</span>`
  });
  return numbers;
}

function getOptions(options) {
  let result = '';
  options.forEach((element, index) => {
    const numbers = getString(element);
    result += `<li class="cardNumberItem" data-index="${index}">${numbers}</li>`;
  }); 
  console.log(options, result);
  return result;
}

export default function fakeSelect() {
  let select;
  let fakeSelect;
  let activeCard;
  let options;

  function findElement() {
    select = document.querySelector('.card');
    fakeSelect = document.querySelector('.cardNumber');
  }

  function getActiveCard() {
    activeCard = document.querySelector('.activeCard');
  }

  function initFakeSelect() {
    options = [].slice.call(select.options);
    const fakeOptions = getOptions(options);
    const numbers = getString(options[0]);
    const text = `<span class="activeCard">${numbers}</span><a href="#" class="cardNumberLink">Сменить карту</a><ul class="cardList">` + fakeOptions + '</ul>';
    fakeSelect.innerHTML = text;
  }

  function changeActiveCard(index) {
    const numbers = getString(options[index]);
    activeCard.innerHTML = numbers;
  }

  function changeStatus() {
    fakeSelect.classList.toggle('cardNumber-is-active');
  }

  function changeOption(target) {
    const { index } = target.dataset;
    changeActiveCard(index);
    select.selectedIndex = index;
    changeStatus();
  }

  function checkTarget(target) {
    if (target.classList.contains('cardNumberItem')) changeOption(target);
    else changeStatus();
  }

  function onClick(event) {
    event.preventDefault();
    const { target } = event;
    checkTarget(target);
  }

  function subscribe() {
    fakeSelect.addEventListener('click', onClick);
    fakeSelect.addEventListener('touchstart', onClick);
  }

  function init() {
    if (who()) {
      findElement();
      initFakeSelect();
      getActiveCard();
      subscribe();
    }
  }

  init();

}