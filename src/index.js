import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { PixabayApi } from './js/get-images';
import { createMarkup } from './js/create-markup';

const pixabayApi = new PixabayApi();

//page elements
const formEl = document.querySelector('.search-form');
const galleryEl = document.querySelector('.gallery');
const loadMoreBtnEl = document.querySelector('.load-more');

//event listeners
formEl.addEventListener('submit', onFormSubmit);
loadMoreBtnEl.addEventListener('click', onLoadMoreBtnClick);

async function onLoadMoreBtnClick(e) {
    pixabayApi.pageIncrement();
    if (pixabayApi.getPage() === pixabayApi.getAvaliablePages()) {
        loadMoreBtnEl.classList.add('is-hidden');
    }
    try {
        const data = await pixabayApi.getImages();
        const additionalGalleryMarkup = createMarkup(data.hits);
        galleryEl.insertAdjacentHTML('beforeend', additionalGalleryMarkup);
        
    } catch (error) {
        Notify.failure(error.message);
    }    
}

async function onFormSubmit(e) {
    e.preventDefault();
    pixabayApi.setPageToDefault();
    const pureInputText = e.target.elements.searchQuery.value.trim();
    pixabayApi.setQuery(pureInputText)
    e.target.reset();
    try {
        const data = await pixabayApi.getImages();
        if (data.totalHits === 0) {
            galleryEl.innerHTML = '';
            Notify.failure("Sorry, there are no images matching your search query. Please try again.");
            return
        }
        const galleryMarkup = createMarkup(data.hits);
        if (pixabayApi.getAvaliablePages() > 1) {
            loadMoreBtnEl.classList.remove('is-hidden')
        }
        galleryEl.innerHTML = galleryMarkup;
        
    } catch (error) {
        Notify.failure(error.message)
    }

}

