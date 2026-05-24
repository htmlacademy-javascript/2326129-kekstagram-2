const MAX_HASHTAG_SYMBOLS = 20;
const MAX_HASHTAGS = 5;

let errorMessage = '';

const error = () => errorMessage;

const isHashtagValid = (value = null) => {
  errorMessage = '';
  const inputText = value.toLowerCase().trim();

  if(inputText.trim().length === 0){
    return true;
  }

  const hashtags = inputText.split(/\s+/);

  const validateRules = [
    {
      check: hashtags.some((item) => item === '#'),
      error: 'Хештег не может состоять только из решетки'
    },
    {
      check: hashtags.some((item) => item.slice(1).includes('#')),
      error: 'Хештеги разделяются пробелами'
    },
    {
      check: hashtags.some((item) => item[0] !== '#'),
      error: 'Хештег должен начинаться с символа "#"'
    },
    {
      check: hashtags.some((item, num, tags) => tags.includes(item, num + 1)),
      error: 'Хештеги не должны повторяться'
    },
    {
      check: hashtags.some((item) => item.length > MAX_HASHTAG_SYMBOLS),
      error: `Хештег должен содержать не более ${MAX_HASHTAG_SYMBOLS} символов, включая "#"`
    },
    {
      check: hashtags.length > MAX_HASHTAGS,
      error: `Максимально допустимое количество хештегов - ${MAX_HASHTAGS}`
    },
    {
      check: hashtags.some((item) => !/^#[a-zа-яё0-9]{1,19}$/i.test(item)),
      error: 'Хештег содержит недопустимые символы'
    }
  ];

  return validateRules.every((rule) => {
    const isInvalid = rule.check;
    if(isInvalid){
      errorMessage = rule.error;
    }
    return !isInvalid;
  });
};

export { isHashtagValid, error };
