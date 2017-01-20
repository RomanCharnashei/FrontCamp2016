import React from 'react';

export default function UserPriview(props){
    var userName;
    if(props.user.vk_profile) {
        userName = <a href={props.user.vk_profile} className="priview-user__user-link">{props.user.name}</a>;
    } else {
        userName = <span>{props.user.name}</span>;
    }

    return (
        <div className={'priview-user ' + props.addClass}>
            <div className="priview-user__box">
                <img className="priview-user__img" src={props.user.photo_uri} alt="" />
                <div className="priview-user__author-lockup">
                    {userName}          
                    <div className="priview-user__info">{props.pubDate}</div>
                </div>
            </div>
        </div>
    );
};