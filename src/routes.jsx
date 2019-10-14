import React from 'react';

import PersonAddIcon from '@material-ui/icons/PersonAdd';
import DoubleArrowIcon from '@material-ui/icons/DoubleArrow';
import DetailsIcon from '@material-ui/icons/Details';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import GradeIcon from '@material-ui/icons/Grade';
import LayersIcon from '@material-ui/icons/Layers';
import DeleteIcon from '@material-ui/icons/Delete';

import fp from 'lodash/fp';
import CreatePlayer from './admin/createplayer/CreatePlayer';
import CreateTeam from './admin/createteam/CreateTeam';
import SubmitResult from './admin/submitresult/SubmitResult';
import DeletePlayer from './admin/deleteplayer/DeletePlayer';
import SignIn from './auth/SignIn';
import SignUp from './auth/SignUp';
import DeleteTeam from './admin/deleteteam/DeleteTeam';
import Points from './points/Points';

import Overview from './overview/Overview';
import Leagues from './leagues/Leagues';

import * as constants from './constants';
import CurrentTeam from './currentteam/CurrentTeam';

export const adminLinks = [
    {
        title: 'Create Player',
        path: constants.ADMIN_URL.CREATE_PLAYER,
        icon: <PersonAddIcon />,
        component: CreatePlayer,
        newPath: () => constants.ADMIN_URL.CREATE_PLAYER
    },
    {
        title: 'Delete Player',
        path: constants.ADMIN_URL.DELETE_PLAYER,
        icon: <DeleteIcon />,
        component: DeletePlayer,
        newPath: () => constants.ADMIN_URL.DELETE_PLAYER
    },
    {
        title: 'Create Team',
        path: constants.ADMIN_URL.CREATE_TEAM,
        icon: <PersonAddIcon />,
        component: CreateTeam,
        newPath: () => constants.ADMIN_URL.CREATE_TEAM
    },
    {
        title: 'Delete Team',
        path: constants.ADMIN_URL.DELETE_TEAM,
        icon: <DeleteIcon />,
        component: DeleteTeam,
        newPath: () => constants.ADMIN_URL.DELETE_TEAM
    },
    {
        title: 'Submit Result',
        path: constants.ADMIN_URL.SUBMIT_RESULT,
        icon: <PersonAddIcon />,
        component: SubmitResult,
        newPath: () => constants.ADMIN_URL.SUBMIT_RESULT
    }

];

export const signedOutLinks = [
    {
        title: 'Sign In',
        path: constants.URL.SIGN_IN,
        icon: <DoubleArrowIcon />,
        component: SignIn,
        newPath: () => constants.URL.SIGN_IN
    },
    {
        title: 'Sign Up',
        path: constants.URL.SIGN_UP,
        icon: <AccountBoxIcon />,
        component: SignUp,
        newPath: () => constants.URL.SIGN_UP
    }
];

export const signedInLinks = [
    {
        title: 'Overview',
        path: constants.URL.OVERVIEW,
        icon: <DetailsIcon />,
        component: Overview,
        addUserId: false,
        newPath: props => `${constants.URL.OVERVIEW}/${fp.get('userId')(props)}/${fp.get('maxGameWeek')(props)}`
    },
    {
        title: 'Current Team',
        path: constants.URL.CURRENT_TEAM,
        icon: <PeopleAltIcon />,
        component: CurrentTeam,
        addUserId: true,
        newPath: props => `${constants.URL.SIGN_IN}/${fp.get('userId')(props)}`
    },
    {
        title: 'Transfers',
        path: '/transfers',
        icon: <PersonAddIcon />,
        component: Overview,
        addUserId: false,
        newPath: () => constants.URL.OVERVIEW
    },
    {
        title: 'Points',
        path: '/points',
        icon: <GradeIcon />,
        component: Points,
        addUserId: false,
        newPath: props => `${constants.URL.POINTS}/${fp.get('userId')(props)}/${fp.get('week')(props)}`
    },
    {
        title: 'Leagues',
        path: constants.URL.LEAGUES,
        icon: <LayersIcon />,
        component: Leagues,
        addUserId: false,
        newPath: () => constants.URL.LEAGUES
    }
];
