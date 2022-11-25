import axios from "axios";
export class PixabayApi{
    #API_KEY;
    #BASE_URL;
    #page;
    #perPage;
    #avaliablePages;
    #query;
    #otherSearchParams;
    constructor(){
        this.#API_KEY = "31574870-ec3306c679007fa4646c6ce9c";
        this.#BASE_URL = "https://pixabay.com/api/";
        this.#otherSearchParams = '&image_type=photo&orientation=horizontal&safesearch=true';
        this.#page = 1;
        this.#perPage = 40;
    }
    async getImages() {
        const { data } = await axios.get(`${this.#BASE_URL}?key=${this.#API_KEY}&q=${this.#query}&page=${this.#page}&per_page=${this.#perPage}${this.#otherSearchParams}`);
        this.#findAvaliablePages(data.totalHits)
        return data;
    }

    getPage() {
        return this.#page;
    }
    
    setPageToDefault() {
        this.#page = 1;
    }

    pageIncrement() {
        this.#page += 1;
    }
    
    setQuery(str) {
        this.#query = str;
    }
    
    #findAvaliablePages(num) {
        this.#avaliablePages = Math.ceil(num / this.#perPage);
    }
    
    getAvaliablePages() {
        return this.#avaliablePages;
    }
}