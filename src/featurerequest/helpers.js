import fp from 'lodash/fp';

/* eslint-disable no-underscore-dangle */
export const dateFilters = {
    pastDay: {
        label: 'Past 24 hours',
        id: 'pastDay',
        filterFunction: d => {
            const date = new Date(d.dateCreated.seconds * 1000);
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            return date > yesterday;
        }
    },
    pastWeek: {
        label: 'Past week',
        id: 'pastWeek',
        filterFunction: d => {
            const date = new Date(d.dateCreated.seconds * 1000);
            const lastWeek = new Date();
            lastWeek.setDate(lastWeek.getDate() - 7);
            return date > lastWeek;
        }
    },
    pastMonth: {
        label: 'Past month',
        id: 'pastMonth',
        filterFunction: d => {
            const date = new Date(d.dateCreated.seconds * 1000);
            const lastMonth = new Date();
            lastMonth.setMonth(lastMonth.getMonth() - 1);
            return date > lastMonth;
        }
    },
    pastYear: {
        label: 'Past year',
        id: 'pastYear',
        filterFunction: d => {
            const date = new Date(d.dateCreated.seconds * 1000);
            const lastYear = new Date();
            lastYear.setFullYear(lastYear.getFullYear() - 1);
            return date > lastYear;
        }
    },
    allTime: {
        label: 'All Time',
        id: 'allTime',
        filterFunction: () => true
    }
};

export const sortByFilters = {
    newestFirst: {
        label: 'Newest First',
        id: 'newestFirst',
        sortFunction: vids => vids.sort((a, b) => b.dateCreated.seconds - a.dateCreated.seconds)
    },
    oldestFirst: {
        label: 'Oldest First',
        id: 'oldestFirst',
        sortFunction: vids => vids.sort((a, b) => a.dateCreated.seconds - b.dateCreated.seconds)
    }
};

const filterBySearch = (videos, searchFilter) => videos
    .filter(x => x.displayName.includes(searchFilter));

const sortBy = (sort, videos, searchFilter) => {
    const sortFunction = fp.get('sortFunction')(Object.values(sortByFilters).find(x => x.id === sort));
    return filterBySearch(sortFunction ? sortFunction(videos) : videos, searchFilter);
};

const filterByDate = (filter, sort, videos, searchFilter) => {
    const filterFunction = fp.get('filterFunction')(Object.values(dateFilters).find(x => x.id === filter));
    return sortBy(sort, filterFunction ? videos.filter(x => filterFunction(x))
        : videos, searchFilter);
};

export const sortVideos = (filter, sort, videos,
    searchFilter) => filterByDate(filter, sort, videos, searchFilter);
