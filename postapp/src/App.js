import React, { Component } from 'react';
import './App.css';
import appStore from "./appListingStore";
import Listposts from "./ListPosts";
import axios from 'axios';

var DisplayPostsPageState;
class App extends Component {
  constructor() {
    super();
    this.state = {
      TotalPosts : -1,
      appStoreData : appStore.getState()
    }
    DisplayPostsPageState = this.changeState.bind(this);
    appStore.subscribe(() => {
      DisplayPostsPageState();
    });
    this.addNewPostClicked = this.addNewPostClicked.bind(this);
    this.AddCommentClick = this.AddCommentClick.bind(this);
  }

  componentDidMount() {
        let val;
        var self = this;
        axios.get('http://localhost:8080/api/posts')
        .then(function (response) {
            console.log(response);
            val = response.data;
            appStore.dispatch({type: "ADD_INITIAL_POSTS",posts: val})
            self.setState({TotalPosts : self.state.appStoreData.length});
        });
  }

  changeState(){
    this.setState({appStoreData: appStore.getState()});
  }

  addNewPostClicked(e) {
    var text = e.target.previousElementSibling.value;
    let postDate = new Date();
    e.target.previousElementSibling.value = "";
    this.setState({TotalPosts : this.state.TotalPosts+1});
    axios.post('http://localhost:8080/api/posts',{ PostContent : text, comment : [], postedOn : postDate}).then(
      function(response) {
        console.log(response);
        var actionType= 'ADD_NEW_POST';
        var PostText = response.data.PostContent;
        var Postid = response.data.id;
        var Postdate = response.data.postedOn;
        appStore.dispatch({type: actionType, content: PostText, id: Postid, postedOn: Postdate});
      });
  }

  AddCommentClick(commenttext,postid) {
    var getAPI = 'http://localhost:8080/api/posts/' + postid;
    axios.get(getAPI).then(function(response) {
      var value = response.data.PostContent;
      var comments = response.data.comment;
      var postDate = response.data.postedOn;
      console.log(comments);
      comments.push(commenttext);
      axios.delete(getAPI).then(function(response) {
        console.log(response);
      });
      axios.post('http://localhost:8080/api/posts',{ PostContent : value, comment : comments, postedOn : postDate}).then(
        function(response) {
          console.log(response);
        });
    })
    appStore.dispatch({type: 'ADD_NEW_COMMENT', commentText: commenttext, postid: postid});
  }

  render() {
    return (
      <div className="App">
        <div className="newPosts">
          <input className="AddNewPost" type="text" placeholder="What are you up to?" />
          <input type="button" value="POST" onClick={this.addNewPostClicked}/>
        </div>
        {
          this.state.TotalPosts >= 0 &&
          <Listposts 
          postsData={this.state.appStoreData}
          addnewCommentClicked={this.AddCommentClick}/>
        }
      </div>
    );
  }
}

export default App;
