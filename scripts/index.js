const formsConfig = {
  formSelector: '.form',
  fieldSelector: '.form__item',
  submitSelector: '.form__submit',
  invalidFieldClass: 'form__item_invalid',
  getErrorTextContainerSelector: (fieldName) => `.form__item-error_field_${fieldName}`,
};

enableValidation(formsConfig);
