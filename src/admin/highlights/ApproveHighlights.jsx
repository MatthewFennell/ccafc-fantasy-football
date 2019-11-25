import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import fp from 'lodash/fp';
import defaultStyles from './ApproveHighlights.module.scss';
import { fetchHighlightsForApprovalRequest } from '../actions';
import CustomYouTube from '../../common/youtube/YouTube';
import WithCollapsable from '../../common/collapsableHOC/WithCollapsable';

const opts = {
    height: '390',
    // width: '100%',
    playerVars: { // https://developers.google.com/youtube/player_parameters
        autoplay: 0
    }
};

const ApproveHighlights = props => {
    console.log('approving');
    useEffect(() => {
        props.fetchHighlightsForApprovalRequest();
    }, [props.fetchHighlightsForApprovalRequest]);

    const onReady = e => e.target.pauseVideo();

    const [vidsOpen, setVidsOpen] = useState({});

    return (
        <>
            <div className={props.styles.approveHighlightsWrapper}>
            Highlights
            </div>
            <div className={props.styles.highlightsWrapper}>
                {props.highlightsForApproval.map(x => (
                    <div className={props.styles.youTubeVid}>
                        <CustomYouTube
                            videoId={x.videoId}
                            opts={opts}
                            onReady={onReady}
                        />
                    </div>
                ))}
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
