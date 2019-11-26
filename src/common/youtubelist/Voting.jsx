import React from 'react';
import PropTypes from 'prop-types';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import { noop } from 'lodash';
import defaultStyles from './Voting.module.scss';

const Voting = props => (
    <div className={props.styles.votingWrapper}>
        <div className={props.styles.upvoteIcon}>
            <ArrowUpwardIcon fontSize="large" color="secondary" onClick={props.upvote} />
        </div>
        <div className={props.styles.karma}>
            {`${props.video.upvotes.length - props.video.downvotes.length}`}
        </div>
        <div className={props.styles.downvoteIcon}>
            <ArrowDownwardIcon fontSize="large" color="primary" onClick={props.downvote} />
        </div>
    </div>
);

Voting.defaultProps = {
    downvote: noop,
    styles: defaultStyles,
    upvote: noop,
    video: {
        downvotes: [],
        upvotes: []
    }
};

Voting.propTypes = {
    downvote: PropTypes.func,
    styles: PropTypes.objectOf(PropTypes.string),
    upvote: PropTypes.func,
    video: PropTypes.shape({
        upvotes: PropTypes.arrayOf(PropTypes.string),
        downvotes: PropTypes.arrayOf(PropTypes.string)
    })
};

export default Voting;
