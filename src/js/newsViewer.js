'use strict';

export default class NewsViewer {
    constructor(newsSvc, container) {
        this._newsSvc = newsSvc;
        this._container = container;
        this._news = null;
    }

    _init(res) {
        this._news = res.articles;
    }

    _view() {
        let elements = [];        
        for (let item of this._news) {
            let innerHTML = 
            `<div class="news-item">` +
                `<div class=\"news-item__content\">` + 
                    `<img class=\"news-item__img\" src=\"${item.urlToImage}\"/>` +
                    `<h2 class=\"news-item__title\">${item.title}</h2>` +                                 
                    `${item.description}` +
                `</div>` +
                `<div class=\"news-item__bottom\">` +
                    `<span class=\"news-item__date\">${new Date(item.publishedAt).toLocaleString()}</span>` +
                    `<a class=\"news-item__src\" href=\"${item.url}\">${item.author}</a>` +
                `</div>` +                
            `</div>`;
            elements.push(innerHTML);
        }
        this._container.innerHTML = elements.join('');
    }

    errorHandling(error) {        
        error.response.then(res => {
            let msgHTML = `<div class=\"news-item\">${res.message || error.message}</div>`;
            this._container.innerHTML = msgHTML;
        });        
    }

    view(src) {
        this._newsSvc.getNews(src)
            .then(this._init.bind(this))
            .then(this._view.bind(this))
            .catch(this.errorHandling.bind(this));
    }
};