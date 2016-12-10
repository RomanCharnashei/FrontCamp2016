'use strict';

export default class NewsService {
    constructor(apiKey) {
        this._apiKey = apiKey;
        if(!NewsService.instance) {
            NewsService.instance = this;
        }
        
        return NewsService.instance; // singleton pattern
    }

    getNews(src='bbc-news', sortBy='popular') { 
        return fetch(`https://newsapi.org/v1/articles?source=${src}&apiKey=${this._apiKey}`)
            .then(res => {
                if (res.status >= 200 && res.status < 300) {
                    return res;
                } else {
                    var error = new Error(res.statusText);
                    error.response = res.json();
                    throw error;
                }
            })
            .then(res => res.json());
    }
};
