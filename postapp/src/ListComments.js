import React from "react";
import appStore from "./appListingStore";
import TimeAgo from 'react-timeago';
import { Comment } from 'semantic-ui-react'
import './App.css';


export default class DisplayComments extends React.Component {
    constructor(){
        super();
        this.state = {
            appStoreData: appStore.getState(),
            showReplyTextArea: false
        };
        this.replyCommentLinkClicked = this.replyCommentLinkClicked.bind(this);
    }

    replyCommentLinkClicked() {
        this.setState({showReplyTextArea:true});
    }

    replySubmitted(e) {
        var textValue = e.target.previousElementSibling.value;
        appStore.dispatch({type: 'ADD_COMMENT_REPLY',text: textValue});
    }


    render() {
        var commentsToList = [];
        var comments = this.props.comments;
        var i =0;
        comments.forEach((comment) => {
            commentsToList.push(
                <Comment.Group key={i++}>
                    <Comment>
                    <Comment.Content>
                    <Comment.Author >{this.props.name}</Comment.Author>
                    <Comment.Metadata>
                        <TimeAgo date= 'Apr 8, 2018' style={{'display':'none'}} />
                    </Comment.Metadata>
                    <Comment.Text>{comment}</Comment.Text>
                    <Comment.Actions>
                        <a onClick={this.replyCommentLinkClicked} style={{'display':'none'}}>Reply</a>
                    </Comment.Actions>
                    </Comment.Content>
                    </Comment>
                {
                    this.state.showReplyTextArea &&
                    <form reply>
                        <textarea></textarea>
                        <button content='Add Reply' labelPosition='left' icon='edit' primary onClick={(e) => this.replySubmitted(e)}/>
                    </form>
                }
                </Comment.Group>);
            }
        )
        return (
            <div className="commentsList">
                {commentsToList}
            </div>
        );
    }
}