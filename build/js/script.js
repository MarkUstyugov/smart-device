'use strict';

const overlay = document.querySelector('.overlay');
const headerBtn = document.querySelector('.header__button');
const modal = document.querySelector('.modal');
const closeModalBtn = modal.querySelector('.modal__close-button');
const body = document.querySelector('.page');
const menyBtn = document.querySelectorAll('.footer__title');
const menu = document.querySelectorAll('.footer__menu-dropdown');
const noJs = document.querySelector('.no-js');

const modalName = document.querySelector('[name=modal-name]');
const modalPhone = document.querySelector('[name=modal-phone]');
const modalComment = document.querySelector('[name=modal-comment]');
const modalForm = document.querySelector('.modal__form');

const phoneNumber = document.querySelectorAll('[type=tel]');
let smoothLinks = document.querySelectorAll('a[href^="#link"]');

let isStorage = true;
let nameStorage = '';
let phoneStorage = '';
let commentStorage = '';

const isEscEvent = (evt) => {
  return evt.key === 'Escape' || evt.key === 'Esc';
};

const hiddeDropdownMenu = () => {
  menu.forEach((item) => {
    item.classList.remove('footer__menu-dropdown--show');
  })

  menyBtn.forEach((item) => {
    item.classList.remove('footer__title--close');
  })
}

if (noJs) {
  body.classList.remove('no-js');
  hiddeDropdownMenu();
}

try {
  nameStorage = localStorage.getItem('nameStorage');
  phoneStorage = localStorage.getItem('phoneStorage');
  commentStorage = localStorage.getItem('commentStorage');
} catch (err) {
  isStorage = false;
}

const modalShow = () => {
  overlay.classList.add('overlay--open');
  modal.classList.add('modal--open');
  body.classList.add('no-scroll');
  modalName.focus();
  modalClose();


  if (nameStorage && phoneStorage) {
    modalName.value = nameStorage;
    modalPhone.value = phoneStorage;
    modalComment.value = commentStorage;
  }

  if (modalForm) {
    modalForm.addEventListener('submit', (evt) => {
      if (!modalName.value || !modalPhone.value) {
        evt.preventDefault();
      } else {
        if (isStorage) {
          localStorage.setItem('nameStorage', modalName.value);
          localStorage.setItem('phoneStorage', modalPhone.value);
          localStorage.setItem('commentStorage', modalComment.value);
        }
      }
    });
  }
}

const modalClose = () => {
  closeModalBtn.addEventListener('click', closeModalButton);
  document.addEventListener("click", closeModalOverlay);
  window.addEventListener("keydown", closeModalEsc);
}

headerBtn.addEventListener('click', modalShow);

const closeModalButton = () => {
  overlay.classList.remove('overlay--open');
  modal.classList.remove('modal--open');
  body.classList.remove('no-scroll');

  closeModalBtn.removeEventListener('click', closeModalButton);
  document.removeEventListener("click", closeModalOverlay);
  window.removeEventListener("keydown", closeModalEsc);
}

const closeModalOverlay = (evt) => {
  let target = evt.target;
  if (!target.closest(".header__button")) {
    if (!target.closest(".modal")) {
      overlay.classList.remove('overlay--open');
      modal.classList.remove('modal--open');
      body.classList.remove('no-scroll');

      closeModalBtn.removeEventListener('click', closeModalButton);
      document.removeEventListener("click", closeModalOverlay);
      window.removeEventListener("keydown", closeModalEsc);
    }
  }
}

const closeModalEsc = (evt) => {
  if (isEscEvent(evt)) {
    if (modal.classList.contains("modal--open")) {
      evt.stopPropagation();
      overlay.classList.remove('overlay--open');
      modal.classList.remove('modal--open');
      body.classList.remove('no-scroll');

      closeModalBtn.removeEventListener('click', closeModalButton);
      document.removeEventListener("click", closeModalOverlay);
      window.removeEventListener("keydown", closeModalEsc);
    }
  }
}


document.querySelectorAll('.footer__title').forEach((item) => {
  item.addEventListener('click', () => {
    const parent = item.parentNode.parentNode;
    if (document.documentElement.clientWidth < 768) {
      if (parent.querySelector('.footer__menu-dropdown').classList.contains('footer__menu-dropdown--show') && parent.querySelector('.footer__title').classList.contains('footer__title--close')) {
        parent.querySelector('.footer__menu-dropdown').classList.remove('footer__menu-dropdown--show');
        parent.querySelector('.footer__title').classList.remove('footer__title--close');
      } else {
        document.querySelectorAll('.footer__dropdown').forEach((child) => {
          child.querySelector('.footer__menu-dropdown').classList.remove('footer__menu-dropdown--show');
          child.querySelector('.footer__title').classList.remove('footer__title--close');

          parent.querySelector('.footer__menu-dropdown').classList.add('footer__menu-dropdown--show');
          parent.querySelector('.footer__title').classList.add('footer__title--close');
        })
      }
    }
  })
})


if (smoothLinks) {
  smoothLinks.forEach(function (item) {
    item.addEventListener('click', (evt) => {
      evt.preventDefault();

      var id = item.getAttribute('href');

      document.querySelector(id).scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    });
  });
}

const setMask = function (input) {
  input.addEventListener('focus', (evt) => {
    if (!input.value) {
      input.value = '+7(';
    } else {
      return;
    }
  });

  input.addEventListener('keydown', (evt) => {
    let numberLength = input.value.length;

    if (evt.key == 'Backspace' && numberLength < 4) {
      evt.preventDefault();
    }

    if (numberLength === 6 && evt.key !== 'Backspace') {
      input.value = input.value + ')';
    }

    if (evt.keyCode == 46 || evt.keyCode == 8 || evt.keyCode == 9 || evt.keyCode == 27 ||

      (evt.keyCode == 65 && evt.ctrlKey === true) ||

      (evt.keyCode >= 35 && evt.keyCode <= 39)) {

      return;
    } else {

      if ((evt.keyCode < 48 || evt.keyCode > 57) && (evt.keyCode < 96 || evt.keyCode > 105)) {
        evt.preventDefault();
      }
    }
  });
};

if (phoneNumber) {
  for (let i = 0; i < phoneNumber.length; i++) {
    setMask(phoneNumber[i]);
  }
}

const footerRights = document.querySelector('.footer__bottom-item--rights');
const copyright = document.querySelector(".footer__copyright").innerHTML;

if (footerRights && copyright) {
  footerRights.insertAdjacentHTML(
    "afterend", `<li class="footer__bottom-item footer__bottom-item--copyright">
    <a class="footer__bottom-link">${copyright}</a>
  </li>`
  );
}

const trapFocus = (element) => {
  var focusableEls = element.querySelectorAll('a[href]:not([disabled]), button:not([disabled]), textarea:not([disabled]), input[type="text"]:not([disabled]), input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled]), select:not([disabled])');
  var firstFocusableEl = focusableEls[0];
  var lastFocusableEl = focusableEls[focusableEls.length - 1];
  var KEYCODE_TAB = 9;

  element.addEventListener('keydown', (evt) => {
    var isTabPressed = (evt.key === 'Tab' || evt.keyCode === KEYCODE_TAB);

    if (!isTabPressed) {
      return;
    }

    if ( evt.shiftKey ) {
      if (document.activeElement === firstFocusableEl) {
        lastFocusableEl.focus();
        evt.preventDefault();
        }
      } else {
      if (document.activeElement === lastFocusableEl) {
        firstFocusableEl.focus();
        evt.preventDefault();
        }
      }
  });
}
if (modal) {
  trapFocus(modal);
}

