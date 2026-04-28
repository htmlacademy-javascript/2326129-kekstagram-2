import { getPhotos } from './generateData';
import { createThumbnails } from './thumbnails';

createThumbnails(getPhotos());

