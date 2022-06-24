const dataContainer = document.querySelector('.data-container');

/* places */
const places = [];
const createPlace = (name, link) => ({ name, link });
const addPlace = (place) => { // побочные эффекты
  places.unshift(place);
  dataContainer.value = (JSON.stringify(places, null, 1));
};

/* popups */
const openPopup = (popup) => {
  dataContainer.removeEventListener('click', openPopupPlace);
  popup.classList.add('popup_opened');
};
const closePopup = (popup) => {
  dataContainer.addEventListener('click', openPopupPlace);
  popup.classList.remove('popup_opened');
};

const popupPlace = document.querySelector('.popup_type_place');
const buttonClosePopupPlace = popupPlace.querySelector('.popup__close');
buttonClosePopupPlace.addEventListener('click', () => closePopup(popupPlace));

/* forms */
const formPlace = document.forms.place;
const formPlaceFields = Array.from(formPlace.querySelectorAll('.form__item'));
const buttonSubmitFormPlace = formPlace.querySelector('.form__submit');

const openPopupPlace = () => {
  formPlace.reset();
  formPlace.submit.setAttribute('disabled', 'disabled');
  formPlace.name.focus();

  openPopup(popupPlace);
};

/* forms helpers */
const focusHandler = ({ target }) => target.select();

const toggleFormSubmit = (elementSubmit, { disable }) => {
  if (disable) {
    elementSubmit.removeAttribute('disabled');
  } else {
    elementSubmit.setAttribute('disabled', 'disabled');
  }
};
const checkFormValidity = (elementsFields, elementSubmit) => {
  toggleFormSubmit(elementSubmit, { disable: true });
  const formIsValid = elementsFields.every(({ validity }) => validity.valid);
  if (!formIsValid) {
    toggleFormSubmit(elementSubmit, { disable: false });
  }
  return formIsValid;
};

const setFieldError = (elementField, elementError, params) => {
  elementError.textContent = params.validationMessage;
  if (params.valid) {
    elementField.classList.remove(params.invalidFieldClass);
  } else {
    elementField.classList.add(params.invalidFieldClass);
  }
};
const checkFieldValidity = (elementField, elementError, invalidFieldClass) => {
  const { validationMessage, validity: { valid } } = elementField;
  setFieldError(elementField, elementError, {
    validationMessage,
    valid,
    invalidFieldClass,
  });
  return valid;
};

/* enable validation */
// const formPlaceFields = Array.from(formPlace.querySelectorAll('.form__item'));
// const buttonSubmitFormPlace = formPlace.querySelector('.form__submit');
//
// formPlaceFields.forEach((elementField) => {
//   const errorTextContainerSelector = `.form__item-error_field_${elementField.name}`;
//   const elementError = formPlace.querySelector(errorTextContainerSelector);
//
//   elementField.addEventListener('input', (e) => {
//     const field = e.target; // поле взято из события просто для примера, что можно и так
//     checkFormValidity(formPlaceFields, buttonSubmitFormPlace);
//     checkFieldValidity(field, elementError, 'form__item_invalid');
//   });
//
//   elementField.addEventListener('focus', focusHandler);
// });
//
// const commonFormHandler = (e) => {
//   e.preventDefault();
//   const formIsValid = checkFormValidity(formPlaceFields, buttonSubmitFormPlace);
//   if (!formIsValid) { // прервать выполнение кода ниже и остановить событие
//     e.stopImmediatePropagation();
//   }
// };
//
// const submitPlaceHandler = (e) => {
//   const name = e.target.name.value;
//   const link = e.target.link.value;
//
//   closePopup(popupPlace);
//
//   const place = createPlace(name, link);
//   addPlace(place);
// };

formPlaceFields.forEach((elementField) => {
  const errorTextContainerSelector = `.form__item-error_field_${elementField.name}`;
  const elementError = formPlace.querySelector(errorTextContainerSelector);

  elementField.addEventListener('input', (e) => {
    const fieldIsValid = elementField.validity.valid;
    elementError.textContent = elementField.validationMessage;
    if (!fieldIsValid) {
      elementField.classList.add('form__item_invalid');
    } else {
      elementField.classList.remove('form__item_invalid');
    }
    // можно использовать event, если хочется:
    // const fieldIsValid = e.target.validity.valid;
    // elementError.textContent = e.target.validationMessage;
    // ...и так далее

    const formIsValid = formPlaceFields.every(({ validity }) => validity.valid);
    if (formIsValid) {
      buttonSubmitFormPlace.removeAttribute('disabled');
    } else {
      buttonSubmitFormPlace.setAttribute('disabled', 'disabled');
    }
  });
});

const submitPlaceHandler = (e) => {
  e.preventDefault();
  buttonSubmitFormPlace.setAttribute('disabled', 'disabled');

  const formIsValid = formPlaceFields.every(({ validity }) => validity.valid);
  if (formIsValid) {
    const name = e.target.name.value;
    const link = e.target.link.value;

    closePopup(popupPlace);

    const place = createPlace(name, link);
    addPlace(place);
  }
};

// formPlace.addEventListener('submit', commonFormHandler);
formPlace.addEventListener('submit', submitPlaceHandler);
dataContainer.addEventListener('focus', openPopupPlace);
