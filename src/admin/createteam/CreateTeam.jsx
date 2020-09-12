import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import defaultStyles from './CreateTeam.module.scss';
import { createTeamRequest } from '../actions';
import StyledButton from '../../common/StyledButton/StyledButton';
import Spinner from '../../common/spinner/Spinner';
import TextInput from '../../common/TextInput/TextInput';
import materialStyles from '../../materialStyles';
import * as appConstants from '../../constants';

const CreateTeam = props => {
    const classes = makeStyles(materialStyles)();
    const isMobile = useMediaQuery(`(max-width:${appConstants.mobileScreenSize}px)`);
    const [teamName, setTeamName] = useState('');

    const createTeam = useCallback(() => {
        props.createTeamRequest(teamName);
        setTeamName('');
        // eslint-disable-next-line
    }, [teamName, props.createTeamRequest]);

    return (
        <Paper
            elevation={4}
            className={classNames({
                [classes.paper]: !isMobile,
                [classes.paperMobile]: isMobile
            })}
        >
            <div className={props.styles.createTeamHeader}>
                <StyledButton
                    color="primary"
                    onClick={createTeam}
                    text="Create Team"
                    disabled={!teamName}
                />
            </div>
            <div className={props.styles.createTeamForm}>
                <TextInput
                    label="Team Name"
                    onChange={setTeamName}
                    value={teamName}
                />
            </div>
            <div className={classNames({
                [props.styles.hidden]: !props.creatingTeam
            })}
            >
                <Spinner color="secondary" />
            </div>
        </Paper>
    );
};

CreateTeam.defaultProps = {
    styles: defaultStyles
};

CreateTeam.propTypes = {
    creatingTeam: PropTypes.bool.isRequired,
    createTeamRequest: PropTypes.func.isRequired,
    styles: PropTypes.objectOf(PropTypes.string)
};

const mapDispatchToProps = {
    createTeamRequest
};

const mapStateToProps = state => ({
    creatingTeam: state.admin.creatingTeam
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateTeam);

export { CreateTeam as CreateTeamUnconnected };
