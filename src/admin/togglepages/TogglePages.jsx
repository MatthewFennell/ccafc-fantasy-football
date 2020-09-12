import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _, { noop } from 'lodash';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import * as routes from '../../routes';
import defaultStyles from './TogglePages.module.scss';
import Switch from '../../common/Switch/Switch';
import { editDisabledPageRequest } from '../../auth/actions';
import LoadingDiv from '../../common/loadingDiv/LoadingDiv';
import materialStyles from '../../materialStyles';
import * as appConstants from '../../constants';

const getDisabledPages = appInfo => _.get(appInfo, [appConstants.APPLICATION_INFO_ID, 'disabledPages']) || [];

const TogglePages = props => {
    const classes = makeStyles(materialStyles)();
    return (
        <Paper
            elevation={4}
            className={classes.paper}
        >
            <div className={props.styles.headerMessage}>
                These are the active pages
            </div>

            <div className={props.styles.routesWrapper}>
                {routes.signedInLinks.map(route => (
                    <LoadingDiv
                        isLoading={route.title === props.isEditingPage}
                        isBorderRadius
                        isRed
                        key={route.title}
                    >
                        <div className={props.styles.optionWrapper} key={route.title}>
                            <div>
                                {route.title}
                            </div>
                            <Switch
                                color="primary"
                                checked={!props.disabledPages.includes(route.title)}
                                onChange={() => props.editDisabledPageRequest(route.title,
                                    !props.disabledPages.includes(route.title))}
                                disabled={!route.canToggle}
                            />
                        </div>
                    </LoadingDiv>
                ))}
            </div>
        </Paper>
    );
};

TogglePages.defaultProps = {
    disabledPages: [],
    editDisabledPageRequest: noop,
    isEditingPage: '',
    styles: defaultStyles
};

TogglePages.propTypes = {
    disabledPages: PropTypes.arrayOf(PropTypes.string),
    editDisabledPageRequest: PropTypes.func,
    isEditingPage: PropTypes.string,
    styles: PropTypes.objectOf(PropTypes.string)
};

const mapDispatchToProps = {
    editDisabledPageRequest
};

const mapStateToProps = state => ({
    disabledPages: getDisabledPages(state.firestore.data.appInfo),
    isEditingPage: state.auth.isEditingPage
});

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect(() => [
        {
            collection: 'application-info',
            storeAs: 'appInfo'
        }
    ])
)(TogglePages);

const connected = connect(mapStateToProps, mapDispatchToProps)(TogglePages);

export { connected as TogglePagesConnected };

export { TogglePages as TogglePagesUnconnected };
