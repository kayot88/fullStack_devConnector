import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { addExperience } from '../../actions/profileAction';

const AddExperence = ({ addExperience, history }) => {
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    from: '',
    location: '',
    to: '',
    current: false,
    description: ''
  });
 const [dataDisabled, toggleDisabled] = useState(false)
  const { title, company, from, location, to, current, description } = formData;
  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = e => {
    e.preventDefault();
    return addExperience(formData, history);
  };
  return (
    <Fragment>
      <h1 className="large text-primary">Add An Experience</h1>
      <small>* = required field</small>
      <form className="form" onSubmit={(e) => handleSubmit(e)}>
        <div className="form-group">
          <input
            type="text"
            placeholder="* Job Title"
            name="title"
            value={title}
            onChange={e => onChange(e)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="* Company"
            name="company"
            value={company}
            onChange={e => onChange(e)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Location"
            name="location"
            value={location}
            onChange={e => onChange(e)}
          />
        </div>
        <div className="form-group">
          <h4>From Date</h4>
          <input
            type="date"
            name="from"
            value={from}
            onChange={e => onChange(e)}
          />
        </div>
        <div className="form-group">
          <p>
            <input
              type="checkbox"
              name="current"
              value={current}
              checked={current}
              onChange={e => {
                setFormData({...formData, current: !current})
                toggleDisabled(!dataDisabled);
              }}
            />{' '}
            Current Job
          </p>
        </div>
        <div className="form-group">
          <h4>To Date</h4>
          <input type="date" name="to" disabled={dataDisabled} value={to} onChange={e => onChange(e)} />
        </div>
        <div className="form-group">
          <textarea
            name="description"
            cols="30"
            rows="5"
            placeholder="Job Description"
            value={description}
            onChange={e => onChange(e)}
          />
        </div>
        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" to="/dashboard">
          Go Back
        </Link>
      </form>
    </Fragment>
  );
};

AddExperence.propTypes = {
  addExperience: PropTypes.func.isRequired
};

export default connect(
  null,
  {addExperience}
)(withRouter(AddExperence));
