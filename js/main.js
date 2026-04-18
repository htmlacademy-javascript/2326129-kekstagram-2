import { getRandomElement, getRandomNumber } from './utils';
import {constData} from './data';

const {NAMES, MESSAGES} = constData;

const PHOTO_AMOUNT = 25;

const Likes = {
  MIN: 15,
  MAX: 200,
};

const Comments = {
  MIN: 0,
  MAX: 30
};

let commentId = 1;

function getComment() {
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
  const commentsAmount = Math.floor(Math.random() * (Comments.MAX - Comments.MIN + 1) + Comments.MIN);
  const likesAmount = Math.floor(Math.random() * (Likes.MAX - Likes.MIN + 1) + Likes.MIN);
  let photoId = 1;
  return () => ({
    id: photoId++,
    url: `photos/${photoId - 1}.jpg`,
    description: `${photoId - 1} photo`,
    likes: likesAmount,
    comments: Array.from({length: commentsAmount}, getComment())
  });
}

const photoArr = Array.from({length: PHOTO_AMOUNT}, getPhoto());
console.log(photoArr);
