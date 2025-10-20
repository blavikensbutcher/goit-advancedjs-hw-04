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

let query = '';
let page = 1;
const perPage = 15;

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

// ------------------------------
// Handle "Load More" button
// ------------------------------
const handleBtnClick = async () => {
  try {
    page += 1;
    showLoader(loader);
    btn.disabled = true;

    const { hits: images, totalHits } = await getImages(query, page, perPage);

    insertGalleryItems(gallery, images);
    lightbox.refresh();

    const firstCard = gallery.firstElementChild;
    if (firstCard) {
      const { height: cardHeight } = firstCard.getBoundingClientRect();
      window.scrollBy({
        top: cardHeight * 2,
        behavior: 'smooth',
      });
    }

    // Check if more results exist
    if (perPage * page >= totalHits) {
      hideBtn(btn);
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
    }
  } catch (error) {
    iziToast.error({
      message: 'Error while loading more images!',
      position: 'topRight',
    });
  } finally {
    hideLoader(loader);
    btn.disabled = false;
  }
};

btn.addEventListener('click', handleBtnClick);

// ------------------------------
// Handle form submit
// ------------------------------
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
  hideBtn(btn);

  try {
    const { hits, totalHits } = await getImages(query, page, perPage);

    if (!hits.length) {
      iziToast.info({
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
      });
      return;
    }

    renderGallery(gallery, hits);
    lightbox.refresh();

    iziToast.success({
      message: `We found ${totalHits} results.`,
      position: 'topRight',
    });

    // Show button only if there are more pages
    if (totalHits > perPage) {
      showBtn(btn);
    }
  } catch (error) {
    iziToast.error({
      message: 'Error during loading!',
      position: 'topRight',
    });
  } finally {
    hideLoader(loader);
  }
});
