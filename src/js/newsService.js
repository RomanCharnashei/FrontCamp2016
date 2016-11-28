'use strict';

module.exports = class NewsService {
    constructor(apiKey) {
        this._apiKey = apiKey;
    }

    getNews(src='techcrunch') { 
        return fetch(`https://newsapi.org/v1/articles?source=${src}&apiKey=${this._apiKey}`)
            .then(res => {
                if (res.status >= 200 && res.status < 300) {
                    return res;
                } else {
                    var error = new Error(res.statusText);
                    error.response = res;
                    throw error;
                }
            })
            .then(res => res.json());
    }
};
