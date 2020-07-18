import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import { noop } from 'lodash';
import defaultStyles from './Voting.module.scss';
import LoadingDiv from '../loadingDiv/LoadingDiv';

const formatKarma = video => {
    const val = video.upvotes.length - video.downvotes.length;
    if (val >= 0) {
        return `+${val}`;
    }
    return val;
};

const Voting = props => {
    const upvote = useCallback(() => {
        if (!props.video.upvotes.includes(props.authId)) {
            props.upvoteHighlightRequest(props.video.id);
        }
        // eslint-disable-next-line
    }, [props.upvoteHighlightRequest, props.video, props.authId]);

    const downvote = useCallback(() => {
        if (!props.video.downvotes.includes(props.authId)) {
            props.downvoteHighlightRequest(props.video.id);
        }
        // eslint-disable-next-line
    }, [props.downvoteHighlightRequest, props.video, props.authId]);

    return (
        <div className={props.styles.votingWrapper}>
            <LoadingDiv isLoading={props.isBeingVotedOn} isPadding isMargin>

                <div className={props.styles.upvoteIcon}>
                    <ArrowUpwardIcon fontSize="large" color="secondary" onClick={upvote} />
                </div>
                <div className={props.styles.karma}>
                    {formatKarma(props.video)}
                </div>
                <div className={props.styles.downvoteIcon}>
                    <ArrowDownwardIcon fontSize="large" color="primary" onClick={downvote} />
                </div>
            </LoadingDiv>
        </div>
    );
};

Voting.defaultProps = {
    authId: '',
    downvoteHighlightRequest: noop,
    isBeingVotedOn: false,
    styles: defaultStyles,
    upvoteHighlightRequest: noop,
    video: {
        downvotes: [],
        upvotes: []
    }
};

Voting.propTypes = {
    authId: PropTypes.string,
    downvoteHighlightRequest: PropTypes.func,
    isBeingVotedOn: PropTypes.bool,
    styles: PropTypes.objectOf(PropTypes.string),
    upvoteHighlightRequest: PropTypes.func,
    video: PropTypes.shape({
        id: PropTypes.string,
        upvotes: PropTypes.arrayOf(PropTypes.string),
        downvotes: PropTypes.arrayOf(PropTypes.string)
    })
};

export default Voting;
