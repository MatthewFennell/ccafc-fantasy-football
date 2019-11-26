import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import defaultStyles from './ApproveHighlights.module.scss';
import { fetchHighlightsForApprovalRequest } from '../actions';
import YouTubeList from './YouTubeList';

const ApproveHighlights = props => {
    console.log('approving');
    useEffect(() => {
        props.fetchHighlightsForApprovalRequest();
    }, [props.fetchHighlightsForApprovalRequest]);

    return (
        <>
            <div className={props.styles.approveHighlightsWrapper}>
                Highlights
            </div>
            <div className={props.styles.highlightsWrapper}>
                <YouTubeList
                    videos={props.highlightsForApproval}
                />
            </div>
        </>
    );
};

ApproveHighlights.defaultProps = {
    highlightsForApproval: [],
    styles: defaultStyles
};

ApproveHighlights.propTypes = {
    fetchHighlightsForApprovalRequest: PropTypes.func.isRequired,
    highlightsForApproval: PropTypes.arrayOf(PropTypes.shape({
        userId: PropTypes.string,
        videoId: PropTypes.string,
        id: PropTypes.string
    })),
    styles: PropTypes.objectOf(PropTypes.string)
};

const mapDispatchToProps = {
    fetchHighlightsForApprovalRequest
};

const mapStateToProps = state => ({
    highlightsForApproval: state.admin.highlightsForApproval
});

export default connect(mapStateToProps, mapDispatchToProps)(ApproveHighlights);
