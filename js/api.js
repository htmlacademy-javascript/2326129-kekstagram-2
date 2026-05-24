const BASE_URL = 'https://31.javascript.htmlacademy.pro/kekstagram';
const ERROR_MESSAGE_TIMEOUT = 5000;

const errorTemplate = document.querySelector('#data-error');

const Routes = {
  GET_DATA: '/data',
  SEND_DATA: '/'
};

const Method = {
  GET: 'GET',
  POST: 'POST'
};

const ErrorText = {
  GET_DATA: 'Не удалось загрузить данные. Попробуйте обновить страницу',
  SEND_INVALID_DATA: 'Выберите подходящий файл'
};

const showDataError = (message) => {
  const errorMessage = errorTemplate.content.cloneNode(true).firstElementChild;
  const titleElement = errorMessage.querySelector('.data-error__title');
  titleElement.textContent = message;
  document.body.appendChild(errorMessage);
  setTimeout(() => {
    errorMessage.remove();
  }, ERROR_MESSAGE_TIMEOUT);
};

const load = (route, errorText, method = Method.GET, body = null) => fetch(`${BASE_URL}${route}`, {method, body})
  .then((response) => {
    if(!response.ok) {
      throw new Error(errorText);
    }
    return response.json();
  })
  .catch((err) => {
    throw err;
  });

const getData = () => load(Routes.GET_DATA, ErrorText.GET_DATA);

const sendData = (body) => load(Routes.SEND_DATA, '', Method.POST, body);

export { getData, sendData, showDataError, ErrorText };
