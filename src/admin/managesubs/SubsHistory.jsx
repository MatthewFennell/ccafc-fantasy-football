import React from 'react';
import PropTypes from 'prop-types';
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
import defaultStyles from './SubsHistory.module.scss';
import Update from './Update';

const SubsHistory = props => (
    <div className={props.styles.updatesWrapper}>
        <div className={props.styles.iconInfo}>
            <div className={props.styles.tickInfo}>
                <div className={props.styles.checkIcon}><CheckIcon /></div>
                <div className={props.styles.checkText}>Changed to have paid</div>
            </div>
            <div className={props.styles.crossInfo}>
                <div className={props.styles.crossIcon}><ClearIcon /></div>
                <div className={props.styles.crossText}>Changed to have not paid</div>
            </div>
        </div>
        {props.subsHistory.map(history => (
            <Update
                author={history.author}
                date={history.date}
                haveNotPaid={history.haveNotPaid}
                havePaid={history.havePaid}
            />
        ))}

    </div>
);

SubsHistory.defaultProps = {
    styles: defaultStyles,
    subsHistory: []
};

SubsHistory.propTypes = {
    styles: PropTypes.objectOf(PropTypes.string),
    subsHistory: PropTypes.arrayOf(PropTypes.shape({
        haveNotPaid: PropTypes.arrayOf(PropTypes.string),
        havePaid: PropTypes.arrayOf(PropTypes.string)
    }))
};

export default SubsHistory;
