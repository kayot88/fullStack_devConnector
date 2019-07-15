import {
  GET_POSTS,
  POSTS_ERROR,
  POST_UPDATE,
  POST_DELETE,
  ADD_POST
} from '../constants/types';

const initialState = {
  posts: [],
  post: null,
  error: {},
  loading: true
};

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case POST_UPDATE:
      return {
        ...state,
        posts: state.posts.map(post =>
          post._id === action.payload.postId
            ? { ...post, likes: action.payload.likes }
            : post
        ),
        likes: action.payload,
        loading: false
      };
    case POST_DELETE:
      return {
        ...state,
        posts: state.posts.filter(post => post._id !== action.payload),
        loading: false
      };
    case ADD_POST:
      return {
        ...state,
        posts: [action.payload, ...state.posts],
        loading: false
      };
    case GET_POSTS:
      return {
        ...state,
        posts: action.payload || {},
        loading: false
      };
    case POSTS_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    default:
      return state;
  }
};

export default postReducer;
