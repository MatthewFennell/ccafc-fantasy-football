import { lazy } from 'react';

const SignIn = lazy(() => import('./auth/SignIn'));
const SignUp = lazy(() => import('./auth/SignUp'));

const Points = lazy(() => import('./points/Points'));
const Leagues = lazy(() => import('./leagues/Leagues'));
const Overview = lazy(() => import('./overview/Overview'));
const CurrentTeam = lazy(() => import('./currentteam/CurrentTeam'));
const Transfers = lazy(() => import('./transfers/Transfers'));
const Cup = lazy(() => import('./cup/TheCup'));
const Stats = lazy(() => import('./stats/Stats'));
const Charts = lazy(() => import('./charts/Charts'));
const Highlights = lazy(() => import('./highlights/Highlights'));
const Fixtures = lazy(() => import('./fixtures/Fixtures'));
const FeatureRequest = lazy(() => import('./featurerequest/FeatureRequest'));
const PreviousYears = lazy(() => import('./previousyears/PreviousYears'));

export {
    SignIn,
    SignUp,
    Overview,
    Points,
    Leagues,
    CurrentTeam,
    Transfers,
    Cup,
    Stats,
    Charts,
    Highlights,
    Fixtures,
    FeatureRequest,
    PreviousYears
};
