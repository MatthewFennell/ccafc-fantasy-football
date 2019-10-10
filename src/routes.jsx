import React from 'react';

import PersonAddIcon from '@material-ui/icons/PersonAdd';
import DoubleArrowIcon from '@material-ui/icons/DoubleArrow';
import DetailsIcon from '@material-ui/icons/Details';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import GradeIcon from '@material-ui/icons/Grade';
import LayersIcon from '@material-ui/icons/Layers';
import DeleteIcon from '@material-ui/icons/Delete';

import CreatePlayer from './admin/createplayer/CreatePlayer';
import CreateTeam from './admin/createteam/CreateTeam';
import SubmitResult from './admin/submitresult/SubmitResult';
import DeletePlayer from './admin/deleteplayer/DeletePlayer';
import SignIn from './auth/SignIn';
import SignUp from './auth/SignUp';
import DeleteTeam from './admin/deleteteam/DeleteTeam';

import Overview from './overview/Overview';
import Leagues from './leagues/Leagues';

import * as constants from './constants';

export const adminLinks = [
    {
        title: 'Create Player',
        path: constants.ADMIN_URL.CREATE_PLAYER,
        icon: <PersonAddIcon />,
        component: CreatePlayer
    },
    {
        title: 'Delete Player',
        path: constants.ADMIN_URL.DELETE_PLAYER,
        icon: <DeleteIcon />,
        component: DeletePlayer
    },
    {
        title: 'Create Team',
        path: constants.ADMIN_URL.CREATE_TEAM,
        icon: <PersonAddIcon />,
        component: CreateTeam
    },
    {
        title: 'Delete Team',
        path: constants.ADMIN_URL.DELETE_TEAM,
        icon: <DeleteIcon />,
        component: DeleteTeam
    },
    {
        title: 'Submit Result',
        path: constants.ADMIN_URL.SUBMIT_RESULT,
        icon: <PersonAddIcon />,
        component: SubmitResult
    }

];

export const signedOutLinks = [
    {
        title: 'Sign In',
        path: constants.URL.SIGN_IN,
        icon: <DoubleArrowIcon />,
        component: SignIn
    },
    {
        title: 'Sign Up',
        path: constants.URL.SIGN_UP,
        icon: <AccountBoxIcon />,
        component: SignUp
    }
];

export const signedInLinks = [
    {
        title: 'Overview',
        path: constants.URL.OVERVIEW,
        icon: <DetailsIcon />,
        component: Overview
    },
    {
        title: 'Current Team',
        path: '/current-team',
        icon: <PeopleAltIcon />,
        component: Overview
    },
    {
        title: 'Transfers',
        path: '/transfers',
        icon: <PersonAddIcon />,
        component: Overview
    },
    {
        title: 'Points',
        path: '/points',
        icon: <GradeIcon />,
        component: Overview
    },
    {
        title: 'Leagues',
        path: constants.URL.LEAGUES,
        icon: <LayersIcon />,
        component: Leagues
    }
];
