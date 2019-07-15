import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import Spinner from '../../containers/Spinner';
import {
  getPosts,
  postLikeActions,
  postDislikeActions,
  deletePost,
  addPost
} from '../../actions/profileAction';

const PostList = ({
  getPosts,
  postLikeActions,
  postDislikeActions,
  deletePost,
  addPost,
  auth,
  posts
}) => {
  useEffect(() => {
    getPosts();
  }, [getPosts]);
  const [text, setFormData] = useState('');
  const handleChange = e => {
    e.preventDefault();
    setFormData(e.target.value);
  };

  const { loading } = posts;
  return (
    <Fragment>
      {console.log(loading)}
      {loading ? (
        <Spinner />
      ) : (
        <div>
          <h1 className="large text-primary">Posts</h1>
          <div className="post-form">
            <div className="bg-primary p">
              <h3>Say Something...</h3>
            </div>
            <form
              className="form my-1"
              onSubmit={
                e => {
                  e.preventDefault();
                  addPost({ text });
                  setFormData('');
                }
                // console.log(formData)
              }
            >
              <textarea
                name="text"
                cols="30"
                rows="5"
                placeholder="Create a post"
                onChange={e => handleChange(e)}
                value={text}
                required
              />
              <input
                type="submit"
                className="btn btn-dark my-1"
                value="Submit"
              />
            </form>
          </div>
          {posts.posts.map(post => {
            return (
              <div key={post._id} className="posts">
                <div className="d-flex flex-row post bg-white p-1 my-1">
                  <div className="postItem mx-2 ">
                    <Link className="d-flex flex-column image" to={`profile/${post.user}`}>
                      <img
                        className="rounded-circle"
                        src={post.avatar}
                        alt=""
                      />
                      <h4 className="hPost">{post.name}</h4>
                    </Link>
                  </div>
                  <div>
                    <p className="my-1">{post.text}</p>
                    <p className="post-date">
                      <strong>
                        <i>posted on</i>
                      </strong>{' '}
                      <Moment format="YYYY/MM/DD">{post.date}</Moment>
                    </p>
                    <button
                      type="button"
                      onClick={e => {
                        e.preventDefault();
                        postLikeActions(post._id);
                      }}
                      className="btn btn-light"
                    >
                      <i className="fa fa-thumbs-up" />{' '}
                      {post.likes ? (
                        <span>
                          {post.likes.length === 0 ? '' : post.likes.length}
                        </span>
                      ) : (
                        ''
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={e => {
                        e.preventDefault();
                        postDislikeActions(post._id);
                      }}
                      className="btn btn-light"
                    >
                      <i className="fa fa-thumbs-down" />{' '}
                    </button>
                    <Link to={`/post/${post._id}`} className="btn btn-primary">
                      Discussion{' '}
                      {post.likes ? (
                        <span className="comment-count">
                          {post.comments.length}
                        </span>
                      ) : (
                        ''
                      )}
                    </Link>
                    {auth.isAuthorized && auth.user.id === post.user ? (
                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => {
                          return deletePost(post._id);
                        }}
                      >
                        <i className="fa fa-times" />
                      </button>
                    ) : (
                      ''
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </Fragment>
  );
};

PostList.propTypes = {
  getPosts: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  posts: PropTypes.object.isRequired,
  postLikeActions: PropTypes.func.isRequired,
  postDislikeActions: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
  addPost: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  posts: state.post
});

export default connect(
  mapStateToProps,
  { getPosts, postLikeActions, postDislikeActions, deletePost, addPost }
)(PostList);
