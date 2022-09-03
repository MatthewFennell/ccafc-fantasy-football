import fp from 'lodash/fp';

export const getHistoryForYear = (state, year) => fp.flow(
    fp.get(year)
)(state.previousYear.history);
