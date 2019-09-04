

function who() {
  return document.querySelector('.cardNumber');
}

function getString(string) {
  let numbers = '';
  [].slice.call(string.dataset.number).forEach(item => {
    numbers += `<span class="cardNumberElement">${item}</span>`
  });
  return numbers;
}

function getOptions(options) {
  let result = '';
  options.forEach((element, index) => {
    const numbers = getString(element);
    const className = element.hasAttribute('disabled') ? 'cardNumberItem-is-disabled' : '';
    result += `<li class="cardNumberItem ${className}" data-index="${index}">${numbers}</li>`;
  }); 
  console.log(options, result);
  return result;
}

export default function fakeSelect() {
  let select;
  let fakeSelect;
  let activeCard;
  let options;
  let balances;
  let balanceHolder;

  function findElement() {
    select = document.querySelector('.card');
    fakeSelect = document.querySelector('.cardNumber');
    balanceHolder = document.querySelector('.balance');
  }

  function getActiveCard() {
    activeCard = document.querySelector('.activeCard');
  }

  function updateBalance(index) {
    balanceHolder.innerHTML = `${balances[index]}₽`;
  }

  function initFakeSelect() {
    options = [].slice.call(select.options);
    balances = options.map(element => element.dataset.balance.replace(/(\d{1,3})(?=((\d{3})*)$)/g, " $1"));
    const fakeOptions = getOptions(options);
    const numbers = getString(options[0]);
    const text = `<span class="activeCard">${numbers}</span><a href="#" class="cardNumberLink">Сменить карту</a><ul class="cardList">` + fakeOptions + '</ul>';
    fakeSelect.innerHTML = text;
    updateBalance(0);
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
    updateBalance(index);
    changeStatus();
  }

  function isTargerDisabled(target) {
    return target.classList.contains('cardNumberItem-is-disabled');
  }

  function checkTarget(target) {
    const isDisabled = isTargerDisabled(target);
    if (target.classList.contains('cardNumberItem') && !isDisabled) changeOption(target);
    else if (!isDisabled) changeStatus();
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