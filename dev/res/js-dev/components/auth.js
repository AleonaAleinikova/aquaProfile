import Numbered from 'input.numbered';
import nanoajax from 'nanoajax';

const DEFAULT_TEXT = 'Что-то пошло не так, попробуйте еще раз.';

function who() {
  return document.querySelector('#auth');
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
  const result = target.value.length >= 8;
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
  let phoneField;
  let button;
  let errorMessage;

  function findElements() {
    form = document.querySelector('#auth');
    ({ next } = form.dataset);
    button = document.querySelector('.submit');
    phoneField = document.getElementById('tel');
    errorMessage = document.querySelector('.errorMessage');
  }

  function collectData() {
    const data =  new FormData(form);
    data.delete('phone');
    data.append('phone', phoneField.value.replace(/[^0-9]/g, ''));
    return data;
  }

  function showError(response) {
    let message = '';
    const { errors } = JSON.parse(response);
    if (errors) {
      const count = Object.keys(errors);
      count.forEach(index => {
        message += `${errors[index]} `;
      });
    }
    errorMessage.innerHTML = message !== '' ? message : DEFAULT_TEXT;
    errorMessage.classList.add('errorMessage-is-active');
  }

  function sendData(data) {
    return new Promise((resolve, reject) => {
      nanoajax.ajax({
        url: form.action,
        method: 'POST',
        body: data,
      }, (code, response) => {
        if (code === 200) resolve();
        else showError(response);
      });
    });
  }

  function changeURL() {
    window.location.pathname = `${next}`;
  }

  function checkField(target) {
    if (target.name === 'phone') isPhone = validatePhone(phoneMask, target);
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
    errorMessage.classList.remove('errorMessage-is-active');
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