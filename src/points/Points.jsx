import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import defaultStyles from './Points.module.scss';

const Points = () => {
    console.log('hey');
    return (
        <div>Points</div>
    );
};

Points.defaultProps = {
    styles: defaultStyles
};

Points.propTypes = {
    styles: PropTypes.objectOf(PropTypes.string)
};

const mapDispatchToProps = {

};

const mapStateToProps = state => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(Points);
