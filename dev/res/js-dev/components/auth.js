import Numbered from 'input.numbered';
import nanoajax from 'nanoajax';

function who() {
  return document.querySelector('.login');
}

function initMask() {
  return new Numbered('#tel', {
    mask: '+7 (###) ### - ## - ##',
    numbered: '#',
    empty: '_',
    placeholder: true,
  });
}

function validatePhone(phoneMask, target) {
  const result = phoneMask.validate();
  if (result < 0) target.classList.add('field-has-error');
  return result > 0;
}

function validatePassword(target) {
  const result = target.value !== '';
  if (!result) target.classList.add('field-has-error');
  return result;
}

function activeteButton(element) {
  element.removeAttribute('disabled');
}

function disactiveteButton(element) {
  element.setAttribute('disabled', 'disabled');
}

export default function auth() {
  let form;
  let next;
  let isPhone;
  let isPassword;
  let isActive = true;
  let phoneMask;
  let button;

  function findElements() {
    form = document.querySelector('.login');
    ({ next } = form.dataset);
    button = document.querySelector('.submit');
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

  function changeURL() {
    window.location.pathname = `${next}`;
  }

  function checkField(target) {
    if (target.name === 'tel') isPhone = validatePhone(phoneMask, target);
    else if (target.name === 'password') isPassword = validatePassword(target);
    isActive = isPhone && isPassword;
  }

  function onSubmit(event) {
    event.preventDefault();
    sendData(collectData())
      .then(changeURL);
  }

  function onFocusout(event) {
    const { target } = event;
    checkField(target);
    if (isActive) activeteButton(button);
    else disactiveteButton(button);
  }

  function onFocus(event) {
    const { target } = event;
    target.classList.remove('field-has-error');
  }

  function subscribe() {
    form.addEventListener('submit', onSubmit);
    form.addEventListener('focusout', onFocusout);
    form.addEventListener('focusin', onFocus);
  }

  function init() {
    if (who()) {
      phoneMask = initMask();
      findElements();
      subscribe();
    }
  }

  init();
}