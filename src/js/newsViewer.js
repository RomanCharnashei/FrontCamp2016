'use strict';

export default class NewsViewer {
    constructor(newsSvc, container) {
        this._newsSvc = newsSvc;
        this._container = container;
        this._news = null;
    }

    get news() {
        return this._news;
    }

    _init(res) {
        this._news = res.articles;
    }

    _view() {
        let elements = [];        
        for (let item of this._news) {
            let innerHTML = 
            `<div class="news-item">` +
                `<h2 class=\"news-item__title\">${item.title}</h2>` +
                `<p class=\"news-item__content\"><img class=\"news-item__img\" src=\"${item.urlToImage}\"/>${item.description}</p>` +
                `<div class=\"news-item__bottom\">` +
                    `<span class=\"news-item__date\">${new Date(item.publishedAt).toLocaleString()}</span>` +
                    `<a class=\"news-item__src\" href=\"${item.url}\">${item.author}</a>` +
                `</div>` +                
            `</div>`;
            elements.push(innerHTML);
        }
        this._container.innerHTML = elements.join('');
    }

    view() {
        this._newsSvc.getNews()
            .then(this._init.bind(this))
            .then(this._view.bind(this))
            .catch(error => { console.log('request failed', error); });
    }
};