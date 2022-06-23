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

const openPopupPlace = () => openPopup(popupPlace);

const submitPlaceHandler = (e) => {
  e.preventDefault();

  const name = formPlace.name.value;
  const link = formPlace.link.value;

  // if (!(name && link)) {
  //   if (!name && link) {
  //     alert('Имя должно содержать минимум 2 символа');
  //     return;
  //   }
  //   if (name && !link) {
  //     alert('Укажите ссылку');
  //     return;
  //   }
  //   if (!(name && link)) {
  //     alert('Оба поля должны быть заполнены');
  //     return;
  //   }
  //   return;
  // }
  //
  // const urlIsCorrect = (() => {
  //   try {
  //     new URL(link);
  //     return true;
  //   } catch (e) {
  //     return false;
  //   }
  // })();
  //
  // if (!urlIsCorrect) {
  //   alert('Некорректная ссылка');
  //   return;
  // }

  closePopup(popupPlace);

  const place = createPlace(name, link);
  addPlace(place);
};

formPlace.addEventListener('submit', submitPlaceHandler);
dataContainer.addEventListener('click', openPopupPlace);
