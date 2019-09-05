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

  function findElements() {
    form = document.querySelector('.profileForm');
    field = document.querySelector('#balance');
  }

  function changeURL(response) {
    const result = JSON.parse(response);
    window.location = `${result.confirmation_url}`;
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
        if (code === 200) resolve(response);
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