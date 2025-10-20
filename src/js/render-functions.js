function createCardMarkup(img) {
  return `
    <a class="gallery__item" href="${img.largeImageURL}">
      <div class="photo-card">
        <img src="${img.webformatURL}" alt="${img.tags}" loading="lazy" />
        <div class="info">
          <p><b>Likes:</b> ${img.likes}</p>
          <p><b>Views:</b> ${img.views}</p>
          <p><b>Comments:</b> ${img.comments}</p>
          <p><b>Downloads:</b> ${img.downloads}</p>
        </div>
      </div>
    </a>`;
}

export function renderGallery(container, images) {
  container.innerHTML = images.map(createCardMarkup).join('');
}

export function insertGalleryItems(container, images) {
  container.insertAdjacentHTML(
    'beforeend',
    images.map(createCardMarkup).join('')
  );
}

export function clearGallery(container) {
  container.innerHTML = '';
}

export function showLoader(loader) {
  loader.classList.remove('is-hidden');
}

export function hideLoader(loader) {
  loader.classList.add('is-hidden');
}

export function showBtn(btn) {
  btn.classList.remove('is-hidden');
}

export function hideBtn(btn) {
  btn.classList.add('is-hidden');
}
