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
        icon: <PersonAddIcon />,
        component: CreatePlayer,
        path: () => constants.ADMIN_URL.CREATE_PLAYER,
        urlIncludes: constants.ADMIN_URL.CREATE_PLAYER
    },
    {
        title: 'Delete Player',
        icon: <DeleteIcon />,
        component: DeletePlayer,
        path: () => constants.ADMIN_URL.DELETE_PLAYER,
        urlIncludes: constants.ADMIN_URL.DELETE_PLAYER
    },
    {
        title: 'Create Team',
        icon: <PersonAddIcon />,
        component: CreateTeam,
        path: () => constants.ADMIN_URL.CREATE_TEAM,
        urlIncludes: constants.ADMIN_URL.CREATE_TEAM
    },
    {
        title: 'Delete Team',
        icon: <DeleteIcon />,
        component: DeleteTeam,
        path: () => constants.ADMIN_URL.DELETE_TEAM,
        urlIncludes: constants.ADMIN_URL.DELETE_TEAM
    },
    {
        title: 'Submit Result',
        icon: <PersonAddIcon />,
        component: SubmitResult,
        path: () => constants.ADMIN_URL.SUBMIT_RESULT,
        urlIncludes: constants.ADMIN_URL.SUBMIT_RESULT
    }

];

export const signedOutLinks = [
    {
        title: 'Sign In',
        icon: <DoubleArrowIcon />,
        component: SignIn,
        path: () => constants.URL.SIGN_IN,
        urlIncludes: constants.URL.SIGN_IN
    },
    {
        title: 'Sign Up',
        icon: <AccountBoxIcon />,
        component: SignUp,
        path: () => constants.URL.SIGN_UP,
        urlIncludes: constants.URL.SIGN_UP
    }
];

export const signedInLinks = [
    {
        title: 'Overview',
        icon: <DetailsIcon />,
        component: Overview,
        addUserId: false,
        path: props => `${constants.URL.OVERVIEW}/${fp.get('userId')(props)}/${fp.get('maxGameWeek')(props)}`,
        urlIncludes: constants.URL.OVERVIEW
    },
    {
        title: 'Current Team',
        icon: <PeopleAltIcon />,
        component: CurrentTeam,
        addUserId: true,
        path: props => `${constants.URL.CURRENT_TEAM}/${fp.get('userId')(props)}`,
        urlIncludes: constants.URL.CURRENT_TEAM
    },
    {
        title: 'Transfers',
        icon: <PersonAddIcon />,
        component: Overview,
        addUserId: false,
        path: () => constants.URL.OVERVIEW,
        urlIncludes: 'Transfers'
    },
    {
        title: 'Points',
        icon: <GradeIcon />,
        component: Points,
        addUserId: false,
        path: props => `${constants.URL.POINTS}/${fp.get('userId')(props)}/${fp.get('maxGameWeek')(props)}`,
        urlIncludes: constants.URL.POINTS
    },
    {
        title: 'Leagues',
        icon: <LayersIcon />,
        component: Leagues,
        addUserId: false,
        path: () => constants.URL.LEAGUES,
        urlIncludes: constants.URL.LEAGUES
    }
];
