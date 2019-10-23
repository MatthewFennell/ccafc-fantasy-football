import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import defaultStyles from './ManageUsers.module.scss';
import {
    fetchUsersWithExtraRolesRequest, addUserRoleRequest, removeUserRoleRequest,
    closeRemoveUserRoleError
} from '../actions';
import Grid from '../../common/grid/Grid';
import * as constants from '../../constants';
import StyledButton from '../../common/StyledButton/StyledButton';
import StyledModal from '../../common/modal/StyledModal';
import StyledInput from '../../common/StyledInput/StyledInput';
import Dropdown from '../../common/dropdown/Dropdown';
import Menu from '../../common/menu/Menu';
import ConfirmModal from '../../common/modal/ConfirmModal';
import ErrorModal from '../../common/modal/ErrorModal';
import RolesToPermissions from './RolesToPermissions';

const columnsForAllUsers = [
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

].concat(Object.values(constants.ROLES).map(role => ({
    id: role,
    label: role,
    align: 'center'
}))).concat({
    id: 'menu',
    label: '',
    align: 'right'
});

const rolesForDropdown = Object.values(constants.ROLES).map(role => ({
    id: role,
    value: role,
    text: role
}));

const ManageUsers = props => {
    useEffect(() => {
        props.fetchUsersWithExtraRolesRequest();
    }, [props.fetchUsersWithExtraRolesRequest]);

    const [addRoleModalOpen, setAddRoleModalOpen] = useState(false);
    const [removeRoleModalOpen, setRemoveRoleModalOpen] = useState(false);
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');

    const closeModal = useCallback(() => {
        setEmail('');
        setRole('');
        setAddRoleModalOpen(false);
        setRemoveRoleModalOpen(false);
    }, [email, role, addRoleModalOpen, removeRoleModalOpen]);

    const addUserRole = useCallback(() => {
        props.addUserRoleRequest(email, role);
        closeModal();
    }, [props.addUserRoleRequest, email, role]);


    const removeRole = useCallback(() => {
        props.removeUserRoleRequest(email, role);
        closeModal();
    });

    const openRemoveRoleModal = useCallback((roleToRemove, userEmail) => {
        setEmail(userEmail);
        setRole(roleToRemove);
        setRemoveRoleModalOpen(true);
    }, [role, email, removeRoleModalOpen]);

    const generateRow = row => {
        const rowToReturn = ({
            displayName: row.displayName,
            email: row.email,
            id: row.id
        });

        Object.values(constants.ROLES).forEach(r => {
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

    return (
        <div className={props.styles.manageUsersWrapper}>
            <div className={props.styles.extraRolesWrapper}>
                <Grid
                    columns={columnsForAllUsers}
                    gridHeader={(
                        <div className={props.styles.manageUserGridHeaderWrapper}>
                            <div className={props.styles.gridHeaderText}>
                            Users with extra roles
                            </div>
                            <div className={props.styles.addRoleButton}>
                                <StyledButton text="Add Role" onClick={() => setAddRoleModalOpen(true)} />
                            </div>
                        </div>
                    )}
                    loading={props.fetchingUsersWithExtraRoles}
                    rows={generateToggleRows(props.usersWithExtraRoles)}
                />
            </div>
            <div className={props.styles.rolesToPermissionsWrapper}>
                <RolesToPermissions permissionMappings={props.permissionMappings} />
            </div>
            <StyledModal
                backdrop
                closeModal={closeModal}
                error
                isOpen={addRoleModalOpen}
                headerMessage="Add Role"
            >
                <div className={props.styles.modalWrapper}>
                    <div><StyledInput label="Email" onChange={setEmail} value={email} /></div>
                    <div className={props.styles.modalButtons}>
                        <Dropdown activeValue={role} onChange={setRole} options={rolesForDropdown} title="Role" />
                        <StyledButton text="Confirm" onClick={addUserRole} />
                        <StyledButton text="Cancel" color="secondary" onClick={closeModal} />
                    </div>
                </div>
            </StyledModal>
            <ConfirmModal
                cancel={closeModal}
                closeModal={closeModal}
                isOpen={removeRoleModalOpen}
                submit={removeRole}
                text={`Are you sure you want to remove ${role === 'ALL' ? 'all roles ' : role} from ${email}`}
            />
            <ErrorModal
                closeModal={props.closeRemoveUserRoleError}
                headerMessage="Remove Role Error"
                isOpen={props.removeUserRoleError.length > 0}
                errorCode={props.removeUserRoleErrorCode}
                errorMessage={props.removeUserRoleError}
            />
        </div>
    );
};

ManageUsers.defaultProps = {
    fetchingUsersWithExtraRoles: false,
    removeUserRoleError: '',
    removeUserRoleErrorCode: '',
    styles: defaultStyles,
    usersWithExtraRoles: [],
    permissionMappings: {}
};

ManageUsers.propTypes = {
    addUserRoleRequest: PropTypes.func.isRequired,
    closeRemoveUserRoleError: PropTypes.func.isRequired,
    fetchingUsersWithExtraRoles: PropTypes.bool,
    fetchUsersWithExtraRolesRequest: PropTypes.func.isRequired,
    removeUserRoleRequest: PropTypes.func.isRequired,
    removeUserRoleError: PropTypes.string,
    removeUserRoleErrorCode: PropTypes.string,
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
    closeRemoveUserRoleError,
    fetchUsersWithExtraRolesRequest,
    removeUserRoleRequest
};

const mapStateToProps = state => ({
    fetchingUsersWithExtraRoles: state.admin.fetchingUsersWithExtraRoles,
    removeUserRoleError: state.admin.removeUserRoleError,
    removeUserRoleErrorCode: state.admin.removeUserRoleErrorCode,
    usersWithExtraRoles: state.admin.usersWithExtraRoles,
    permissionMappings: state.auth.permissionMappings
});

export default connect(mapStateToProps, mapDispatchToProps)(ManageUsers);
