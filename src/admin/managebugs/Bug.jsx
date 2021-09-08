import DeleteIcon from '@material-ui/icons/Delete';
import { noop } from 'lodash';
import moment from 'moment';
import PropTypes from 'prop-types';
import React from 'react';
import FadingCollapsable from '../../common/fadingCollapsable/FadingCollapsable';
import defaultStyles from './Bug.module.scss';

// eslint-disable-next-line no-underscore-dangle
const generateTime = date => moment(new Date(date.seconds * 1000)).startOf('second').fromNow();

const BugDetails = props => (
    <div
        className={props.styles.bugWrapper}
        onClick={() => props.setIsCollapsableOpen(false)}
        role="button"
        tabIndex={0}
    >
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
            onClick={e => {
                e.stopPropagation();
                props.setBugIdToDelete(props.id);
            }}
            role="button"
            tabIndex={0}
        >
            <DeleteIcon fontSize="large" color="primary" />
        </div>
    </div>
);

const BugTitle = props => (
    <div
        className={props.styles.bugTitle}
        onClick={() => props.setIsCollapsableOpen(true)}
        role="button"
        tabIndex={0}
    >
        {`Submitted by ${props.displayName}`}

    </div>
);

BugDetails.defaultProps = {
    dateCreated: {},
    description: '',
    displayName: '',
    id: '',
    setBugIdToDelete: noop,
    setIsCollapsableOpen: noop,
    styles: defaultStyles
};

BugDetails.propTypes = {
    dateCreated: PropTypes.shape({}),
    description: PropTypes.string,
    displayName: PropTypes.string,
    id: PropTypes.string,
    setBugIdToDelete: PropTypes.func,
    setIsCollapsableOpen: PropTypes.func,
    styles: PropTypes.objectOf(PropTypes.string)
};

BugTitle.defaultProps = {
    displayName: '',
    setIsCollapsableOpen: noop,
    styles: defaultStyles
};

BugTitle.propTypes = {
    displayName: PropTypes.string,
    setIsCollapsableOpen: PropTypes.func,
    styles: PropTypes.objectOf(PropTypes.string)
};

const Bug = props => (
    <div key={props.id}>
        <FadingCollapsable
            isBorderRadiusTiny
            title={<BugTitle displayName={props.displayName} />}
        >
            <BugDetails
                dateCreated={props.dateCreated}
                description={props.description}
                displayName={props.displayName}
                id={props.id}
                setBugIdToDelete={props.setBugIdToDelete}
                styles={props.styles}
            />
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
