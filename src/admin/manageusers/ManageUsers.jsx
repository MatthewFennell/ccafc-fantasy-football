import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import defaultStyles from './ManageUsers.module.scss';
import {
    fetchUsersWithExtraRolesRequest, addUserRoleRequest, removeUserRoleRequest
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
    const [removeRoleModalOpen, setRemoveRoleModalOpen] = useState(false);
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');

    const addUserRole = useCallback(() => {
        props.addUserRoleRequest(email, role);
        setEmail('');
        setRole('');
        setAddRoleModalOpen(false);
    }, [props.addUserRoleRequest, email, role]);

    const removeUserRole = useCallback(() => {
        props.removeUserRoleRequest(email, role);
        setEmail('');
        setRole('');
        setAddRoleModalOpen(false);
        setRemoveRoleModalOpen(false);
    }, [props.removeUserRoleRequest, email, role]);

    const closeModal = useCallback(() => {
        setEmail('');
        setRole('');
        setAddRoleModalOpen(false);
        setRemoveRoleModalOpen(false);
    }, [email, role, addRoleModalOpen]);

    const generateRow = row => {
        const rowToReturn = ({
            displayName: row.displayName,
            email: row.email,
            id: row.id
        });

        Object.values(constants.ROLES).forEach(r => {
            rowToReturn[r] = row.roles && row.roles.includes(r) ? <FiberManualRecordIcon color="secondary" /> : '';
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
                                <StyledButton color="secondary" text="Remove Role" onClick={() => setRemoveRoleModalOpen(true)} />
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
                        <StyledButton text="Confirm" onClick={addUserRole} />
                        <StyledButton text="Cancel" color="secondary" onClick={closeModal} />
                    </div>
                </div>
            </StyledModal>
            <StyledModal
                backdrop
                closeModal={closeModal}
                error
                isOpen={removeRoleModalOpen}
                headerMessage="Remove Role"
            >
                <div className={props.styles.modalWrapper}>
                    <div><StyledInput label="Email" onChange={setEmail} value={email} /></div>
                    <div className={props.styles.modalButtons}>
                        <Dropdown activeValue={role} onChange={setRole} options={rolesForDropdown} title="Role" />
                        <StyledButton text="Confirm" onClick={removeUserRole} />
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
    removeUserRoleRequest: PropTypes.func.isRequired,
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
    removeUserRoleRequest
};

const mapStateToProps = state => ({
    fetchingUsersWithExtraRoles: state.admin.fetchingUsersWithExtraRoles,
    usersWithExtraRoles: state.admin.usersWithExtraRoles
});

export default connect(mapStateToProps, mapDispatchToProps)(ManageUsers);
