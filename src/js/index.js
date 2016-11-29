'use strict';

import '../css/index.css';
import './test.json';
import NewsViewer from './newsViewer';
import NewsService from './newsService';

new NewsViewer( 
    new NewsService('2ed7c580e4884a50a6e7d0256ef9e8ce'),
    document.querySelector('.container')).view();
