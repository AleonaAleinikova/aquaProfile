/* global Promise */

import nanoajax from 'nanoajax';

function who() {
  return document.querySelector('.logout');
}

export default function logout() {
  let link;
  let url;
  let next;

  function findElements() {
    link = document.querySelector('.logout');
    ({ url } = link.dataset);
    ({ next } = link.dataset);
  }

  function sendRequest() {
    return new Promise((resolve, reject) => {
      nanoajax.ajax({
        url: url,
        method: 'POST',
      }, (code, response) => {
        if (code === 200) resolve();
      });
    });
  }

  function changeURL() {
    window.location.pathname = `${next}`;
  }

  function onClick(event) {
    event.preventDefault();
    sendRequest()
      .then(changeURL);
  }

  function subscribe() {
    link.addEventListener('click', onClick);
  }

  function init() {
    if (who()) {
      findElements();
      subscribe();
    }
  }

  init();
}