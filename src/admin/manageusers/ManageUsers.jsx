import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import classNames from 'classnames';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import defaultStyles from './ManageUsers.module.scss';
import {
    fetchUsersWithExtraRolesRequest, addUserRoleRequest, removeUserRoleRequest,
    clearDatabaseRequest, rollOverToNextYearRequest,
    deleteAllOldUsersRequest
} from '../actions';
import Grid from '../../common/grid/Grid';
import StyledButton from '../../common/StyledButton/StyledButton';
import Dropdown from '../../common/dropdown/Dropdown';
import Menu from '../../common/menu/Menu';
import SuccessModal from '../../common/modal/SuccessModal';
import RolesToPermissions from './RolesToPermissions';
import ConfirmModal from '../../common/modal/ConfirmModal';
import TextInput from '../../common/TextInput/TextInput';
import * as textInputConstants from '../../common/TextInput/constants';
import materialStyles from '../../materialStyles';
import * as appConstants from '../../constants';

const columnsForAllUsers = allRoles => [
    {
        id: 'displayName',
        label: 'Display Name',
        align: 'center'
    },
    {
        id: 'email',
        label: 'Email',
        align: 'center'
    }
]
    .concat(allRoles.map(role => ({
        id: role,
        label: role,
        align: 'center'
    }))).concat({
        id: 'menu',
        label: '',
        align: 'right'
    });

const rolesForDropdown = allRoles => allRoles.map(role => ({
    id: role,
    value: role,
    text: role
}));

const ManageUsers = props => {
    const classes = makeStyles(materialStyles)();
    const isMobile = useMediaQuery(`(max-width:${appConstants.mobileScreenSize}px)`);
    useEffect(() => {
        props.fetchUsersWithExtraRolesRequest();
        // eslint-disable-next-line
    }, [props.fetchUsersWithExtraRolesRequest]);

    const [addRoleModalOpen, setAddRoleModalOpen] = useState(false);
    const [removeRoleModalOpen, setRemoveRoleModalOpen] = useState(false);
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');
    const [isRollingOverToNextYear, setIsRollingOverToNextYear] = useState(false);

    const closeModal = useCallback(() => {
        setEmail('');
        setRole('');
        setAddRoleModalOpen(false);
        setRemoveRoleModalOpen(false);
    }, []);

    const addUserRole = useCallback(() => {
        props.addUserRoleRequest(email, role);
        closeModal();
        // eslint-disable-next-line
    }, [props.addUserRoleRequest, email, role, closeModal]);

    const removeRole = useCallback(() => {
        props.removeUserRoleRequest(email, role);
        closeModal();
        // eslint-disable-next-line
    }, [email, role, closeModal]);

    const openRemoveRoleModal = useCallback((roleToRemove, userEmail) => {
        setEmail(userEmail);
        setRole(roleToRemove);
        setRemoveRoleModalOpen(true);
    }, []);

    const generateRow = row => {
        const rowToReturn = ({
            displayName: row.displayName,
            email: row.email,
            id: row.id
        });

        props.allRoles.forEach(r => {
            rowToReturn[r] = row.roles && row.roles.includes(r) ? <FiberManualRecordIcon color="primary" /> : '';
        });
        const options = [
            {
                id: 'removeAll',
                text: 'Remove all roles',
                value: 'ALL'
            }
        ].concat(row.roles.map(r => ({
            id: `remove${r}`,
            text: `Remove ${r}`,
            value: r
        })));
        rowToReturn.menu = (
            <Menu
                options={options}
                onClick={x => openRemoveRoleModal(x.value, row.email)}
            />
        );
        return rowToReturn;
    };

    const generateToggleRows = rows => rows.map(row => generateRow(row));

    const rollOver = useCallback(() => {
        props.rollOverToNextYearRequest();
        setIsRollingOverToNextYear(false);

        // eslint-disable-next-line
    }, [setIsRollingOverToNextYear, props.rollOverToNextYearRequest])

    return (
        <>
            <div className={props.styles.manageUsersWrapper}>
                <Paper
                    elevation={4}
                    className={classNames({
                        [classes.paper]: !isMobile,
                        [classes.paperMobile]: isMobile
                    })}
                >
                    <Grid
                        columns={columnsForAllUsers(props.allRoles)}
                        gridHeader={(
                            <div className={props.styles.manageUserGridHeaderWrapper}>
                                <div className={props.styles.gridHeaderText}>
                                    Users with extra roles
                                </div>
                                <div className={props.styles.addRoleButton}>
                                    <StyledButton
                                        text="Add Role"
                                        onClick={() => setAddRoleModalOpen(true)}
                                    />
                                </div>
                            </div>
                        )}
                        loading={props.fetchingUsersWithExtraRoles}
                        rows={generateToggleRows(props.usersWithExtraRoles)}
                    />
                </Paper>
                <Paper
                    elevation={4}
                    className={classNames({
                        [classes.paper]: !isMobile,
                        [classes.paperMobile]: isMobile
                    })}
                >
                    <RolesToPermissions
                        allRoles={props.allRoles}
                        permissionMappings={props.permissionMappings}
                    />
                </Paper>
                <SuccessModal
                    backdrop
                    closeModal={closeModal}
                    error
                    isOpen={addRoleModalOpen}
                    headerMessage="Add Role"
                >
                    <div className={props.styles.modalWrapper}>
                        <div>
                            <TextInput
                                label="Email"
                                onChange={setEmail}
                                value={email}
                                icon={textInputConstants.textInputIcons.email}
                                iconColor="primary"
                            />
                        </div>
                        <div className={props.styles.modalButtons}>
                            <Dropdown
                                value={role}
                                onChange={setRole}
                                options={rolesForDropdown(props.allRoles)}
                                title="Role"
                            />
                            <StyledButton
                                text="Confirm"
                                onClick={addUserRole}
                                disabled={!email || !role}
                            />
                            <StyledButton
                                text="Cancel"
                                color="secondary"
                                onClick={closeModal}
                            />
                        </div>
                    </div>
                </SuccessModal>
                <ConfirmModal
                    closeModal={closeModal}
                    isOpen={removeRoleModalOpen}
                    cancel={closeModal}
                    submit={removeRole}
                    text={`Are you sure you want to remove ${role === 'ALL' ? 'all roles ' : role} from ${email}`}
                />
                <Paper
                    elevation={4}
                    className={classNames({
                        [classes.paper]: !isMobile,
                        [classes.paperMobile]: isMobile
                    })}
                >
                    <div className={props.styles.yearFinishedMessage}>
                        When the year is finished, first delete all old users.
                        Wait a minute and then click roll over to next year
                    </div>
                    <div className={props.styles.yearFinishedButtons}>

                        <StyledButton
                            onClick={() => setIsRollingOverToNextYear(true)}
                            color="secondary"
                            text="Roll Over to Next Year"
                        />
                        <StyledButton
                            onClick={props.deleteAllOldUsersRequest}
                            color="secondary"
                            text="Delete all old users"
                        />
                    </div>
                </Paper>
            </div>
            <ConfirmModal
                cancel={() => setIsRollingOverToNextYear(false)}
                closeModal={() => setIsRollingOverToNextYear(false)}
                isButtonsDisabled={props.isRollingOverToNextYear}
                isLoading={props.isRollingOverToNextYear}
                isOpen={isRollingOverToNextYear || props.isRollingOverToNextYear}
                submit={rollOver}
                text="Roll over to next year?"
            />
        </>
    );
};

ManageUsers.defaultProps = {
    allRoles: [],
    fetchingUsersWithExtraRoles: false,
    isRollingOverToNextYear: false,
    styles: defaultStyles,
    usersWithExtraRoles: [],
    permissionMappings: {}
};

ManageUsers.propTypes = {
    allRoles: PropTypes.arrayOf(PropTypes.string),
    addUserRoleRequest: PropTypes.func.isRequired,
    deleteAllOldUsersRequest: PropTypes.func.isRequired,
    fetchingUsersWithExtraRoles: PropTypes.bool,
    fetchUsersWithExtraRolesRequest: PropTypes.func.isRequired,
    isRollingOverToNextYear: PropTypes.bool,
    removeUserRoleRequest: PropTypes.func.isRequired,
    rollOverToNextYearRequest: PropTypes.func.isRequired,
    styles: PropTypes.objectOf(PropTypes.string),
    usersWithExtraRoles: PropTypes.arrayOf(PropTypes.shape({
        roles: PropTypes.arrayOf(PropTypes.string),
        email: PropTypes.string,
        displayName: PropTypes.string
    })),
    permissionMappings: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.string))
};

const mapDispatchToProps = {
    addUserRoleRequest,
    clearDatabaseRequest,
    deleteAllOldUsersRequest,
    fetchUsersWithExtraRolesRequest,
    removeUserRoleRequest,
    rollOverToNextYearRequest
};

const mapStateToProps = state => ({
    allRoles: state.auth.allRoles,
    fetchingUsersWithExtraRoles: state.admin.fetchingUsersWithExtraRoles,
    isRollingOverToNextYear: state.admin.isRollingOverToNextYear,
    usersWithExtraRoles: state.admin.usersWithExtraRoles,
    permissionMappings: state.auth.permissionMappings
});

export default connect(mapStateToProps, mapDispatchToProps)(ManageUsers);

export { ManageUsers as ManageUsersUnconnected };
