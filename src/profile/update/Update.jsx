import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { noop } from 'lodash';
import classNames from 'classnames';
import defaultStyles from './Update.module.scss';
import StyledButton from '../../common/StyledButton/StyledButton';
import Spinner from '../../common/spinner/Spinner';
import TextInput from '../../common/TextInput/TextInput';

const Update = props => {
    const [displayName, setDisplayName] = useState('');

    const update = useCallback(() => {
        props.updateRequest(displayName);
        // eslint-disable-next-line
    }, [displayName, props.updateRequest]);

    return (
        <div className={props.styles.updateWrapper}>
            <TextInput
                label={props.property}
                onChange={setDisplayName}
                value={displayName}
                icon={props.icon}
                iconColor="secondary"
            />
            <StyledButton
                color="primary"
                onClick={update}
                text={`Update ${props.property}`}
                disabled={props.loading}
            />
            <div className={classNames({
                [props.styles.hidden]: !props.loading
            })}
            >
                <Spinner color="secondary" />
            </div>
        </div>
    );
};

Update.defaultProps = {
    icon: '',
    styles: defaultStyles,
    updateRequest: noop,
    loading: false,
    property: ''
};

Update.propTypes = {
    icon: PropTypes.string,
    styles: PropTypes.objectOf(PropTypes.string),
    updateRequest: PropTypes.func,
    loading: PropTypes.bool,
    property: PropTypes.string
};

export default Update;
