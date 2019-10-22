import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import defaultStyles from './ManageUsers.module.scss';
import {
    fetchUsersWithExtraRolesRequest, addUserRoleRequest, removeUserRole
} from '../actions';
import Grid from '../../common/grid/Grid';
import * as constants from '../../constants';
import StyledButton from '../../common/StyledButton/StyledButton';
import StyledModal from '../../common/modal/StyledModal';
import StyledInput from '../../common/StyledInput/StyledInput';
import Dropdown from '../../common/dropdown/Dropdown';

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
})));

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
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');

    // const changePermissionRequest = (row, role) => {
    //     if (row.roles && row.roles.includes(role)) {
    //         props.removeUserRole(row.id, role);
    //     } else {
    //         props.addUserRoleRequest(row.id, role);
    //     }
    // };

    const closeModal = useCallback(() => {
        setEmail('');
        setRole('');
        setAddRoleModalOpen(false);
    }, [email, role, addRoleModalOpen]);

    const generateRow = row => {
        const rowToReturn = ({
            displayName: row.displayName,
            email: row.email,
            id: row.id
        });

        Object.values(constants.ROLES).forEach(role => {
            rowToReturn[role] = row.roles && row.roles.includes(role) ? <FiberManualRecordIcon color="secondary" /> : '';
        });
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
                        <StyledButton text="Confirm" />
                        <StyledButton text="Cancel" color="secondary" onClick={closeModal} />
                    </div>
                </div>
            </StyledModal>
        </div>
    );
};

ManageUsers.defaultProps = {
    fetchingUsersWithExtraRoles: false,
    styles: defaultStyles,
    usersWithExtraRoles: []
};

ManageUsers.propTypes = {
    addUserRoleRequest: PropTypes.func.isRequired,
    fetchingUsersWithExtraRoles: PropTypes.bool,
    fetchUsersWithExtraRolesRequest: PropTypes.func.isRequired,
    removeUserRole: PropTypes.func.isRequired,
    styles: PropTypes.objectOf(PropTypes.string),
    usersWithExtraRoles: PropTypes.arrayOf(PropTypes.shape({
        roles: PropTypes.arrayOf(PropTypes.string),
        email: PropTypes.string,
        displayName: PropTypes.string
    }))
};

const mapDispatchToProps = {
    addUserRoleRequest,
    fetchUsersWithExtraRolesRequest,
    removeUserRole
};

const mapStateToProps = state => ({
    fetchingUsersWithExtraRoles: state.admin.fetchingUsersWithExtraRoles,
    usersWithExtraRoles: state.admin.usersWithExtraRoles
});

export default connect(mapStateToProps, mapDispatchToProps)(ManageUsers);
