import React from 'react';
import axios from 'axios';
import ArticlePriview from './article_priview';

export default React.createClass({
    getInitialState: function(){
        return {
            articles: []
        };
    },

    fetchArticles: function(){
        var uri = '/articles';
        if(this.props.location.search) {
            uri += this.props.location.search;
        }
        axios.get(uri)
            .then(res => {
                if (!this.ignoreLastFetch){
                    this.setState({ articles: res.data });
                }                    
            });
    },

    componentDidMount: function(){
        this.fetchArticles();
    },

    componentDidUpdate: function(){
        this.fetchArticles();
    },

    componentWillUnmount: function(){
        this.ignoreLastFetch = true;
    },

    render: function() {
        return (
            <div className="content">
                {this.state.articles.map(function(article){
                    return <ArticlePriview key={article._id} content={article} />;
                })}
            </div>            
        );
    }
});