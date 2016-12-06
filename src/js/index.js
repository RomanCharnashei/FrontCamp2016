'use strict';

import '../css/index.css';
import './test.json';
import NewsViewer from './newsViewer';
import NewsService from './newsService';
import Mediator from './mediator';
import SourceService from './sourceService'

class NewsApp {
    constructor() {
        this.mediator = new Mediator();
        this.newsViewer = new NewsViewer(new NewsService('2ed7c580e4884a50a6e7d0256ef9e8ce'), document.querySelector('.container'));
        this.sourceService = new SourceService('2ed7c580e4884a50a6e7d0256ef9e8ce');
        this.categoryElement = document.querySelector('#category');
        this.languageElement = document.querySelector('#language');
        this.countryElement = document.querySelector('#country');
        this.sourceElement = document.querySelector('#source');

        this.categoryElement.addEventListener('change', this.categoryChanged.bind(this));
        this.languageElement.addEventListener('change', this.languageChanged.bind(this));
        this.countryElement.addEventListener('change', this.countryChanged.bind(this));
        this.sourceElement.addEventListener('change', this.sourceChanged.bind(this));

        this.mediator.subscribe('sourceChanged', this.view.bind(this));
        this.mediator.subscribe('filterChanged', this.initSource.bind(this));
        this.mediator.subscribe('initSource', this.sourceChanged.bind(this));        
        this.categoryChanged();
    };

    categoryChanged(){
        let category = this.categoryElement.options[this.categoryElement.selectedIndex].value;
        this.sourceService.getSource(category, null, null).then(res => {
            this.sources = res.sources;
            this.mediator.publish('filterChanged');
        });
    }

    languageChanged(){
        let language = this.languageElement.options[this.languageElement.selectedIndex].value;
            this.sourceService.getSource(null, language, null).then(res => {
            this.sources = res.sources;
            this.mediator.publish('filterChanged');
        });
    }

    countryChanged(){
        let country = this.countryElement.options[this.countryElement.selectedIndex].value;
            this.sourceService.getSource(null, null, country).then(res => {
            this.sources = res.sources;
            this.mediator.publish('filterChanged');
        });
    }

    sourceChanged(){
        this.currentSource = this.sourceElement.options[this.sourceElement.selectedIndex].value;
        this.mediator.publish('sourceChanged');
    }

    view() {
        this.newsViewer.view(this.currentSource);
    }

    initSource() {
        let options = [];
        for (let item of this.sources) {
            let option = `<option value="${item.id}">${item.name}</option>`
            options.push(option);
        }
        this.sourceElement.innerHTML = options.join('');
        this.mediator.publish('initSource');
    }

};

new NewsApp();
