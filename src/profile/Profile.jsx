import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { linkProfileToFacebook, linkProfileToGoogle } from '../auth/actions';

const Profile = props => (
    <div>
    Profile
        <div
            role="button"
            tabIndex={0}
            onClick={props.linkProfileToGoogle}
        >
    Link your google account
        </div>

        <div
            role="button"
            tabIndex={0}
            onClick={props.linkProfileToFacebook}
        >
    Link your Facebook account
        </div>
    </div>
);

const mapDispatchToProps = {
    linkProfileToFacebook,
    linkProfileToGoogle
};

Profile.defaultProps = {

};

Profile.propTypes = {
    linkProfileToFacebook: PropTypes.func.isRequired,
    linkProfileToGoogle: PropTypes.func.isRequired
};

export default connect(null, mapDispatchToProps)(Profile);
