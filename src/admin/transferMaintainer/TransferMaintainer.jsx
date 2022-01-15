import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import classNames from 'classnames';
import { noop } from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import LoadingDiv from '../../common/loadingDiv/LoadingDiv';
import StyledButton from '../../common/StyledButton/StyledButton';
import * as textInputConstants from '../../common/TextInput/constants';
import TextInput from '../../common/TextInput/TextInput';
import * as appConstants from '../../constants';
import materialStyles from '../../materialStyles';
import { transferMaintainerRequest } from '../actions';
import defaultStyles from './TransferMaintainer.module.scss';

const TransferMaintainer = props => {
    const classes = makeStyles(materialStyles)();
    const isMobile = useMediaQuery(`(max-width:${appConstants.mobileScreenSize}px)`);

    const [email, setEmail] = React.useState('');

    const onTransferMaintainer = () => {
        props.transferMaintainerRequest(email);
    };

    return (
        <Paper
            elevation={4}
            className={classNames({
                [classes.paper]: !isMobile,
                [classes.paperMobile]: isMobile
            })}
        >
            <div className={props.styles.transferMaintainerWrapper}>
                Transfer Ownership
                <div>
                    <TextInput
                        value={email}
                        onChange={setEmail}
                        icon={textInputConstants.textInputIcons.email}
                        iconColor="secondary"
                    />
                </div>

                <div className={props.styles.confirmTransferButton}>
                    <LoadingDiv
                        isLoading={props.isTransferingMaintainer}
                        isBorderRadius
                        isFitContent
                    >
                        <StyledButton text="Confirm" disabled={!email || props.isTransferingMaintainer} onClick={onTransferMaintainer} />
                    </LoadingDiv>
                </div>

                <div>
                    This will log you out and remove your permissions. Please do this before
                    {' '}
                    <b>August 1st</b>
                    .
                    The new maintainer will need to log out and log back in to receive
                    the permissions.
                </div>
            </div>

        </Paper>
    );
};

TransferMaintainer.defaultProps = {
    isTransferingMaintainer: false,
    styles: defaultStyles,
    transferMaintainerRequest: noop
};

TransferMaintainer.propTypes = {
    isTransferingMaintainer: PropTypes.bool,
    styles: PropTypes.objectOf(PropTypes.string),
    transferMaintainerRequest: PropTypes.func
};

const mapDispatchToProps = {
    transferMaintainerRequest
};

const mapStateToProps = state => ({
    allTeams: state.admin.allTeams,
    isTransferingMaintainer: state.admin.isTransferingMaintainer
});

export default connect(mapStateToProps, mapDispatchToProps)(TransferMaintainer);

export { TransferMaintainer as TransferMaintainerUnconnected };
