import IMask from '../vendor/imask.js';

const sectionFormElement = document.querySelector('.form');
const formElement = sectionFormElement.querySelector('form');

const REGEXP = {
  phone: /^(?:\+7|8) \(\d{3}\) \d{3}-\d{2}-\d{2}$/,
  name: /^[А-ЯЁ][а-яё]+(?:-[А-ЯЁ][а-яё]+)?$/
};

const MESSAGE = {
  emptyMessage: 'Заполните поле',
  invalidMessagePhone: 'Неверный формат телефона',
  invalidMessageName: 'Введите корректное имя и фамилию',
  invalidAgreementName: 'Пожалуйста, подтвердите согласие на обработку данных',
};

const inputPhone = formElement.querySelector('#tel');
const inputName = formElement.querySelector('#name');
const inputMessage = formElement.querySelector('#message');
const inputAgreement = formElement.querySelector('#agreement');

const validateInput = (input, regex, emptyMessage, invalidMessage) => {
  const value = input.value.trim();

  input.setCustomValidity(' ');
  input.parentElement.classList.remove('contact-form__input-wrap--error');

  if (input.type === 'checkbox') {
    if (!input.checked) {
      input.setCustomValidity(invalidMessage);
      formElement.querySelector('.contact-form__agreement').classList.add('contact-form__input-wrap--error');
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

const validateSelect = (selector) => {
  const selectEl = document.querySelector(selector);
  const wrapper = selectEl.parentElement;

  const isValid = Boolean(selectEl.value);

  if (!isValid) {
    wrapper.classList.add('contact-form__input-wrap--error');
    wrapper.querySelector('.contact-form__select').setAttribute('aria-invalid', 'true');
    return false;
  } else {
    wrapper.classList.remove('contact-form__input-wrap--error');
    wrapper.querySelector('.contact-form__select').setAttribute('aria-invalid', 'false');
    return true;
  }
};

[inputPhone, inputName, inputMessage].forEach((input) => {
  input.addEventListener('input', () => {
    input.setCustomValidity(' ');
    input.parentElement.classList.remove('contact-form__input-wrap--error');
    input.blur();
    input.focus();
  });
});

inputAgreement.addEventListener('change', function () {
  this.setCustomValidity(' ');
  formElement.querySelector('.contact-form__agreement').classList.remove('contact-form__input-wrap--error');
  this.blur();
  this.focus();
});

const maskOptions = {
  mask: '+7 (000) 000-00-00'
};

IMask(inputPhone, maskOptions);

const submitForm = (evt) => {
  evt.preventDefault();

  const isNameValid = validateInput(
    inputName,
    REGEXP.name,
    MESSAGE.emptyMessage,
    MESSAGE.invalidMessageName
  );

  if (!isNameValid) {
    inputName.reportValidity();
    return;
  }

  const isPhoneValid = validateInput(
    inputPhone,
    REGEXP.phone,
    MESSAGE.emptyMessage,
    MESSAGE.invalidMessagePhone
  );

  if (!isPhoneValid) {
    inputPhone.reportValidity();
    return;
  }

  const isMessageValid = validateInput(
    inputMessage,
    null,
    MESSAGE.emptyMessage,
    ''
  );

  if (!isMessageValid) {
    inputMessage.reportValidity();
    return;
  }

  const isSelectValid = validateSelect('#sity');

  if (!isSelectValid) {
    return;
  }


  const isAgreementValid = validateInput(
    inputAgreement,
    null,
    '',
    MESSAGE.invalidAgreementName
  );

  if (!isAgreementValid) {
    inputAgreement.reportValidity();
    return;
  }

  formElement.submit();
  formElement.reset();
};

const initFormSubmit = () => {
  formElement.addEventListener('submit', submitForm);
};

initFormSubmit();

export {initFormSubmit};
