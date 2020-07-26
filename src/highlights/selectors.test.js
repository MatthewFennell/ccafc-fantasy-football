import * as selectors from './selectors';

describe('Highlights selectors', () => {
    const state = {
        highlights: {
            loadedVideos: true,
            loadedRejectedVideos: true,
            loadedVideosToBeApproved: true
        }
    };

    it('Get all teams', () => {
        expect(selectors.fetchedVideos(state)).toEqual(true);
    });

    it('Get fetched fixtures', () => {
        expect(selectors.fetchedRejectedVideos(state)).toEqual(true);
    });

    it('Get approved fixtures', () => {
        expect(selectors.fetchedApprovedVideos(state)).toEqual(true);
    });
});
