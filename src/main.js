import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { getImages } from './js/pixabay-api';

import {
  renderGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showBtn,
  hideBtn,
  insertGalleryItems,
} from './js/render-functions';

const form = document.querySelector('#search-form');
const input = document.querySelector('#search-input');
const gallery = document.querySelector('.gallery');
const loader = document.querySelector('#loader');
const btn = document.querySelector('.load-more-btn');

let query = null;

let page = 1;

const handleBtnClick = async () => {
  const nextPage = (page += 1);
  const perPage = 15;

  showLoader(loader);
  btn.disabled = true;

  const { hits: images, totalHits } = await getImages(query, nextPage, perPage);

  hideLoader(loader);
  btn.disabled = false;

  insertGalleryItems(gallery, images);
  lightbox.refresh();

  const firstCard = document.querySelector('.gallery').firstElementChild;
  if (firstCard) {
    const { height: cardHeight } = firstCard.getBoundingClientRect();
    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });
  }

  if (perPage * page >= totalHits) {
    hideBtn(btn);
    iziToast.info({
      message: "We're sorry, but you've reached the end of search results.",
      position: 'topRight',
    });
  }
};

btn.addEventListener('click', handleBtnClick);

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

form.addEventListener('submit', async e => {
  e.preventDefault();

  query = input.value.trim();

  page = 1;

  if (!query) {
    iziToast.warning({ message: 'Input text to search!' });
    return;
  }

  clearGallery(gallery);
  showLoader(loader);

  try {
    const data = await getImages(query, 1, 15);

    if (page === 1 && data.hits.length > 0) {
      showBtn(btn);
    }

    if (!data.hits.length) {
      iziToast.info({
        message:
          'Sorry, there are no images matching your search query. Please try again!',
      });
      hideBtn(btn);

      return;
    }

    renderGallery(gallery, data.hits);
    iziToast.success({
      message: `We found ${data.totalHits} results`,
      position: 'topRight',
    });
    lightbox.refresh();
  } catch {
    hideLoader(loader);
    iziToast.error({ message: 'Error during loading!' });
  } finally {
    hideLoader(loader);
  }
});
