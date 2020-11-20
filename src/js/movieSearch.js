import request from '../js/apiRequest';
// import card from '../Templates/imageCard.hbs';
import debounce from 'lodash.debounce';
import createGallery from './trendFilms';
import Pagination from 'tui-pagination';
import refs from './refs'

import { container, getTotalPages } from './pagination';

// замінить клас

const pagination = new Pagination(container);
let query = ''

searchFilms();

async function searchFilms() {

  refs.input.addEventListener(
    'input',
    debounce(async () => {
      query = refs.input.value
      const data = await request.searchFilms(refs.input.value)
      refs.galleryList.innerHTML = '';

      createGallery(data);
      pagination.reset(getTotalPages(data));

    }, 1000)
  )
}

pagination.on('beforeMove', async ({ page }) => {
  refs.galleryList.innerHTML = '';

  refs.input.addEventListener('input', e => {
    if (e.value !== query) {
      request.setPage(1)
    }
  })

  request.setPage(page)
  const data = await request.searchFilms(refs.input.value)
  createGallery(data);
})



// ==============================================
// form.addEventListener('submit', renderImages);
// function renderImages(e) {
//   e.preventDefault();
//   gallery.innerHTML = '';
//   query = input.value;
//   request.searchFilms(query).then(data => {
//     const markup = card(data.results);
//     gallery.innerHTML = markup;
//     form.reset();
//   });
// }