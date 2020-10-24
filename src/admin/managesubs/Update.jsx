import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
import defaultStyles from './Update.module.scss';

const generateTime = date => moment(new Date(date.seconds * 1000)).format('MMM Do YYYY, h:mm:ss a');

const Update = props => (
    <div className={props.styles.updateWrapper}>
        <div className={props.styles.authorWrapper}>
            <div>
                {`${generateTime(props.date)}`}
            </div>
            <div>
                {props.author.displayName}
            </div>
            <div>
                {props.author.email}
            </div>
        </div>
        <div className={props.styles.playersWrapper}>
            {props.havePaid && props.havePaid.length > 0 && (
                <div className={props.styles.playersPaid}>
                    <div className={props.styles.tick}>
                        <CheckIcon fontSize="large" />
                    </div>
                    <div className={props.styles.playerList}>
                        {props.havePaid.toString()}
                    </div>
                </div>
            )}
            {props.haveNotPaid && props.haveNotPaid.length > 0
            && (
                <div className={props.styles.playersNotPaid}>
                    <div className={props.styles.cross}>
                        <ClearIcon fontSize="large" />
                    </div>
                    <div className={props.styles.playerList}>
                        {props.haveNotPaid.toString()}
                    </div>
                </div>
            )}
        </div>
    </div>
);

Update.defaultProps = {
    author: {
        displayName: '',
        email: '',
        uid: ''
    },
    date: null,
    haveNotPaid: [],
    havePaid: [],
    styles: defaultStyles
};

Update.propTypes = {
    author: {
        displayName: PropTypes.string,
        email: PropTypes.string,
        uid: PropTypes.string
    },
    date: PropTypes.objectOf(PropTypes.shape({})),
    haveNotPaid: PropTypes.arrayOf(PropTypes.string),
    havePaid: PropTypes.arrayOf(PropTypes.string),
    styles: PropTypes.objectOf(PropTypes.string)
};

export default Update;
