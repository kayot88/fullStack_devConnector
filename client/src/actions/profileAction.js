import axios from 'axios';
import {
  GET_PROFILE,
  GET_PROFILES,
  GET_REPOS,
  PROFILE_ERROR,
  FETCH_PROFILE,
  CLEAR_PROFILE,
  UPDATE_PROFILE,
  DELETE_EXPERIENCE,
  DELETE_EDUCATION,
  REMOVE_PROFILE,
  GET_POSTS,
  POSTS_ERROR,
  POST_UPDATE,
  POST_DELETE,
  ADD_POST,
  ADD_COMMENT,
  DELETE_COMMENT,
  GET_COMMENTS
} from '../constants/types';
import { setHeaderToken } from '../utils/setHeaderToken';
import alertActions from '../actions/alertActions';

export const addExperience = (formData, history) => async dispatch => {
  dispatch({
    type: FETCH_PROFILE
  });
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    const res = await axios.put('/api/profile/experience', formData, config);
    console.log(res);
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data
    });
    if (res.data) {
      dispatch(alertActions('experiences added', 'success'));
      history.push('/dashboard');
    }
  } catch (error) {
    const { errors } = error.response.data;
    errors.map(error => dispatch(alertActions(error.msg, 'danger')));
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: error.response.data }
    });
  }
};
export const addPost = formData => async dispatch => {
  // dispatch({
  //   type: FETCH_PROFILE
  // });
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    const res = await axios.post('/api/posts', formData, config);
    console.log(res.data);
    dispatch({
      type: ADD_POST,
      payload: res.data
    });
    // console.log(res.data);
    if (res.data) {
      dispatch(alertActions('post added', 'success'));
      // history.push('/dashboard');
    }
  } catch (error) {
    console.log(error);
    // const { errors } = error.response.data;
    // errors.map(error => dispatch(alertActions(error.msg, 'danger')));
    dispatch({
      type: POSTS_ERROR,
      payload: { msg: error.response.data }
    });
  }
};
export const addComment = (text, postId) => async dispatch => {

  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    const res = await axios.put(`/api/posts/${postId}/comments`, text, config);
    // console.log(res.data);
    dispatch({
      type: ADD_COMMENT,
      payload: res.data
    });
    // console.log(res.data);
    if (res.data) {
      dispatch(alertActions('comment added', 'success'));
      // history.push('/dashboard');
    }
  } catch (error) {
    console.log(error);
    // const { errors } = error.response.data;
    // errors.map(error => dispatch(alertActions(error.msg, 'danger')));
    // dispatch({
    //   type: POSTS_ERROR,
    //   payload: { msg: error.response.data }
    // });
  }
};
export const addEducation = (formData, history) => async dispatch => {
  dispatch({
    type: FETCH_PROFILE
  });
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    const res = await axios.put('/api/profile/education', formData, config);
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data
    });
    if (res.data) {
      dispatch(alertActions('education added', 'success'));
      history.push('/dashboard');
    }
  } catch (error) {
    const { errors } = error.response.data;
    errors.map(error => dispatch(alertActions(error.msg, 'danger')));
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: error.response.data }
    });
  }
};
export const deleteExperience = (id, history) => async dispatch => {
  try {
    const res = await axios.delete(`/api/profile/experience/${id}`);
    dispatch({
      type: DELETE_EXPERIENCE,
      payload: res.data
    });
    if (res.data) {
      dispatch(alertActions('experience was delete', 'success'));
      history.push('/dashboard');
    }
  } catch (error) {
    const { errors } = error.response.data;
    if (Array.isArray(errors)) {
      errors.map(error => dispatch(alertActions(error.msg, 'danger')));
    }
    console.log(error);
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: error.response.data }
    });
  }
};
export const deleteEducation = (id, history) => async dispatch => {
  try {
    const res = await axios.delete(`/api/profile/education/${id}`);
    dispatch({
      type: DELETE_EDUCATION,
      payload: res.data
    });
    if (res.data) {
      dispatch(alertActions('education was delete', 'success'));
      history.push('/dashboard');
    }
  } catch (error) {
    const { errors } = error.response.data;
    if (Array.isArray(errors)) {
      errors.map(error => dispatch(alertActions(error.msg, 'danger')));
    }
    console.log(error);
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: error.response.data }
    });
  }
};
export const deleteProfile = () => async dispatch => {
  if (window.confirm('Are you sure? This can NOT be undone!')) {
    try {
      await axios.delete('/api/profile');

      dispatch({ type: CLEAR_PROFILE });
      dispatch({ type: REMOVE_PROFILE });

      dispatch(alertActions('Your account has been permanantly deleted'));
    } catch (err) {
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  }
};
export const deletePost = postId => async dispatch => {
  if (window.confirm('Are you sure? This can NOT be undone!')) {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        setHeaderToken(token);
      }
      await axios.delete(`/api/posts/${postId}`);

      dispatch(alertActions('Post deleted', 'success'));
      dispatch({
        type: POST_DELETE,
        payload: postId
      });
    } catch (err) {
      console.log(err);
      dispatch({
        type: POSTS_ERROR,
        payload: {
          msg: err.response.statusText,
          status: err.response.status
        }
      });
    }
  }
};

export const profileActions = () => async dispatch => {
  dispatch({
    type: FETCH_PROFILE
  });

  const token = localStorage.getItem('token');
  if (token) {
    setHeaderToken(token);
  }

  try {
    const res = await axios.get('/api/profile/me');
    // console.log(res);
    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });
  } catch (error) {
    console.error(error.message);
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: error.response.data }
    });
  }
};
export const postLikeActions = postId => async dispatch => {
  dispatch({
    type: FETCH_PROFILE
  });

  const token = localStorage.getItem('token');
  if (token) {
    setHeaderToken(token);
  }

  try {
    const res = await axios.put(`/api/posts/like/${postId}`);
    // console.log(res);
    dispatch({
      type: POST_UPDATE,
      payload: { postId, likes: res.data }
    });
  } catch (error) {
    console.error(error.message);
    dispatch({
      type: POSTS_ERROR,
      payload: { msg: error.response.data }
    });
  }
};

export const postDislikeActions = postId => async dispatch => {
  dispatch({
    type: FETCH_PROFILE
  });

  const token = localStorage.getItem('token');
  if (token) {
    setHeaderToken(token);
  }

  try {
    const res = await axios.put(`/api/posts/unlike/${postId}`);
    // console.log(res);
    dispatch({
      type: POST_UPDATE,
      payload: { postId, likes: res.data }
    });
  } catch (error) {
    console.error(error.message);
    dispatch({
      type: POSTS_ERROR,
      payload: { msg: error.response.data }
    });
  }
};

export const createProfileUpdate = (
  formData,
  history,
  edit = false
) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    const res = await axios.post('/api/profile', formData, config);
    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });

    dispatch(
      alertActions(edit ? 'Profile updated' : 'Profile created', 'success')
    );

    if (!edit) {
      history.push('/dashboard');
    }
    history.push('/dashboard');
  } catch (error) {
    const { errors } = error.response.data;
    errors.map(error => dispatch(alertActions(error.msg, 'danger')));
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status }
    });
  }
};

export const getAllProfiles = () => async dispatch => {
  dispatch({
    type: FETCH_PROFILE
  });
  try {
    const res = await axios.get('/api/profile');
    dispatch({
      type: GET_PROFILES,
      payload: res.data
    });
  } catch (error) {
    console.error(error.message);
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: error.response.data }
    });
  }
};

export const getProfileById = userId => async dispatch => {
  dispatch({
    type: FETCH_PROFILE
  });
  try {
    const res = await axios.get(`/api/profile/user/${userId}`);
    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });
  } catch (error) {
    console.error(error.message);
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: error.response.data }
    });
  }
};

export const getRepos = username => async dispatch => {
  try {
    const res = await axios.get(`/api/profile/github/${username}`);
    dispatch({
      type: GET_REPOS,
      payload: res.data
    });
  } catch (error) {
    console.error(error.message);
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: error.response.data }
    });
  }
};
export const getComments = postId => async dispatch => {
  try {
     const token = localStorage.getItem('token');
     if (token) {
       setHeaderToken(token);
     }
    const res = await axios.get(`/api/posts/${postId}`);
    console.log(res.data.comments);
    dispatch({
      type: GET_COMMENTS,
      payload: res.data.comments
    });
  } catch (error) {
    console.error(error.message);
    dispatch({
      type: POSTS_ERROR,
      payload: { msg: error.response.data }
    });
  }
};

export const getPosts = username => async dispatch => {
  try {
    const res = await axios.get('/api/posts/');
    dispatch({
      type: GET_POSTS,
      payload: res.data
    });
  } catch (error) {
    console.error(error.message);
    dispatch({
      type: POSTS_ERROR,
      payload: { msg: error.response.data }
    });
  }
};
