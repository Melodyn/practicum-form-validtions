const dataContainer = document.querySelector('.data-container');

/* places */
const places = [];
const createPlace = (name, link) => ({ name, link });
const addPlace = (place) => { // побочные эффекты
  places.unshift(place);
  dataContainer.value = (JSON.stringify(places, null, 1));
};

/* forms */
const formsConfig = {
  formSelector: '.form',
  fieldSelector: '.form__item',
  submitSelector: '.form__submit',
  invalidFieldClass: 'form__item_invalid',
  getErrorTextContainerSelector: (fieldName) => `.form__item-error_field_${fieldName}`,
};
const formPlace = document.forms.place;

enableValidation(formsConfig);

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

const openPopupPlace = () => {
  formPlace.reset();
  formPlace.submit.setAttribute('disabled', 'disabled');
  formPlace.name.focus();

  openPopup(popupPlace);
};

/* form handler */
const submitPlaceHandler = () => {
  const name = formPlace.name.value;
  const link = formPlace.link.value;

  closePopup(popupPlace);

  const place = createPlace(name, link);
  addPlace(place);
};

formPlace.addEventListener('submit', submitPlaceHandler);
dataContainer.addEventListener('click', openPopupPlace);
