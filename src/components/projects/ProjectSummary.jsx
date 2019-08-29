import React from 'react';
import PropTypes from 'prop-types';

const ProjectSummary = ({ project }) => (
  <div className="card z-depth-0 project-summary">
    <div className="card-content grey-text text-darken-3">
      <span className="card-title ">{project.title}</span>
      <p>Posted by The Net Ninja</p>
      <p className="grey-text">3rd September, 2am</p>
    </div>
  </div>
);

ProjectSummary.defaultProps = {
  project: {}
};

ProjectSummary.propTypes = {
  project: PropTypes.objectOf(PropTypes.shape({
    title: PropTypes.string
  }))
};

export default ProjectSummary;
