/* eslint-disable no-underscore-dangle */

export const dateFilters = {
    pastDay: {
        label: 'Past 24 hours',
        id: 'pastDay',
        filterFunction: d => {
            const date = new Date(d.dateCreated._seconds * 1000);
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            return date > yesterday;
        }
    },
    pastWeek: {
        label: 'Past week',
        id: 'pastWeek',
        filterFunction: d => {
            const date = new Date(d.dateCreated._seconds * 1000);
            const lastWeek = new Date();
            lastWeek.setDate(lastWeek.getDate() - 7);
            return date > lastWeek;
        }
    },
    pastMonth: {
        label: 'Past month',
        id: 'pastMonth',
        filterFunction: d => {
            const date = new Date(d.dateCreated._seconds * 1000);
            const lastMonth = new Date();
            lastMonth.setMonth(lastMonth.getMonth() - 1);
            return date > lastMonth;
        }
    },
    pastYear: {
        label: 'Past year',
        id: 'pastYear',
        filterFunction: d => {
            const date = new Date(d.dateCreated._seconds * 1000);
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
        sortFunction: vids => vids.sort((a, b) => b.dateCreated._seconds - a.dateCreated._seconds)
    },
    oldestFirst: {
        label: 'Oldest First',
        id: 'oldestFirst',
        sortFunction: vids => vids.sort((a, b) => a.dateCreated._seconds - b.dateCreated._seconds)
    },
    mostPopular: {
        label: 'Most Popular',
        id: 'mostPopular',
        sortFunction: vids => vids.sort((a, b) => (b.upvotes.length - b.downvotes.length)
        - (a.upvotes.length - a.downvotes.length))
    },
    leastPopular: {
        label: 'Least Popular',
        id: 'leastPopular',
        sortFunction: vids => vids.sort((a, b) => (a.upvotes.length - a.downvotes.length)
        - (b.upvotes.length - b.downvotes.length))
    }
};

const sortBy = (sort, videos) => {
    const { sortFunction } = Object.values(sortByFilters).find(x => x.id === sort);
    return sortFunction(videos);
};

const filterByDate = (filter, sort, videos) => {
    const { filterFunction } = Object.values(dateFilters).find(x => x.id === filter);
    return sortBy(sort, videos.filter(x => filterFunction(x)));
};

export const sortVideos = (filter, sort, videos) => filterByDate(filter, sort, videos);
