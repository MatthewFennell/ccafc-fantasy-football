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
import VideoLabelIcon from '@material-ui/icons/VideoLabel';
import DehazeIcon from '@material-ui/icons/Dehaze';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';

import fp from 'lodash/fp';
import * as adminComponents from './adminComponents';
import * as rootComponents from './rootComponents';
import * as constants from './constants';

export const adminLinks = [
    {
        title: 'Create Player',
        icon: <PersonAddIcon />,
        component: adminComponents.CreatePlayer,
        path: () => constants.URL.CREATE_PLAYER,
        urlIncludes: constants.URL.CREATE_PLAYER,
        permissionRequired: constants.PERMISSIONS.CREATE_PLAYER
    },
    {
        title: 'Delete Player',
        icon: <DeleteIcon />,
        component: adminComponents.DeletePlayer,
        path: () => constants.URL.DELETE_PLAYER,
        urlIncludes: constants.URL.DELETE_PLAYER,
        permissionRequired: constants.PERMISSIONS.DELETE_PLAYER
    },
    {
        title: 'Create Team',
        icon: <PersonAddIcon />,
        component: adminComponents.CreateTeam,
        path: () => constants.URL.CREATE_TEAM,
        urlIncludes: constants.URL.CREATE_TEAM,
        permissionRequired: constants.PERMISSIONS.CREATE_TEAM
    },
    {
        title: 'Delete Team',
        icon: <DeleteIcon />,
        component: adminComponents.DeleteTeam,
        path: () => constants.URL.DELETE_TEAM,
        urlIncludes: constants.URL.DELETE_TEAM,
        permissionRequired: constants.PERMISSIONS.DELETE_TEAM
    },
    {
        title: 'Submit Result',
        icon: <PersonAddIcon />,
        component: adminComponents.SubmitResult,
        path: () => constants.URL.SUBMIT_RESULT,
        urlIncludes: constants.URL.SUBMIT_RESULT,
        permissionRequired: constants.PERMISSIONS.SUBMIT_RESULT
    },
    {
        title: 'Trigger Week',
        icon: <WhatshotIcon />,
        component: adminComponents.TriggerWeek,
        path: () => constants.URL.TRIGGER_WEEK,
        urlIncludes: constants.URL.TRIGGER_WEEK,
        permissionRequired: constants.PERMISSIONS.TRIGGER_WEEK
    },
    {
        title: 'Edit Player',
        icon: <EditIcon />,
        component: adminComponents.EditPlayer,
        path: () => constants.URL.EDIT_PLAYER,
        urlIncludes: constants.URL.EDIT_PLAYER,
        permissionRequired: constants.PERMISSIONS.EDIT_PLAYER
    },
    {
        title: 'Manage Users',
        icon: <SupervisorAccountIcon />,
        component: adminComponents.ManageUsers,
        addUserId: false,
        path: () => constants.URL.MANAGE_USERS,
        urlIncludes: constants.URL.MANAGE_USERS,
        permissionRequired: constants.PERMISSIONS.MANAGE_USERS
    },
    {
        title: 'Approve Highlights',
        icon: <VideoLabelIcon />,
        component: adminComponents.ApproveHighlights,
        addUserId: false,
        path: () => constants.URL.APPROVE_HIGHLIGHTS,
        urlIncludes: constants.URL.APPROVE_HIGHLIGHTS,
        permissionRequired: constants.PERMISSIONS.APPROVE_HIGHLIGHTS
    }
];

export const signedOutLinks = [
    {
        title: 'Sign In',
        icon: <DoubleArrowIcon />,
        component: rootComponents.SignIn,
        path: () => constants.URL.SIGN_IN,
        urlIncludes: constants.URL.SIGN_IN
    },
    {
        title: 'Sign Up',
        icon: <AccountBoxIcon />,
        component: rootComponents.SignUp,
        path: () => constants.URL.SIGN_UP,
        urlIncludes: constants.URL.SIGN_UP
    }
];

export const signedInLinks = [
    {
        title: 'Overview',
        icon: <HomeIcon />,
        component: rootComponents.Overview,
        addUserId: false,
        path: props => `${constants.URL.OVERVIEW}/${fp.get('userId')(props)}/${fp.get('maxGameWeek')(props)}`,
        urlIncludes: constants.URL.OVERVIEW
    },
    {
        title: 'Current Team',
        icon: <PeopleAltIcon />,
        component: rootComponents.CurrentTeam,
        addUserId: true,
        path: props => `${constants.URL.CURRENT_TEAM}/${fp.get('userId')(props)}`,
        urlIncludes: constants.URL.CURRENT_TEAM
    },
    {
        title: 'Points',
        icon: <GradeIcon />,
        component: rootComponents.Points,
        addUserId: false,
        path: props => `${constants.URL.POINTS}/${fp.get('userId')(props)}/${fp.get('maxGameWeek')(props)}`,
        urlIncludes: constants.URL.POINTS
    },
    {
        title: 'Leagues',
        icon: <LayersIcon />,
        component: rootComponents.Leagues,
        addUserId: false,
        path: () => constants.URL.LEAGUES,
        urlIncludes: constants.URL.LEAGUES
    },
    {
        title: 'Transfers',
        icon: <TransferWithinAStationIcon />,
        component: rootComponents.Transfers,
        addUserId: false,
        path: () => constants.URL.TRANSFERS,
        urlIncludes: constants.URL.TRANSFERS
    },
    {
        title: 'Stats',
        icon: <WavesIcon />,
        component: rootComponents.Stats,
        addUserId: false,
        path: props => `${constants.URL.STATS}/none/${fp.get('maxGameWeek')(props)}/${fp.get('maxGameWeek')(props)}`,
        urlIncludes: constants.URL.STATS
    },
    {
        title: 'Charts',
        icon: <EqualizerIcon />,
        component: rootComponents.Charts,
        addUserId: false,
        path: () => constants.URL.CHARTS,
        urlIncludes: constants.URL.CHARTS
    },
    {
        title: 'Highlights',
        icon: <VideoLibraryIcon />,
        component: rootComponents.Highlights,
        addUserId: false,
        path: () => constants.URL.HIGHLIGHTS,
        urlIncludes: constants.URL.HIGHLIGHTS
    },
    {
        title: 'Fixtures',
        icon: <DehazeIcon />,
        component: rootComponents.Fixtures,
        addUserId: false,
        path: () => constants.URL.FIXTURES,
        urlIncludes: constants.URL.FIXTURES
    },
    {
        title: 'Feature Request',
        icon: <QuestionAnswerIcon />,
        component: rootComponents.FeatureRequest,
        addUserId: false,
        path: () => constants.URL.FEATURE_REQUEST,
        urlIncludes: constants.URL.FEATURE_REQUEST
    }
];
