import { lazy } from 'react';

const AddNotification = lazy(() => import('./admin/addnotification/AddNotification'));
const ApproveHighlights = lazy(() => import('./admin/highlights/ApproveHighlights'));
const CreateTeam = lazy(() => import('./admin/createteam/CreateTeam'));
const CreatePlayer = lazy(() => import('./admin/createplayer/CreatePlayer'));
const DeletePlayer = lazy(() => import('./admin/deleteplayer/DeletePlayer'));
const DeleteTeam = lazy(() => import('./admin/deleteteam/DeleteTeam'));
const EditPlayer = lazy(() => import('./admin/editplayer/EditPlayer'));
const EditPlayerPrice = lazy(() => import('./admin/editplayerprice/EditPlayerPrice'));
const Fixtures = lazy(() => import('./admin/divisions/Divisions'));
const ManageBugs = lazy(() => import('./admin/managebugs/ManageBugs'));
const ManageSubs = lazy(() => import('./admin/managesubs/ManageSubs'));
const ManageUsers = lazy(() => import('./admin/manageusers/ManageUsers'));
const SubmitResult = lazy(() => import('./admin/submitresult/SubmitResult'));
const TogglePages = lazy(() => import('./admin/togglepages/TogglePages'));
const TransferMaintainer = lazy(() => import('./admin/transferMaintainer/TransferMaintainer'));
const TriggerWeek = lazy(() => import('./admin/triggerweek/TriggerWeek'));

export {
    AddNotification,
    ApproveHighlights,
    CreateTeam,
    CreatePlayer,
    DeletePlayer,
    DeleteTeam,
    EditPlayer,
    EditPlayerPrice,
    Fixtures,
    ManageBugs,
    ManageSubs,
    ManageUsers,
    SubmitResult,
    TogglePages,
    TransferMaintainer,
    TriggerWeek
};
