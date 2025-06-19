import IMask from '../vendor/imask.js';
import {modalCloseHandler} from './modal.js';
const sectionFormElement = document.querySelector('.form');
const formElement = sectionFormElement.querySelector('form');
const modalFeedbackElement = document.querySelector('.modal');
const formFeedbackElement = modalFeedbackElement.querySelector('form');

const fieldsContact = {
  name: '#name',
  phone: '#tel',
  message: '#message',
  checkbox: '#agreement',
  select: '#sity',
};
const fieldsFeedback = {
  name: '#feedback-name',
  phone: '#feedback-tel',
  checkbox: '#feedback-agreement',
  select: '#feedback-sity',
};

const REGEXP = {
  phone: /^(?:\+7|8) \(\d{3}\) \d{3}-\d{2}-\d{2}$/,
  name: /^([А-ЯЁ][а-яё]+)(?:\s+[А-ЯЁ][а-яё]+(?:-[А-ЯЁ][а-яё]+)?)?$/
};

const MESSAGE = {
  emptyMessage: 'Заполните поле',
  invalidMessagePhone: 'Неверный формат телефона',
  invalidMessageName: 'Введите корректное имя',
  invalidAgreementName: 'Пожалуйста, подтвердите согласие на обработку данных',
};

const validateInput = (input, regex, emptyMessage, invalidMessage, form = null) => {
  const value = input.value.trim();

  input.setCustomValidity(' ');
  input.parentElement.classList.remove('contact-form__input-wrap--error');

  if (input.type === 'checkbox') {
    if (!input.checked) {
      input.setCustomValidity(invalidMessage);
      form.querySelector('.contact-form__agreement').classList.add('contact-form__input-wrap--error');
      return false;
    }
    return true;
  }

  if (!value) {
    input.setCustomValidity(emptyMessage);
    input.parentElement.classList.add('contact-form__input-wrap--error');
    return false;
  }

  if (regex && input.tagName !== 'TEXTAREA') {
    if (!regex.test(value)) {
      input.setCustomValidity(invalidMessage);
      input.parentElement.classList.add('contact-form__input-wrap--error');
      return false;
    }
  }

  return true;
};

const validateSelect = (form, selector) => {
  const selectEl = form.querySelector(selector);
  const wrapper = selectEl.parentElement;

  const isValid = Boolean(selectEl.value);

  if (!isValid) {
    wrapper.classList.add('contact-form__input-wrap--error');
    return false;
  } else {
    wrapper.classList.remove('contact-form__input-wrap--error');
    return true;
  }
};

const fieldsReset = (form, object) => {
  const inputs = Object.values(object);

  inputs.forEach((selector) => {
    const field = form.querySelector(selector);
    field.addEventListener('input', function () {
      this.setCustomValidity(' ');
      this.parentElement.classList.remove('contact-form__input-wrap--error');
      this.blur();
      this.focus();
    });
  });
};

const checkboxReset = (form, selector) => {
  form.querySelector(selector).addEventListener('change', function () {
    this.setCustomValidity(' ');
    form.querySelector('.contact-form__agreement').classList.remove('contact-form__input-wrap--error');
    this.blur();
    this.focus();
  });
};

const setMaskPhone = (form, inputPhone) => {
  const maskOptions = {
    mask: '+7 (000) 000-00-00'
  };

  return IMask(form.querySelector(inputPhone), maskOptions);
};

const submitForm = (evt, form, fields) => {
  evt.preventDefault();

  const formName = form.querySelector(fields.name);
  const formPhone = form.querySelector(fields.phone);
  const formCheckbox = form.querySelector(fields.checkbox);
  const formMessage = fields.message ? form.querySelector(fields.message) : null;

  if (formName === null || formPhone === null || formCheckbox === null || !fields.select) {
    return;
  }

  const isNameValid = validateInput(formName, REGEXP.name, MESSAGE.emptyMessage, MESSAGE.invalidMessageName);
  if (!isNameValid) {
    return formName.reportValidity();
  }

  const isPhoneValid = validateInput(formPhone, REGEXP.phone, MESSAGE.emptyMessage, MESSAGE.invalidMessagePhone);
  if (!isPhoneValid) {
    return formPhone.reportValidity();
  }

  if (formMessage) {
    const isMessageValid = validateInput(formMessage, null, MESSAGE.emptyMessage, '');
    if (!isMessageValid) {

      return formMessage.reportValidity();
    }
  }

  const isSelectValid = validateSelect(form,fields.select);
  if (!isSelectValid) {
    return;
  }

  const isAgreementValid = validateInput(formCheckbox, null, '', MESSAGE.invalidAgreementName, form);
  if (!isAgreementValid) {
    return formCheckbox.reportValidity();
  }

  form.submit();
  form.reset();
  modalCloseHandler();
};


const initFormSubmit = (form, fields) => {
  form.addEventListener('submit', (evt) => {
    submitForm(evt, form, fields);
  });
};

const initValidation = () => {
  fieldsReset(formElement, fieldsContact);
  fieldsReset(formFeedbackElement, fieldsFeedback);

  checkboxReset(formElement, fieldsContact.checkbox);
  checkboxReset(formFeedbackElement, fieldsFeedback.checkbox);

  setMaskPhone(formElement, fieldsContact.phone);
  setMaskPhone(formFeedbackElement, fieldsFeedback.phone);

  initFormSubmit(formElement, fieldsContact);
  initFormSubmit(formFeedbackElement, fieldsFeedback);
};

export { initValidation };
