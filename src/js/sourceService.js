'use strict';

export default class SourceService {
    constructor(apiKey) {
        this._apiKey = apiKey;
        if(!SourceService.instance) {
            SourceService.instance = this;
        }
        
        return SourceService.instance; // singleton pattern
    }

    getSource(category, language, country) {
        let req = 'https://newsapi.org/v1/sources?';
        if(category) { req += 'category=' + category; }

        if(language) { req += 'language=' + language; }

        if(country) { req += 'country=' + country; }
        return fetch(req)
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
