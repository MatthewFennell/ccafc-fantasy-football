import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import { noop } from 'lodash';
import PropTypes from 'prop-types';
import React, { useCallback, useState } from 'react';
import Spinner from '../../common/spinner/Spinner';
import StyledButton from '../../common/StyledButton/StyledButton';
import TextInput from '../../common/TextInput/TextInput';
import materialStyles from '../../materialStyles';
import defaultStyles from './Update.module.scss';

const Update = props => {
    const classes = makeStyles(materialStyles)();
    const [displayName, setDisplayName] = useState('');

    const update = useCallback(() => {
        props.updateRequest(displayName);
        // eslint-disable-next-line
    }, [displayName, props.updateRequest]);

    return (
        <Paper
            elevation={4}
            className={classes.paper}
        >
            <TextInput
                label={props.property}
                onChange={setDisplayName}
                value={displayName}
                icon={props.icon}
                iconColor="secondary"
                onSubmit={update}
            />
            <StyledButton
                color="primary"
                onClick={update}
                text={`Update ${props.property}`}
                disabled={props.loading || !displayName}
            />
            <div className={classNames({
                [props.styles.hidden]: !props.loading
            })}
            >
                <Spinner color="secondary" />
            </div>
        </Paper>
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
