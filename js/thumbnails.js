import { getPhotos } from './generateData';

const template = document.querySelector('#picture').content.querySelector('.picture');
const pictures = document.querySelector('.pictures');

const generatedPhotos = getPhotos();
const fragment = document.createDocumentFragment();

generatedPhotos.forEach((photo) => {
  const thumbnail = template.cloneNode(true);
  const picture = thumbnail.querySelector('.picture__img');
  const likes = thumbnail.querySelector('.picture__likes');
  const comments = thumbnail.querySelector('.picture__comments');

  picture.src = photo.url;
  picture.alt = photo.description;
  likes.textContent = photo.likes;
  comments.textContent = photo.comments.length;
  fragment.append(thumbnail);
});

pictures.append(fragment);
