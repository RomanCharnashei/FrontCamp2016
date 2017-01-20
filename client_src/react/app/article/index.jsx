import React from 'react';
import axios from 'axios';
import UserPriview from '../common/user_priview';

export default React.createClass({
    getInitialState: function(){
        return {
            article: null
        };
    },

    componentDidMount: function(){
        axios.get(`/article/${this.props.params.id}`)
        .then(res => {
            this.setState({ article: res.data });
        });
    },

    render: function() {
        var article;
        if(this.state.article) {
            return (
                    <div className="content">        
                        <div className="article">
                            <UserPriview user={this.state.article._user} pubDate={this.state.article.pubDate} addClass={'article__user'}/>
                            <h2 className="article__title">{this.state.article.title}</h2>
                            <p className="article__content">{this.state.article.content}</p>
                        </div>
                    </div>
             );
        } else {
            return <div className="content"></div> 
        }
    }
});