const Likes = {
  MIN: 15,
  MAX: 200,
};

const Comments = {
  MIN: 0,
  MAX: 30
};

const NAMES = [
  'Барсик',
  'Кекс',
  'Мурзик',
  'Борис',
  'Муся',
  'Глаша',
  'Ириска',
  'Мэл',
  'Черныш',
  'Маша',
  'Рудольф'
];

const PHOTO_AMOUNT = 25;

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

function getRandomNumber(minValue, maxValue, isRepeat = false) {
  const lower = Math.min(minValue, maxValue);
  const upper = Math.max(minValue, maxValue);

  if (isRepeat) {
    return () => Math.floor(Math.random() * (upper - lower + 1) + lower);
  }

  const numbers = [];
  for (let i = lower; i <= upper; i++) {
    numbers.push(i);
  }

  for (let i = numbers.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
  }
  let index = 0;

  return () => {
    if (index < numbers.length) {
      return numbers[index++];
    }
  };
}

function getRandomElement(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function getComment() {
  let commentId = 1;
  return () => {
    const avatarId = getRandomNumber(1, 6);
    return {
      id: commentId++,
      avatar: `img/avatar-${avatarId()}.svg`,
      message: getRandomElement(MESSAGES),
      name: getRandomElement(NAMES),
    };
  };
}

function getPhoto() {
  const likesAmount = getRandomNumber(Likes.MIN, Likes.MAX, true);
  const commentsAmount = getRandomNumber(Comments.MIN, Comments.MAX, true);
  let photoId = 1;
  return () => {
    const photo = {};
    photo.id = photoId++;
    photo.url = `photos/${photoId - 1}.jpg`;
    photo.description = `${photoId - 1} photo`;
    photo.likes = likesAmount();
    photo.comments = Array.from({length: commentsAmount()}, getComment());
    return photo;
  };
}

const photoArr = Array.from({length: PHOTO_AMOUNT}, getPhoto());
console.log(photoArr);
