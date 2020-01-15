const pre = 'FIXTURES/';

export const FETCH_FIXTURES_REQUEST = `${pre}FETCH_FIXTURES_REQUEST`;
export const FETCH_FIXTURES_SUCCESS = `${pre}FETCH_FIXTURES_SUCCESS`;
export const FETCH_FIXTURES_ERROR = `${pre}FETCH_FIXTURES_ERROR`;

export const fetchFixturesRequest = () => ({
    type: FETCH_FIXTURES_REQUEST
});

export const fetchFixturesSuccess = fixtures => ({
    type: FETCH_FIXTURES_SUCCESS,
    fixtures
});

export const fetchFixturesError = error => ({
    type: FETCH_FIXTURES_ERROR,
    error
});
