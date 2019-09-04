import firebase from 'firebase';

// Param func is the NAME of the function to call
const functionToCall = func => firebase
  .app()
  .functions('europe-west2')
  .httpsCallable(func);

// Data here is the data that should be sent to the function
// Can add adapters to transform data here
// eslint-disable-next-line import/prefer-default-export
export const addMessage = data => functionToCall('addMessage')(data).then(data => ({
  ...data.data,
  test: 'testing'
}));

export const getAllLeagues = () => functionToCall('league-getAllLeagues')().then(data => data.data.map(league => ({
  id: league.id,
  leagueName: league.data.leagueName,
  participants: league.data.participants,
  user_ids: league.data.user_ids
})));

export const getLeaguesIAmIn = () => functionToCall('league-getLeaguesIAmIn')().then(data => data.data.map(league => ({
  id: league.id,
  leagueName: league.data.leagueName,
  participants: league.data.participants,
  user_ids: league.data.user_ids
})));
