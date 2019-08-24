import nanoajax from 'nanoajax';

function who() {
  return document.querySelector('#balance');
}

function checkValue(input) {
  const field = input;
  field.value = field.value.replace (/\D/g, '');
}

export default function balance() {
  let form;
  let field;
  let next;

  function findElements() {
    form = document.querySelector('.profileForm');
    field = document.querySelector('#balance');
    ({ next } = form.dataset);
  }

  function changeURL() {
    window.location.pathname = `${next}`;
  }

  function collectData() {
    return new FormData(form);
  }

  function sendData(data) {
    return new Promise((resolve, reject) => {
      nanoajax.ajax({
        url: form.action,
        method: 'POST',
        body: data,
      }, (code, response) => {
        if (code === 200) resolve();
      });
    });
  }

  function onSubmit(event) {
    event.preventDefault();
    sendData(collectData())
      .then(changeURL);
  }

  function onInput(event) {
    checkValue(field);
  }

  function subscribe() {
    form.addEventListener('submit', onSubmit);
    field.addEventListener('input', onInput);
  }

  function init() {
    if (who()) {
      findElements();
      subscribe();
    }
  }

  init();
}