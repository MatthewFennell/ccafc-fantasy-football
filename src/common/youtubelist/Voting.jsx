import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import { noop } from 'lodash';
import defaultStyles from './Voting.module.scss';

const Voting = props => {
    const upvote = useCallback(() => {
        props.upvoteHighlightRequest(props.video.id);
    }, [props.upvoteHighlightRequest, props.video]);

    const downvote = useCallback(() => {
        props.downvoteHighlightRequest(props.video.id);
    }, [props.downvoteHighlightRequest, props.video]);


    return (
        <div className={props.styles.votingWrapper}>
            <div className={props.styles.upvoteIcon}>
                <ArrowUpwardIcon fontSize="large" color="secondary" onClick={upvote} />
            </div>
            <div className={props.styles.karma}>
                {`${props.video.upvotes.length - props.video.downvotes.length}`}
            </div>
            <div className={props.styles.downvoteIcon}>
                <ArrowDownwardIcon fontSize="large" color="primary" onClick={downvote} />
            </div>
        </div>
    );
};

Voting.defaultProps = {
    downvoteHighlightRequest: noop,
    styles: defaultStyles,
    upvoteHighlightRequest: noop,
    video: {
        downvotes: [],
        upvotes: []
    }
};

Voting.propTypes = {
    downvoteHighlightRequest: PropTypes.func,
    styles: PropTypes.objectOf(PropTypes.string),
    upvoteHighlightRequest: PropTypes.func,
    video: PropTypes.shape({
        id: PropTypes.string,
        upvotes: PropTypes.arrayOf(PropTypes.string),
        downvotes: PropTypes.arrayOf(PropTypes.string)
    })
};

export default Voting;
