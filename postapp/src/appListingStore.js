import { createStore } from 'redux';

const addnewPostCommentReducer = (state = {}, action) => {
    if(action.type === 'ADD_NEW_POST') {
        return [
            ...state,
            {
                id : action.id,
                postedOn : action.postedOn,
                PostContent : action.content,
                comment : []
            }
        ]
    } else if(action.type === 'ADD_NEW_COMMENT') {
        return state.map(post => {
            if (post.id === action.postid) {
                post.comment.push(action.commentText);
                Object.assign(post, {comment: post.comment});
            }
            return post;
        })
    } else if(action.type === 'ADD_INITIAL_POSTS') {
        state = action.posts;
        return state;
    }
    return state;
}

const Store = createStore(addnewPostCommentReducer);

export default Store;