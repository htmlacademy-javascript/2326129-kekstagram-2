import { createThumbnails } from './thumbnails';
import { initUploadModal } from './upload-photo-form.js';
import { ErrorText, getData, showDataError } from './api.js';
import { openFilters } from './filters.js';

const init = async () => {
  try {
    const data = await getData();
    createThumbnails(data);
    openFilters(data);
  } catch (error) {
    showDataError(ErrorText.GET_DATA);
  }
  initUploadModal();
};

init();
