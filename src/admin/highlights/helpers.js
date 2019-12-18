/* eslint-disable no-underscore-dangle */
// eslint-disable-next-line import/prefer-default-export
export const dateFilters = {
    pastDay: {
        label: '> 24 hours',
        id: 'pastDay',
        filterFunction: d => {
            const date = new Date(d.dateCreated._seconds * 1000);
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            return date < yesterday;
        }
    },
    pastWeek: {
        label: '> 1 week',
        id: 'pastWeek',
        filterFunction: d => {
            const date = new Date(d.dateCreated._seconds * 1000);
            const lastWeek = new Date();
            lastWeek.setDate(lastWeek.getDate() - 7);
            return date < lastWeek;
        }
    },
    pastMonth: {
        label: '> 1 month',
        id: 'pastMonth',
        filterFunction: d => {
            const date = new Date(d.dateCreated._seconds * 1000);
            const lastMonth = new Date();
            lastMonth.setMonth(lastMonth.getMonth() - 1);
            return date < lastMonth;
        }
    },
    pastYear: {
        label: '> 1 year',
        id: 'pastYear',
        filterFunction: d => {
            const date = new Date(d.dateCreated._seconds * 1000);
            const lastYear = new Date();
            lastYear.setFullYear(lastYear.getFullYear() - 1);
            return date < lastYear;
        }
    },
    allTime: {
        label: 'All Time',
        id: 'allTime',
        filterFunction: () => true
    }
};

const filterBySearch = (videos, searchFilter) => {
    console.log('videos', videos);
    return videos
        .filter(x => x.email.includes(searchFilter)
    || x.title.toLowerCase().includes(searchFilter.toLowerCase()));
};

export const filterByDate = (filter, videos, searchFilter) => {
    const { filterFunction } = Object.values(dateFilters).find(x => x.id === filter);
    return filterBySearch(videos.filter(x => filterFunction(x)), searchFilter);
};
