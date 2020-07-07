import React from 'react';
import { noop } from 'lodash';
import moment from 'moment';
import DeleteIcon from '@material-ui/icons/Delete';
import PropTypes from 'prop-types';
import defaultStyles from './Bug.module.scss';
import FadingCollapsable from '../../common/fadingCollapsable/FadingCollapsable';

// eslint-disable-next-line no-underscore-dangle
const generateTime = date => moment(new Date(date.seconds * 1000)).startOf('second').fromNow();

const Bug = props => (
    <div key={props.id}>
        <FadingCollapsable
            title={<div className={props.styles.bugTitle}>{`Submitted by ${props.displayName}`}</div>}
        >
            <div className={props.styles.bugWrapper}>
                <div className={props.styles.bugInfo}>
                    <div>{'Submitted by: '}</div>

                    <div className={props.styles.bugValue}>
                        <div>{props.displayName}</div>
                    </div>
                </div>
                <div className={props.styles.bugInfo}>
                    <div>{'Time Submitted: '}</div>

                    <div className={props.styles.bugValue}>
                        <div>{generateTime(props.dateCreated)}</div>
                    </div>
                </div>
                <div>
                    <div className={props.styles.descriptionKey}>
                        Description
                    </div>
                    <div className={props.styles.descriptionValue}>
                        {props.description}
                    </div>
                </div>
                <div
                    className={props.styles.deleteBug}
                    onClick={() => props.setBugIdToDelete(props.id)}
                    role="button"
                    tabIndex={0}
                >
                    <DeleteIcon fontSize="large" color="primary" />
                </div>
            </div>
        </FadingCollapsable>
    </div>
);

Bug.defaultProps = {
    dateCreated: {},
    description: '',
    displayName: '',
    id: '',
    setBugIdToDelete: noop,
    styles: defaultStyles
};

Bug.propTypes = {
    dateCreated: PropTypes.shape({}),
    description: PropTypes.string,
    displayName: PropTypes.string,
    id: PropTypes.string,
    setBugIdToDelete: PropTypes.func,
    styles: PropTypes.objectOf(PropTypes.string)
};

export default Bug;
