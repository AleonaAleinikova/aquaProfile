import Numbered from 'input.numbered';
import nanoajax from 'nanoajax';

const reg = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;

function who() {
  return document.querySelector('#reg');
}

function validateConfirm(passwordField, target) {
  const result = target.value === passwordField.value;
  if (!result) target.classList.add('field-has-error');
  return result;
}

function validateEmail(target) {
  const result = reg.test(target.value);
  if (!result) target.classList.add('field-has-error');
  return result;
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
  let isPassword;
  let isConfirm;
  let isEmail;
  let isActive = true;
  let phoneField;
  let passwordField;
  let button;
  let errorMessage;

  function findElements() {
    form = document.querySelector('#reg');
    ({ next } = form.dataset);
    button = document.querySelector('.submit');
    phoneField = document.getElementById('tel');
    passwordField = document.getElementById('password');
    errorMessage = document.querySelector('.errorMessage');
  }

  function collectData() {
    const data =  new FormData(form);
    data.delete('phone');
    data.append('phone', phoneField.value.replace(/[^0-9]/g, ''));
    return data;
  }

  function showError(response) {
    const { message } = JSON.parse(response);
    errorMessage.innerHTML = message ? message : DEFAULT_TEXT;
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
    if (target.name === 'password') isPassword = validatePassword(target);
    else if (target.name === 'password_confirmation') isConfirm = validateConfirm(passwordField, target);
    else if (target.name === 'email') isEmail = validateEmail(target);
    isActive = isPassword && isConfirm && isEmail;
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
      findElements();
      subscribe();
    }
  }

  init();
}