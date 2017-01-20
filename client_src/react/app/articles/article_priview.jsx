import React from 'react';
import { Link } from 'react-router'
import UserPriview from '../common/user_priview';

export default function ArticlePriview(props){
    return (
        <div className="article-priview">
            <UserPriview user={props.content._user} pubDate={props.content.pubDate} addClass={'article-priview__user'}/>
            <div className="article-priview__content-box">
                <Link className="article-priview__article-link" to={`/article/${props.content._id}`}></Link>
                <h2 className="article-priview__title">{props.content.title}</h2>
                <p className="article-priview__content">{props.content.preview}</p>
            </div>        
        </div>
    );
};