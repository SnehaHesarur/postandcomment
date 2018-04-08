import React from "react";
import appStore from "./appListingStore";
import TimeAgo from 'react-timeago';
import './App.css';
import DisplayComments from './ListComments';


export default class DisplayPosts extends React.Component {
    constructor(){
        super();
        this.state = {
            appStoreData: appStore.getState()
        }
        this.AddCommentClick = this.AddCommentClick.bind(this);
    }
    
    AddCommentClick(e,postid) {
        var commenttext = e.target.previousElementSibling.value;
        e.target.previousElementSibling.value = "";
        this.props.addnewCommentClicked(commenttext,postid);
    }

    render() {
        var Listofposts = this.props.postsData;
        return (
            <div className="postsContainer">
                {Listofposts.map(post => (
                <div className="PostListitems" key={post.id}>
                    <span className="UserName"> Anonymous User : </span>
                    <span className="PostContent"> {post.PostContent} </span>
                    <TimeAgo date= {post.postedOn}/>
                    <input className="commentLink" placeholder="Write a comment" /><input type="button" value="Comment" onClick={(e) => this.AddCommentClick(e,post.id)}/>
                    {
                        post.comment.length > 0 &&
                        <DisplayComments 
                        name="Anonymous User"
                        comments={post.comment}/>
                    }
                </div>
                ))}
            </div>
        )
    }
}