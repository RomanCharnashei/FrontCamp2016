class NewsService {
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
}

class NewsViewer {
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
}

new NewsViewer( 
    new NewsService('2ed7c580e4884a50a6e7d0256ef9e8ce'),
    document.querySelector('.container')).view();
