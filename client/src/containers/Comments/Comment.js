import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  addComment,
  getComments,
  deleteComment
} from '../../actions/profileAction';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import Spinner from '../Spinner';

const Comment = ({
  addComment,
  getComments,
  deleteComment, 
  auth,
  post,
  loading,
  match
}) => {
  useEffect(() => {
    const postId = match.params.id;
    getComments(postId);
    /*eslint-disable*/
  }, [getComments]);
  /*eslint-enable*/

  // console.log(loading);
  const postId = match.params.id;
  const [text, setText] = useState('');
  const handleChange = e => {
    e.preventDefault();
    setText(e.target.value);
    console.log(text);
  };
  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <div>
          <h1 className="large text-primary">Comments</h1>
          <div className="post-form">
            <div className="bg-primary p">
              <h3>Add comment</h3>
            </div>
            <form
              className="form my-1"
              onSubmit={e => {
                e.preventDefault();
                addComment({ text, postId });
                setText('');
              }}
            >
              <textarea
                name="text"
                cols="30"
                rows="5"
                placeholder="Create a comment"
                onChange={e => handleChange(e)}
                value={text}
                required
              />
              <input
                type="submit"
                className="btn btn-success my-1"
                value="Send"
              />
              <Link type="button" className="btn btn-dark my-1" to="/posts">
                Back to posts
              </Link>
            </form>
          </div>
        </div>
      )}
      {post.post.comments
        ? post.post.comments.map(comment => {
            return (
              <div
                key={comment._id}
                className="d-flex m-2 justify-content-between"
              >
                <div className="d-flex ">
                  <img
                    alt="avatar"
                    src={comment.avatar}
                    style={{ hight: '40px', width: '40px' }}
                  />
                  <div className="mx-2">{comment.text}</div>
                  <Moment format="YYYY/MM/DD">
                    {comment.date}
                  </Moment>
                </div>
                {comment.name === auth.user.id ? (
                  <button
                    className="btn btn-danger"
                    onClick={e =>
                      deleteComment(postId, comment._id)
                    }
                  >
                    <i className="fa fa-trash" />
                  </button>
                ) : (
                  ''
                )}
              </div>
            );
          })
        : ''}
      {/* {console.log(post.post.comments)} */}
    </Fragment>
  );
};

Comment.propTypes = {
  addComment: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  deleteComment: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  post: state.post,
  loading: state.post.loading,
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { addComment, getComments, deleteComment }
)(Comment);
