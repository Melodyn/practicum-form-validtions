/* places */
const places = [];
const createPlace = (name, link) => ({ name, link });
const addPlace = (place) => {
  places.unshift(place);
  console.clear(); // побочные эффекты
  console.log(JSON.stringify(places, null, 1));
};

/* popups */
const openPopup = (popup) => {
  document.removeEventListener('keydown', openPopupPlace);
  popup.classList.add('popup_opened');
};
const closePopup = (popup) => {
  document.addEventListener('keydown', openPopupPlace);
  popup.classList.remove('popup_opened');
};

const popupPlace = document.querySelector('.popup_type_place');
const buttonClosePopupPlace = popupPlace.querySelector('.popup__close');
buttonClosePopupPlace.addEventListener('click', () => closePopup(popupPlace));

/* forms */
const formPlace = document.forms.place; // $0.validity и $0.validationMessage
// const formPlaceNameError = formPlace.querySelector('.form__item-error_field_name');
// const formPlaceLinkError = formPlace.querySelector('.form__item-error_field_link');

const openPopupPlace = () => {
  formPlace.reset();
  formPlace.name.focus();

  openPopup(popupPlace);
};
const submitPlaceHandler = (e) => {
  // formPlace.submit.setAttribute('disabled', 'disabled');
  e.preventDefault();

  const name = formPlace.name.value;
  const link = formPlace.link.value;

  closePopup(popupPlace);

  const place = createPlace(name, link);
  addPlace(place);
};
// const checkFormValidity = (elementForm) => {
//   const fields = Array.from(elementForm.elements);
//   const formIsValid = fields.every(({ validity }) => validity.valid);
//   if (formIsValid) {
//     formPlace.submit.removeAttribute('disabled');
//   } else {
//     formPlace.submit.setAttribute('disabled', 'disabled');
//   }
// };
// const checkFieldValidity = (elementForm, elementField, elementError) => (e) => {
//   const fieldIsValid = e.target.validity.valid;
//   elementError.textContent = e.target.validationMessage;
//   checkFormValidity(elementForm);
//   if (fieldIsValid) {
//     elementField.classList.remove('form__item_invalid');
//   } else {
//     elementField.classList.add('form__item_invalid');
//   }
// };
//
// formPlace.name.addEventListener('input', checkFieldValidity(formPlace, formPlace.name, formPlaceNameError));
// formPlace.link.addEventListener('input', checkFieldValidity(formPlace, formPlace.link, formPlaceLinkError));
formPlace.addEventListener('submit', submitPlaceHandler);
document.addEventListener('keydown', openPopupPlace);
