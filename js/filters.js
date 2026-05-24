import { createThumbnails } from './thumbnails';
import { debounce } from './utils';

const ACTIVE_FILTER_BUTTON = 'img-filters__button--active';
const MAX_PICTURES_AMOUNT = 10;

const Filters = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed'
};

let currentFilter = Filters.DEFAULT;
const filters = document.querySelector('.img-filters');
let currentActive = filters.querySelector(`.${ACTIVE_FILTER_BUTTON}`);
let currentFilterValue = Filters.DEFAULT;

let pictures = [];
let cachedRandomPhotos = [];

const getRandomPhotos = () => {
  if (cachedRandomPhotos.length === 0) {
    cachedRandomPhotos = [...pictures]
      .sort(() => Math.random() - 0.5)
      .slice(0, MAX_PICTURES_AMOUNT);
  }
  return cachedRandomPhotos;
};

const applyFilter = () => {
  if (currentFilterValue === currentFilter) {
    return;
  }
  let filteredPictures = [];
  switch (currentFilter) {
    case Filters.DEFAULT:
      filteredPictures = [...pictures];
      cachedRandomPhotos = [];
      break;
    case Filters.RANDOM:
      filteredPictures = getRandomPhotos();
      break;
    case Filters.DISCUSSED:
      filteredPictures = [...pictures].sort((a, b) => b.comments.length - a.comments.length);
      cachedRandomPhotos = [];
      break;
  }
  currentFilterValue = currentFilter;
  createThumbnails(filteredPictures);
};

const debounceApplyFilter = debounce(applyFilter);

const onFilterClick = (evt) => {
  const targetButton = evt.target;
  if (!targetButton.matches('.img-filters__button')) {
    return;
  }
  if (currentActive === targetButton) {
    return;
  }
  currentActive.classList.remove(ACTIVE_FILTER_BUTTON);
  currentActive = targetButton;
  targetButton.classList.add(ACTIVE_FILTER_BUTTON);
  currentFilter = targetButton.id;
  debounceApplyFilter();
};

const openFilters = (picturesData) => {
  filters.classList.remove('img-filters--inactive');
  filters.addEventListener('click', onFilterClick);
  pictures = picturesData;
  cachedRandomPhotos = [];
  applyFilter();
};

export { openFilters };
