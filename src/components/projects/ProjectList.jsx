import React from 'react';
import PropTypes from 'prop-types';
import ProjectSummary from './ProjectSummary';

const ProjectList = ({ projects }) => (
  <div className="project-list section">
    { projects && projects.map(project => (
      <ProjectSummary project={project} key={project.id} />
    ))}
  </div>
);

ProjectList.defaultProps = {
  projects: []
};

ProjectList.propTypes = {
  projects: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.shape({
    title: PropTypes.string,
    id: PropTypes.string
  })))
};

export default ProjectList;
