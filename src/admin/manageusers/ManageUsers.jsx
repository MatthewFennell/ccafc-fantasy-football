import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import defaultStyles from './ManageUsers.module.scss';
import { fetchUsersWithExtraRolesRequest } from '../actions';
import Grid from '../../common/grid/Grid';

const columns = [
    {
        id: 'displayName',
        label: 'Display Name',
        align: 'center'
    },
    {
        id: 'email',
        label: 'Email',
        align: 'center'
    },
    {
        id: 'roles',
        label: 'Roles',
        align: 'center'
    }
];

const ManageUsers = props => {
    useEffect(() => {
        props.fetchUsersWithExtraRolesRequest();
    }, [props.fetchUsersWithExtraRolesRequest]);

    const generateRows = rows => rows.map(row => ({
        ...row,
        roles: row.roles.join(', ')
    }));

    return (
        <div className={props.styles.manageUsersWrapper}>
            <div className={props.styles.extraRolesWrapper}>
                <Grid
                    columns={columns}
                    gridHeader="Users with extra roles"
                    loading={props.fetchingUsersWithExtraRoles}
                    rows={generateRows(props.usersWithExtraRoles)}
                />
            </div>
        </div>
    );
};

ManageUsers.defaultProps = {
    fetchingUsersWithExtraRoles: false,
    styles: defaultStyles,
    usersWithExtraRoles: []
};

ManageUsers.propTypes = {
    fetchingUsersWithExtraRoles: PropTypes.bool,
    fetchUsersWithExtraRolesRequest: PropTypes.func.isRequired,
    styles: PropTypes.objectOf(PropTypes.string),
    usersWithExtraRoles: PropTypes.arrayOf(PropTypes.shape({
        roles: PropTypes.arrayOf(PropTypes.string),
        email: PropTypes.string,
        displayName: PropTypes.string
    }))
};

const mapDispatchToProps = {
    fetchUsersWithExtraRolesRequest
};

const mapStateToProps = state => ({
    fetchingUsersWithExtraRoles: state.admin.fetchingUsersWithExtraRoles,
    usersWithExtraRoles: state.admin.usersWithExtraRoles
});

export default connect(mapStateToProps, mapDispatchToProps)(ManageUsers);
