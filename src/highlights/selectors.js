// eslint-disable-next-line import/prefer-default-export
export const fetchedVideos = state => state.highlights.videos && state
    .highlights.videos.length >= 1;
