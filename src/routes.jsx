import AccountBoxIcon from '@material-ui/icons/AccountBox';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import DehazeIcon from '@material-ui/icons/Dehaze';
import DeleteIcon from '@material-ui/icons/Delete';
import DoubleArrowIcon from '@material-ui/icons/DoubleArrow';
import EditIcon from '@material-ui/icons/Edit';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import GradeIcon from '@material-ui/icons/Grade';
import HomeIcon from '@material-ui/icons/Home';
import LayersIcon from '@material-ui/icons/Layers';
import LocalCafeIcon from '@material-ui/icons/LocalCafe';
import LoopIcon from '@material-ui/icons/Loop';
import MessageIcon from '@material-ui/icons/Message';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import TransferWithinAStationIcon from '@material-ui/icons/TransferWithinAStation';
import VideoLabelIcon from '@material-ui/icons/VideoLabel';
import VideoLibraryIcon from '@material-ui/icons/VideoLibrary';
import WavesIcon from '@material-ui/icons/Waves';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import fp from 'lodash/fp';
import React, { Suspense } from 'react';
import * as adminComponents from './adminComponents';
import Spinner from './common/spinner/Spinner';
import * as constants from './constants';
import ErrorBoundary from './errorboundary/ErrorBoundary';
import * as rootComponents from './rootComponents';

const generateLazyComponent = (Component, moduleName) => () => (
    <Suspense fallback={<div style={{ textAlign: 'center', marginTop: '30px' }}><Spinner /></div>}>
        <ErrorBoundary moduleName={moduleName}>
            <Component />
        </ErrorBoundary>
    </Suspense>
);

export const adminLinks = [
    {
        title: 'Create Player',
        icon: <PersonAddIcon color="primary" />,
        component: generateLazyComponent(adminComponents.CreatePlayer, 'Create Player'),
        path: () => constants.URL.CREATE_PLAYER,
        urlIncludes: constants.URL.CREATE_PLAYER,
        permissionRequired: constants.PERMISSIONS.CREATE_PLAYER
    },
    {
        title: 'Delete Player',
        icon: <DeleteIcon color="primary" />,
        component: generateLazyComponent(adminComponents.DeletePlayer, 'Delete Player'),
        path: () => constants.URL.DELETE_PLAYER,
        urlIncludes: constants.URL.DELETE_PLAYER,
        permissionRequired: constants.PERMISSIONS.DELETE_PLAYER
    },
    {
        title: 'Create Team',
        icon: <PersonAddIcon color="primary" />,
        component: generateLazyComponent(adminComponents.CreateTeam, 'Create Team'),
        path: () => constants.URL.CREATE_TEAM,
        urlIncludes: constants.URL.CREATE_TEAM,
        permissionRequired: constants.PERMISSIONS.CREATE_TEAM
    },
    {
        title: 'Delete Team',
        icon: <DeleteIcon color="primary" />,
        component: generateLazyComponent(adminComponents.DeleteTeam, 'Delete Team'),
        path: () => constants.URL.DELETE_TEAM,
        urlIncludes: constants.URL.DELETE_TEAM,
        permissionRequired: constants.PERMISSIONS.DELETE_TEAM
    },
    {
        title: 'Submit Result',
        icon: <PersonAddIcon color="primary" />,
        component: generateLazyComponent(adminComponents.SubmitResult, 'Submit Result'),
        path: () => constants.URL.SUBMIT_RESULT,
        urlIncludes: constants.URL.SUBMIT_RESULT,
        permissionRequired: constants.PERMISSIONS.SUBMIT_RESULT
    },
    {
        title: 'Trigger Week',
        icon: <WhatshotIcon color="primary" />,
        component: generateLazyComponent(adminComponents.TriggerWeek, 'Trigger Week'),
        path: () => constants.URL.TRIGGER_WEEK,
        urlIncludes: constants.URL.TRIGGER_WEEK,
        permissionRequired: constants.PERMISSIONS.TRIGGER_WEEK
    },
    {
        title: 'Edit Divisions',
        icon: <EditIcon color="primary" />,
        component: generateLazyComponent(adminComponents.Fixtures, 'Divisions'),
        path: () => constants.URL.DIVISIONS,
        urlIncludes: constants.URL.DIVISIONS,
        permissionRequired: constants.PERMISSIONS.SET_DIVISIONS
    },
    {
        title: 'Edit Player Stats',
        icon: <EditIcon color="primary" />,
        component: generateLazyComponent(adminComponents.EditPlayer, 'Edit Player Stats'),
        path: () => constants.URL.EDIT_PLAYER_STATS,
        urlIncludes: constants.URL.EDIT_PLAYER_STATS,
        permissionRequired: constants.PERMISSIONS.EDIT_PLAYER
    },
    {
        title: 'Edit Player Price',
        icon: <EditIcon color="primary" />,
        component: generateLazyComponent(adminComponents.EditPlayerPrice, 'Edit Player Price'),
        path: () => constants.URL.EDIT_PLAYER_PRICE,
        urlIncludes: constants.URL.EDIT_PLAYER_PRICE,
        permissionRequired: constants.PERMISSIONS.EDIT_PLAYER
    },
    {
        title: 'Approve Highlights',
        icon: <VideoLabelIcon color="primary" />,
        component: generateLazyComponent(adminComponents.ApproveHighlights, 'Approve Highlights'),
        addUserId: false,
        path: () => constants.URL.APPROVE_HIGHLIGHTS,
        urlIncludes: constants.URL.APPROVE_HIGHLIGHTS,
        permissionRequired: constants.PERMISSIONS.APPROVE_HIGHLIGHTS
    },
    {
        title: 'Manage Subs',
        icon: <AttachMoneyIcon color="primary" />,
        component: generateLazyComponent(adminComponents.ManageSubs, 'Manage Subs'),
        addUserId: false,
        path: () => constants.URL.MANAGE_SUBS,
        urlIncludes: constants.URL.MANAGE_SUBS,
        permissionRequired: constants.PERMISSIONS.MANAGE_SUBS
    },
    {
        title: 'Add Notifications',
        icon: <MessageIcon color="primary" />,
        component: generateLazyComponent(adminComponents.AddNotification, 'Add Notifications'),
        addUserId: false,
        path: () => constants.URL.ADD_NOTIFICATIONS,
        urlIncludes: constants.URL.ADD_NOTIFICATIONS,
        permissionRequired: constants.PERMISSIONS.ADD_NOTIFICATIONS
    },
    {
        title: 'Transfer Maintainer',
        icon: <LoopIcon color="primary" />,
        component: generateLazyComponent(adminComponents.TransferMaintainer, 'Transfer Maintainer'),
        addUserId: false,
        path: () => constants.URL.TRANSFER_MAINTAINER,
        urlIncludes: constants.URL.TRANSFER_MAINTAINER,
        permissionRequired: constants.PERMISSIONS.TRANSFER_MAINTAINER
    },
    {
        title: 'Toggle Pages',
        icon: <SupervisorAccountIcon color="primary" />,
        component: generateLazyComponent(adminComponents.TogglePages, 'Toggle Pages'),
        addUserId: false,
        path: () => constants.URL.TOGGLE_PAGES,
        urlIncludes: constants.URL.TOGGLE_PAGES,
        permissionRequired: constants.PERMISSIONS.TOGGLE_PAGES
    },
    {
        title: 'Manage Bugs',
        icon: <SupervisorAccountIcon color="primary" />,
        component: generateLazyComponent(adminComponents.ManageBugs, 'Manage Bugs'),
        addUserId: false,
        path: () => constants.URL.MANAGE_BUGS,
        urlIncludes: constants.URL.MANAGE_BUGS,
        permissionRequired: constants.PERMISSIONS.MANAGE_BUGS
    },
    {
        title: 'Manage Users',
        icon: <PeopleOutlineIcon color="primary" />,
        component: generateLazyComponent(adminComponents.ManageUsers, 'Manage Users'),
        addUserId: false,
        path: () => constants.URL.MANAGE_USERS,
        urlIncludes: constants.URL.MANAGE_USERS,
        permissionRequired: constants.PERMISSIONS.MANAGE_USERS
    }
];

export const signedOutLinks = [
    {
        title: 'Sign In',
        icon: <DoubleArrowIcon color="primary" />,
        component: generateLazyComponent(rootComponents.SignIn, 'Sign In'),
        path: () => constants.URL.SIGN_IN,
        urlIncludes: constants.URL.SIGN_IN
    },
    {
        title: 'Sign Up',
        icon: <AccountBoxIcon color="primary" />,
        component: generateLazyComponent(rootComponents.SignUp, 'Sign Up'),
        path: () => constants.URL.SIGN_UP,
        urlIncludes: constants.URL.SIGN_UP
    }
];

export const signedInLinks = [
    {
        title: 'Overview',
        icon: <HomeIcon color="primary" />,
        component: generateLazyComponent(rootComponents.Overview, 'Overview'),
        addUserId: false,
        path: props => `${constants.URL.OVERVIEW}/${fp.get('userId')(props)}/${fp.get('maxGameWeek')(props)}`,
        renderPath: `${constants.URL.OVERVIEW}/:userId/:week`,
        urlIncludes: constants.URL.OVERVIEW,
        canToggle: false
    },
    {
        title: 'Team',
        icon: <PeopleAltIcon color="primary" />,
        component: generateLazyComponent(rootComponents.CurrentTeam, 'Team'),
        addUserId: true,
        path: props => `${constants.URL.CURRENT_TEAM}/${fp.get('userId')(props)}`,
        renderPath: `${constants.URL.CURRENT_TEAM}/:userId`,
        urlIncludes: constants.URL.CURRENT_TEAM,
        canToggle: true
    },
    {
        title: 'Points',
        icon: <GradeIcon color="primary" />,
        component: generateLazyComponent(rootComponents.Points, 'Points'),
        addUserId: false,
        path: props => `${constants.URL.POINTS}/${fp.get('userId')(props)}/${fp.get('maxGameWeek')(props)}`,
        renderPath: `${constants.URL.POINTS}/:userId/:week`,
        urlIncludes: constants.URL.POINTS,
        canToggle: true
    },
    {
        title: 'Leagues',
        icon: <LayersIcon color="primary" />,
        component: generateLazyComponent(rootComponents.Leagues, 'Leagues'),
        addUserId: false,
        path: () => constants.URL.LEAGUES,
        renderPath: constants.URL.LEAGUES,
        urlIncludes: constants.URL.LEAGUES,
        canToggle: true
    },
    {
        title: 'The Cup',
        icon: <LocalCafeIcon color="primary" />,
        component: generateLazyComponent(rootComponents.Cup, 'The Cup'),
        addUserId: false,
        path: () => constants.URL.CUP,
        renderPath: constants.URL.CUP,
        urlIncludes: constants.URL.CUP,
        canToggle: true
    },
    {
        title: 'Transfers',
        icon: <TransferWithinAStationIcon color="primary" />,
        component: generateLazyComponent(rootComponents.Transfers, 'Transfers'),
        addUserId: false,
        path: () => constants.URL.TRANSFERS,
        renderPath: constants.URL.TRANSFERS,
        urlIncludes: constants.URL.TRANSFERS,
        canToggle: true
    },
    {
        title: 'Stats',
        icon: <WavesIcon color="primary" />,
        component: generateLazyComponent(rootComponents.Stats, 'Stats'),
        addUserId: false,
        path: props => `${constants.URL.STATS}/none/${fp.get('maxGameWeek')(props)}/${fp.get('maxGameWeek')(props)}`,
        renderPath: `${constants.URL.STATS}/:teamId/:minWeek/:maxWeek`,
        urlIncludes: constants.URL.STATS,
        canToggle: true
    },
    {
        title: 'Previous Years',
        icon: <WavesIcon color="primary" />,
        component: generateLazyComponent(rootComponents.PreviousYears, 'Previous Years'),
        addUserId: false,
        path: () => constants.URL.PREVIOUS_YEARS,
        renderPath: constants.URL.PREVIOUS_YEARS,
        urlIncludes: constants.URL.PREVIOUS_YEARS,
        canToggle: true
    },
    {
        title: 'Charts',
        icon: <EqualizerIcon color="primary" />,
        component: generateLazyComponent(rootComponents.Charts, 'Charts'),
        addUserId: false,
        path: () => constants.URL.CHARTS,
        renderPath: constants.URL.CHARTS,
        urlIncludes: constants.URL.CHARTS,
        canToggle: true
    },
    {
        title: 'Highlights',
        icon: <VideoLibraryIcon color="primary" />,
        component: generateLazyComponent(rootComponents.Highlights, 'Highlights'),
        addUserId: false,
        path: () => constants.URL.HIGHLIGHTS,
        renderPath: constants.URL.HIGHLIGHTS,
        urlIncludes: constants.URL.HIGHLIGHTS,
        canToggle: true
    },
    {
        title: 'Fixtures',
        icon: <DehazeIcon color="primary" />,
        component: generateLazyComponent(rootComponents.Fixtures, 'Fixtures'),
        addUserId: false,
        path: () => constants.URL.FIXTURES,
        renderPath: constants.URL.FIXTURES,
        urlIncludes: constants.URL.FIXTURES,
        canToggle: true
    },
    {
        title: 'Features',
        icon: <QuestionAnswerIcon color="primary" />,
        component: generateLazyComponent(rootComponents.FeatureRequest, 'Features'),
        addUserId: false,
        path: () => constants.URL.FEATURE_REQUEST,
        renderPath: constants.URL.FEATURE_REQUEST,
        urlIncludes: constants.URL.FEATURE_REQUEST,
        canToggle: true
    }
];
