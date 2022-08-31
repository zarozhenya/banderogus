import 'modern-normalize';
import { validate } from 'email-validator';
import { Notify } from 'notiflix';

const refs = {
  openModalBtn: document.querySelector('button.open-button'),
  closeModalBtn: document.querySelector('.modal-close-btn'),
  backdrop: document.querySelector('.backdrop'),
  modal: document.querySelector('.modal'),
  thanks: document.querySelector('.thanks'),
  closeThanksBtn: document.querySelector('.thanks-close-btn'),
  form: document.querySelector('.modal-form'),
};

const showModalSuccess = () => {
  refs.modal.classList.add('is-hidden');
  refs.thanks.classList.remove('is-hidden');
};
const showMessage = ({ type, message }) => {
  Notify[type](message);
};
const onOpenModal = e => {
  refs.backdrop.classList.remove('is-hidden');
  refs.modal.classList.remove('is-hidden');
};
const onCloseModal = e => {
  refs.backdrop.classList.add('is-hidden');
  refs.modal.classList.add('is-hidden');
};

const onFormSubmit = e => {
  e.preventDefault();
  const { email, name } = e.currentTarget.elements;
  if (!validate(email.value) || !name.value) {
    showMessage({
      type: 'failure',
      message: 'Будь ласка, введіть коректні дані!',
    });
    return;
  }
  showModalSuccess();
  e.currentTarget.reset();
};

const onCLoseThanks = e => {
  refs.thanks.classList.add('is-hidden');
  refs.backdrop.classList.add('is-hidden');
};
refs.openModalBtn.addEventListener('click', onOpenModal);
refs.closeModalBtn.addEventListener('click', onCloseModal);
refs.form.addEventListener('submit', onFormSubmit);
refs.closeThanksBtn.addEventListener('click', onCLoseThanks);
