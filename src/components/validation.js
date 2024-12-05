const showInputError = (formElement, inputElement, errorMessage, validationConfig) => {
  const {inputErrorClass, errorClass} = validationConfig;
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  errorElement.classList.add(errorClass);
  errorElement.textContent = errorMessage;  
  inputElement.classList.add(inputErrorClass);
};

const hideInputError = (formElement, inputElement, validationConfig) => {
  const {inputErrorClass, errorClass} = validationConfig;
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  errorElement.classList.remove(errorClass);
  errorElement.textContent = '';
  inputElement.classList.remove(inputErrorClass);
};


const isValid = (formElement, inputElement, validationConfig) => {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity('');
  }

  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, validationConfig);
  } else {
    hideInputError(formElement, inputElement, validationConfig);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement, validationConfig) => {
  const {inactiveButtonClass} = validationConfig;
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add(inactiveButtonClass);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(inactiveButtonClass);
  }
};

const setEventListeners = (formElement, validationConfig) => {
  const {inputSelector, submitButtonSelector} = validationConfig;

  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  const buttonElement = formElement.querySelector(submitButtonSelector);
  
  toggleButtonState(inputList, buttonElement, validationConfig);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      isValid(formElement, inputElement, validationConfig);
      toggleButtonState(inputList, buttonElement, validationConfig);
    });
  });
};

const enableValidation = (validationConfig) => {
  const {formSelector} = validationConfig;

  const formList = Array.from(document.querySelectorAll(formSelector));
  formList.forEach((formElement) => {
    setEventListeners(formElement, validationConfig);
    });
};

const clearValidation = (formElement, validationConfig) => {
  const {inputSelector, submitButtonSelector, inactiveButtonClass} = validationConfig;
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));

  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement, validationConfig);
  });


}

export { enableValidation, clearValidation };