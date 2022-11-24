import { Notify } from 'notiflix/build/notiflix-notify-aio';
import axios from 'axios';
import { createMarkup } from './js/create-markup';

//API variables
const API_KEY = "31574870-ec3306c679007fa4646c6ce9c"
const BASE_URL = "https://pixabay.com/api/"
let page = 1;
let query = '';
let avaliablePages = 0;
const perPage = 40;

//page elements
const formEl = document.querySelector('.search-form');
const galleryEl = document.querySelector('.gallery');
const loadMoreBtnEl = document.querySelector('.load-more');

//event listeners
formEl.addEventListener('submit', onFormSubmit);
loadMoreBtnEl.addEventListener('click', onLoadMoreBtnClick);

async function onLoadMoreBtnClick(e) {
    page += 1;
    if (page === avaliablePages) {
        loadMoreBtnEl.classList.add('is-hidden');
    }
    try {
        const data = await getImages(query);
        const additionalGalleryMarkup = createMarkup(data.hits);
        galleryEl.insertAdjacentHTML('beforeend', additionalGalleryMarkup);
        
    } catch (error) {
        Notify.failure(error.message);
    }    
}

async function onFormSubmit(e) {
    page = 1;
    e.preventDefault();
    query = e.target.elements.searchQuery.value.trim();
    e.target.reset();
    try {
        const data = await getImages(query);
        if (data.totalHits === 0) {
            galleryEl.innerHTML = '';
            Notify.failure("Sorry, there are no images matching your search query. Please try again.");
            return
        }
        const galleryMarkup = createMarkup(data.hits);
        avaliablePages = Math.floor(data.totalHits / perPage);
        if (avaliablePages > 1) {
            loadMoreBtnEl.classList.remove('is-hidden')
        }
        galleryEl.innerHTML = galleryMarkup;
        
    } catch (error) {
        Notify.failure(error.message)
    }

}

async function getImages(q) {
    const { data } = await axios.get(`${BASE_URL}?key=${API_KEY}&q=${q}&page=${page}&per_page=${perPage}&image_type=photo&orientation=horizontal&safesearch=true`);
    return data;
}

