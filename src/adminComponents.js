import { lazy } from 'react';

const CreateTeam = lazy(() => import('./admin/createteam/CreateTeam'));
const CreatePlayer = lazy(() => import('./admin/createplayer/CreatePlayer'));
const SubmitResult = lazy(() => import('./admin/submitresult/SubmitResult'));
const DeletePlayer = lazy(() => import('./admin/deleteplayer/DeletePlayer'));
const DeleteTeam = lazy(() => import('./admin/deleteteam/DeleteTeam'));
const TriggerWeek = lazy(() => import('./admin/triggerweek/TriggerWeek'));
const EditPlayer = lazy(() => import('./admin/editplayer/EditPlayer'));
const EditPlayerPrice = lazy(() => import('./admin/editplayerprice/EditPlayerPrice'));
const ManageUsers = lazy(() => import('./admin/manageusers/ManageUsers'));
const ApproveHighlights = lazy(() => import('./admin/highlights/ApproveHighlights'));
const ManageSubs = lazy(() => import('./admin/managesubs/ManageSubs'));
const AddNotification = lazy(() => import('./admin/addnotification/AddNotification'));
const ManageBugs = lazy(() => import('./admin/managebugs/ManageBugs'));
const TogglePages = lazy(() => import('./admin/togglepages/TogglePages'));
// eslint-disable-next-line import/no-cycle

export {
    CreateTeam,
    CreatePlayer,
    SubmitResult,
    DeletePlayer,
    DeleteTeam,
    TriggerWeek,
    EditPlayer,
    EditPlayerPrice,
    ManageUsers,
    ApproveHighlights,
    ManageSubs,
    AddNotification,
    ManageBugs,
    TogglePages
};
