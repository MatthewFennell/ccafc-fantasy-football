import React from 'react';

import PersonAddIcon from '@material-ui/icons/PersonAdd';
import DoubleArrowIcon from '@material-ui/icons/DoubleArrow';
import HomeIcon from '@material-ui/icons/Home';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import GradeIcon from '@material-ui/icons/Grade';
import LayersIcon from '@material-ui/icons/Layers';
import DeleteIcon from '@material-ui/icons/Delete';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import EditIcon from '@material-ui/icons/Edit';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import TransferWithinAStationIcon from '@material-ui/icons/TransferWithinAStation';
import WavesIcon from '@material-ui/icons/Waves';
import VideoLibraryIcon from '@material-ui/icons/VideoLibrary';

import fp from 'lodash/fp';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import CreatePlayer from './admin/createplayer/CreatePlayer';
import CreateTeam from './admin/createteam/CreateTeam';
import SubmitResult from './admin/submitresult/SubmitResult';
import DeletePlayer from './admin/deleteplayer/DeletePlayer';
import SignIn from './auth/SignIn';
import SignUp from './auth/SignUp';
import DeleteTeam from './admin/deleteteam/DeleteTeam';
import Points from './points/Points';
import TriggerWeek from './admin/triggerweek/TriggerWeek';
import EditPlayer from './admin/editplayer/EditPlayer';
import ManageUsers from './admin/manageusers/ManageUsers';

import Overview from './overview/Overview';
import Leagues from './leagues/Leagues';

import * as constants from './constants';
import CurrentTeam from './currentteam/CurrentTeam';
import Transfers from './transfers/Transfers';
import Stats from './stats/Stats';
import Charts from './charts/Charts';
import Highlights from './highlights/Highlights';

export const adminLinks = [
    {
        title: 'Create Player',
        icon: <PersonAddIcon />,
        component: CreatePlayer,
        path: () => constants.URL.CREATE_PLAYER,
        urlIncludes: constants.URL.CREATE_PLAYER,
        permissionRequired: constants.PERMISSIONS.CREATE_PLAYER
    },
    {
        title: 'Delete Player',
        icon: <DeleteIcon />,
        component: DeletePlayer,
        path: () => constants.URL.DELETE_PLAYER,
        urlIncludes: constants.URL.DELETE_PLAYER,
        permissionRequired: constants.PERMISSIONS.DELETE_PLAYER
    },
    {
        title: 'Create Team',
        icon: <PersonAddIcon />,
        component: CreateTeam,
        path: () => constants.URL.CREATE_TEAM,
        urlIncludes: constants.URL.CREATE_TEAM,
        permissionRequired: constants.PERMISSIONS.CREATE_TEAM
    },
    {
        title: 'Delete Team',
        icon: <DeleteIcon />,
        component: DeleteTeam,
        path: () => constants.URL.DELETE_TEAM,
        urlIncludes: constants.URL.DELETE_TEAM,
        permissionRequired: constants.PERMISSIONS.DELETE_TEAM
    },
    {
        title: 'Submit Result',
        icon: <PersonAddIcon />,
        component: SubmitResult,
        path: () => constants.URL.SUBMIT_RESULT,
        urlIncludes: constants.URL.SUBMIT_RESULT,
        permissionRequired: constants.PERMISSIONS.SUBMIT_RESULT
    },
    {
        title: 'Trigger Week',
        icon: <WhatshotIcon />,
        component: TriggerWeek,
        path: () => constants.URL.TRIGGER_WEEK,
        urlIncludes: constants.URL.TRIGGER_WEEK,
        permissionRequired: constants.PERMISSIONS.TRIGGER_WEEK
    },
    {
        title: 'Edit Player',
        icon: <EditIcon />,
        component: EditPlayer,
        path: () => constants.URL.EDIT_PLAYER,
        urlIncludes: constants.URL.EDIT_PLAYER,
        permissionRequired: constants.PERMISSIONS.EDIT_PLAYER
    },
    {
        title: 'Manage Users',
        icon: <SupervisorAccountIcon />,
        component: ManageUsers,
        addUserId: false,
        path: () => constants.URL.MANAGE_USERS,
        urlIncludes: constants.URL.MANAGE_USERS,
        permissionRequired: constants.PERMISSIONS.MANAGE_USERS
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
        icon: <HomeIcon />,
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
    },
    {
        title: 'Transfers',
        icon: <TransferWithinAStationIcon />,
        component: Transfers,
        addUserId: false,
        path: () => constants.URL.TRANSFERS,
        urlIncludes: constants.URL.TRANSFERS
    },
    {
        title: 'Stats',
        icon: <WavesIcon />,
        component: Stats,
        addUserId: false,
        path: props => `${constants.URL.STATS}/none/${fp.get('maxGameWeek')(props)}/${fp.get('maxGameWeek')(props)}`,
        urlIncludes: constants.URL.STATS
    },
    {
        title: 'Charts',
        icon: <EqualizerIcon />,
        component: Charts,
        addUserId: false,
        path: () => constants.URL.CHARTS,
        urlIncludes: constants.URL.CHARTS
    },
    {
        title: 'Highlights',
        icon: <VideoLibraryIcon />,
        component: Highlights,
        addUserId: false,
        path: () => constants.URL.HIGHLIGHTS,
        urlIncludes: constants.URL.HIGHLIGHTS
    }
];
