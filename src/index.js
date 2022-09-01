import 'modern-normalize';
import { validate } from 'email-validator';
import { Notify, Loading } from 'notiflix';
import emailjs from '@emailjs/browser';

const API = {
  serviceId: 'service_n9ti8ek',
  templateId: 'template_uwckkev',
  publicKey: 'kSxB1LCETFoXYI4H1',
};

const refs = {
  openModalBtn: document.querySelector('button.open-button'),
  closeModalBtn: document.querySelector('.modal-close-btn'),
  backdrop: document.querySelector('.backdrop'),
  modal: document.querySelector('.modal'),
  thanks: document.querySelector('.thanks'),
  closeThanksBtn: document.querySelector('.thanks-close-btn'),
  form: document.querySelector('.modal-form'),
};

const sendEmail = ({ name, message, email }) => {
  const templateParams = { name, message, email };
  return emailjs.send(
    API.serviceId,
    API.templateId,
    templateParams,
    API.publicKey
  );
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
  Loading.dots();
  sendEmail({
    email: email.value,
    name: name.value,
    message: 'Дякуємо за запущеного гуся!',
  })
    .then(() => {
      Loading.remove();
      showModalSuccess();
    })
    .catch(() => {
      Loading.remove();
      showMessage({ type: 'failure', message: 'Щось пішло не так' });
      onCloseModal();
    })
    .finally(() => {
      e.target.reset();
    });
};

const onCloseThanks = e => {
  refs.thanks.classList.add('is-hidden');
  refs.backdrop.classList.add('is-hidden');
};

refs.openModalBtn.addEventListener('click', onOpenModal);
refs.closeModalBtn.addEventListener('click', onCloseModal);
refs.form.addEventListener('submit', onFormSubmit);
refs.closeThanksBtn.addEventListener('click', onCloseThanks);
