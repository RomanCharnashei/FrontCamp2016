'use strict';

export default class SourceService {
    constructor(apiKey) {
        this._apiKey = apiKey;
        if(!SourceService.instance) {
            SourceService.instance = this;
        }
        
        return SourceService.instance; // singleton pattern
    }

    processParam(quary, param, paramName) {
        if(param) { 
            if(quary) quary += '&';
            quary += paramName + '=' + param; 
        }

        return quary;
    }

    getSource(category, language, country) {
        let req = 'https://newsapi.org/v1/sources';
        let quary = '';

        if(category || language || country) { req += '?'; }

        quary = this.processParam(quary, category, 'category');
        quary = this.processParam(quary, language, 'language');
        quary = this.processParam(quary, country, 'country');

        return fetch(req + quary)
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
