import MockDate from 'mockdate';
import * as helpers from './helpers';

// Mock Date will be September 10 2005
const featuresToFilterByDate = [
    {
        title: 'Title',
        videoId: 'LYMGGgbOz1k',
        displayName: 'TestUser',
        dateCreated: {
            _seconds: 1126213259,
            nanoseconds: 0 // 8th Sep 2005 10:00:59 PM
        },
        email: 'test@gmail.com',
        userId: '7PVMOpCKtHhLu3XuyUv9oUHKO943',
        id: 'TvbIMaRdF50Cex5VSWyG'
    },
    {
        title: 'Title',
        videoId: 'LYMGGgbOz1k',
        displayName: 'TestUser',
        dateCreated: {
            _seconds: 1126299659,
            nanoseconds: 0 // 9th Sep 2005 10:00:59 PM
        },
        email: 'test@gmail.com',
        userId: '7PVMOpCKtHhLu3XuyUv9oUHKO943',
        id: 'TvbIMaRdF50Cex5VSWyG'
    },
    {
        title: 'Title',
        videoId: 'LYMGGgbOz1k',
        displayName: 'TestUser',
        dateCreated: {
            _seconds: 1125694859,
            nanoseconds: 0 // 2nd Sep 2005 10:00:59 PM
        },
        email: 'test@gmail.com',
        userId: '7PVMOpCKtHhLu3XuyUv9oUHKO943',
        id: 'TvbIMaRdF50Cex5VSWyG'
    },
    {
        title: 'Title',
        videoId: 'LYMGGgbOz1k',
        displayName: 'TestUser',
        dateCreated: {
            _seconds: 1125781259,
            nanoseconds: 0 // 3rd Sep 2005 10:00:59 PM
        },
        email: 'test@gmail.com',
        userId: '7PVMOpCKtHhLu3XuyUv9oUHKO943',
        id: 'TvbIMaRdF50Cex5VSWyG'
    },
    {
        title: 'Title',
        videoId: 'LYMGGgbOz1k',
        displayName: 'TestUser',
        dateCreated: {
            _seconds: 1123707659,
            nanoseconds: 0 // 10th Aug 2005 10:00:59 PM
        },
        email: 'test@gmail.com',
        userId: '7PVMOpCKtHhLu3XuyUv9oUHKO943',
        id: 'TvbIMaRdF50Cex5VSWyG'
    },
    {
        title: 'Title',
        videoId: 'LYMGGgbOz1k',
        displayName: 'TestUser',
        dateCreated: {
            _seconds: 1123534859,
            nanoseconds: 0 // 8th Aug 2005 10:00:59 PM
        },
        email: 'test@gmail.com',
        userId: '7PVMOpCKtHhLu3XuyUv9oUHKO943',
        id: 'TvbIMaRdF50Cex5VSWyG'
    },
    {
        title: 'Title',
        videoId: 'LYMGGgbOz1k',
        displayName: 'TestUser',
        dateCreated: {
            _seconds: 1094850059,
            nanoseconds: 0 // 10th Sep 2004 10:00:59 PM
        },
        email: 'test@gmail.com',
        userId: '7PVMOpCKtHhLu3XuyUv9oUHKO943',
        id: 'TvbIMaRdF50Cex5VSWyG'
    },
    {
        title: 'Title',
        videoId: 'LYMGGgbOz1k',
        displayName: 'TestUser',
        dateCreated: {
            _seconds: 873925259,
            nanoseconds: 0 // 10th Sep 1997 10:00:59 PM
        },
        email: 'test@gmail.com',
        userId: '7PVMOpCKtHhLu3XuyUv9oUHKO943',
        id: 'TvbIMaRdF50Cex5VSWyG'
    }
];

describe('Highlight helpers', () => {
    afterAll(() => {
        MockDate.reset();
    });

    it('Should filter to include only the past 24 hours', () => {
        MockDate.set('9/10/2005'); // 10th Sep
        expect(helpers.filterByDate('pastDay', featuresToFilterByDate, '')).toEqual([
            {
                title: 'Title',
                videoId: 'LYMGGgbOz1k',
                displayName: 'TestUser',
                dateCreated: {
                    _seconds: 1126299659,
                    nanoseconds: 0 // 9th Sep 2005 10:00:59 PM
                },
                email: 'test@gmail.com',
                userId: '7PVMOpCKtHhLu3XuyUv9oUHKO943',
                id: 'TvbIMaRdF50Cex5VSWyG'
            }
        ]);
    });

    it('Should filter to include only the past week', () => {
        MockDate.set('9/10/2005'); // 10th Sep
        expect(helpers.filterByDate('pastWeek', featuresToFilterByDate, '')).toEqual([
            {
                title: 'Title',
                videoId: 'LYMGGgbOz1k',
                displayName: 'TestUser',
                dateCreated: {
                    _seconds: 1126213259,
                    nanoseconds: 0 // 9th Sep 2005 10:00:59 PM
                },
                email: 'test@gmail.com',
                userId: '7PVMOpCKtHhLu3XuyUv9oUHKO943',
                id: 'TvbIMaRdF50Cex5VSWyG'
            },
            {
                title: 'Title',
                videoId: 'LYMGGgbOz1k',
                displayName: 'TestUser',
                dateCreated: {
                    _seconds: 1126299659,
                    nanoseconds: 0 // 8th Sep 2005 10:00:59 PM
                },
                email: 'test@gmail.com',
                userId: '7PVMOpCKtHhLu3XuyUv9oUHKO943',
                id: 'TvbIMaRdF50Cex5VSWyG'
            },
            {
                title: 'Title',
                videoId: 'LYMGGgbOz1k',
                displayName: 'TestUser',
                dateCreated: {
                    _seconds: 1125781259,
                    nanoseconds: 0 // 3rd Sep 2005 10:00:59 PM
                },
                email: 'test@gmail.com',
                userId: '7PVMOpCKtHhLu3XuyUv9oUHKO943',
                id: 'TvbIMaRdF50Cex5VSWyG'
            }
        ]);
    });

    it('Should filter to include only the past month', () => {
        MockDate.set('9/10/2005'); // 10th Sep
        expect(helpers.filterByDate('pastMonth', featuresToFilterByDate, '')).toEqual([
            {
                title: 'Title',
                videoId: 'LYMGGgbOz1k',
                displayName: 'TestUser',
                dateCreated: {
                    _seconds: 1126213259,
                    nanoseconds: 0 // 9th Sep 2005 10:00:59 PM
                },
                email: 'test@gmail.com',
                userId: '7PVMOpCKtHhLu3XuyUv9oUHKO943',
                id: 'TvbIMaRdF50Cex5VSWyG'
            },
            {
                title: 'Title',
                videoId: 'LYMGGgbOz1k',
                displayName: 'TestUser',
                dateCreated: {
                    _seconds: 1126299659,
                    nanoseconds: 0 // 8th Sep 2005 10:00:59 PM
                },
                email: 'test@gmail.com',
                userId: '7PVMOpCKtHhLu3XuyUv9oUHKO943',
                id: 'TvbIMaRdF50Cex5VSWyG'
            },
            {
                title: 'Title',
                videoId: 'LYMGGgbOz1k',
                displayName: 'TestUser',
                dateCreated: {
                    _seconds: 1125694859,
                    nanoseconds: 0 // 3rd Sep 2005 10:00:59 PM
                },
                email: 'test@gmail.com',
                userId: '7PVMOpCKtHhLu3XuyUv9oUHKO943',
                id: 'TvbIMaRdF50Cex5VSWyG'
            },
            {
                title: 'Title',
                videoId: 'LYMGGgbOz1k',
                displayName: 'TestUser',
                dateCreated: {
                    _seconds: 1125781259,
                    nanoseconds: 0 // 2nd Sep 2005 10:00:59 PM
                },
                email: 'test@gmail.com',
                userId: '7PVMOpCKtHhLu3XuyUv9oUHKO943',
                id: 'TvbIMaRdF50Cex5VSWyG'
            },
            {
                title: 'Title',
                videoId: 'LYMGGgbOz1k',
                displayName: 'TestUser',
                dateCreated: {
                    _seconds: 1123707659,
                    nanoseconds: 0 // 10th Aug 2005 10:00:59 PM
                },
                email: 'test@gmail.com',
                userId: '7PVMOpCKtHhLu3XuyUv9oUHKO943',
                id: 'TvbIMaRdF50Cex5VSWyG'
            }
        ]);
    });

    it('Should filter to include only the past year', () => {
        MockDate.set('9/10/2005'); // 10th Sep
        expect(helpers.filterByDate('pastYear', featuresToFilterByDate, '')).toEqual([
            {
                title: 'Title',
                videoId: 'LYMGGgbOz1k',
                displayName: 'TestUser',
                dateCreated: {
                    _seconds: 1126213259,
                    nanoseconds: 0 // 9th Sep 2005 10:00:59 PM
                },
                email: 'test@gmail.com',
                userId: '7PVMOpCKtHhLu3XuyUv9oUHKO943',
                id: 'TvbIMaRdF50Cex5VSWyG'
            },
            {
                title: 'Title',
                videoId: 'LYMGGgbOz1k',
                displayName: 'TestUser',
                dateCreated: {
                    _seconds: 1126299659,
                    nanoseconds: 0 // 8th Sep 2005 10:00:59 PM
                },
                email: 'test@gmail.com',
                userId: '7PVMOpCKtHhLu3XuyUv9oUHKO943',
                id: 'TvbIMaRdF50Cex5VSWyG'
            },
            {
                title: 'Title',
                videoId: 'LYMGGgbOz1k',
                displayName: 'TestUser',
                dateCreated: {
                    _seconds: 1125694859,
                    nanoseconds: 0 // 3rd Sep 2005 10:00:59 PM
                },
                email: 'test@gmail.com',
                userId: '7PVMOpCKtHhLu3XuyUv9oUHKO943',
                id: 'TvbIMaRdF50Cex5VSWyG'
            },
            {
                title: 'Title',
                videoId: 'LYMGGgbOz1k',
                displayName: 'TestUser',
                dateCreated: {
                    _seconds: 1125781259,
                    nanoseconds: 0 // 2nd Sep 2005 10:00:59 PM
                },
                email: 'test@gmail.com',
                userId: '7PVMOpCKtHhLu3XuyUv9oUHKO943',
                id: 'TvbIMaRdF50Cex5VSWyG'
            },
            {
                title: 'Title',
                videoId: 'LYMGGgbOz1k',
                displayName: 'TestUser',
                dateCreated: {
                    _seconds: 1123707659,
                    nanoseconds: 0 // 10th Aug 2005 10:00:59 PM
                },
                email: 'test@gmail.com',
                userId: '7PVMOpCKtHhLu3XuyUv9oUHKO943',
                id: 'TvbIMaRdF50Cex5VSWyG'
            },
            {
                title: 'Title',
                videoId: 'LYMGGgbOz1k',
                displayName: 'TestUser',
                dateCreated: {
                    _seconds: 1123534859,
                    nanoseconds: 0 // 8th Aug 2005 10:00:59 PM
                },
                email: 'test@gmail.com',
                userId: '7PVMOpCKtHhLu3XuyUv9oUHKO943',
                id: 'TvbIMaRdF50Cex5VSWyG'
            },
            {
                title: 'Title',
                videoId: 'LYMGGgbOz1k',
                displayName: 'TestUser',
                dateCreated: {
                    _seconds: 1094850059,
                    nanoseconds: 0 // 10th Sep 2004 10:00:59 PM
                },
                email: 'test@gmail.com',
                userId: '7PVMOpCKtHhLu3XuyUv9oUHKO943',
                id: 'TvbIMaRdF50Cex5VSWyG'
            }
        ]);
    });

    it('Should filter to include all time', () => {
        MockDate.set('9/10/2005'); // 10th Sep
        expect(helpers.filterByDate('allTime', featuresToFilterByDate, '')).toEqual([
            {
                title: 'Title',
                videoId: 'LYMGGgbOz1k',
                displayName: 'TestUser',
                dateCreated: {
                    _seconds: 1126213259,
                    nanoseconds: 0 // 9th Sep 2005 10:00:59 PM
                },
                email: 'test@gmail.com',
                userId: '7PVMOpCKtHhLu3XuyUv9oUHKO943',
                id: 'TvbIMaRdF50Cex5VSWyG'
            },
            {
                title: 'Title',
                videoId: 'LYMGGgbOz1k',
                displayName: 'TestUser',
                dateCreated: {
                    _seconds: 1126299659,
                    nanoseconds: 0 // 8th Sep 2005 10:00:59 PM
                },
                email: 'test@gmail.com',
                userId: '7PVMOpCKtHhLu3XuyUv9oUHKO943',
                id: 'TvbIMaRdF50Cex5VSWyG'
            },
            {
                title: 'Title',
                videoId: 'LYMGGgbOz1k',
                displayName: 'TestUser',
                dateCreated: {
                    _seconds: 1125694859,
                    nanoseconds: 0 // 3rd Sep 2005 10:00:59 PM
                },
                email: 'test@gmail.com',
                userId: '7PVMOpCKtHhLu3XuyUv9oUHKO943',
                id: 'TvbIMaRdF50Cex5VSWyG'
            },
            {
                title: 'Title',
                videoId: 'LYMGGgbOz1k',
                displayName: 'TestUser',
                dateCreated: {
                    _seconds: 1125781259,
                    nanoseconds: 0 // 2nd Sep 2005 10:00:59 PM
                },
                email: 'test@gmail.com',
                userId: '7PVMOpCKtHhLu3XuyUv9oUHKO943',
                id: 'TvbIMaRdF50Cex5VSWyG'
            },
            {
                title: 'Title',
                videoId: 'LYMGGgbOz1k',
                displayName: 'TestUser',
                dateCreated: {
                    _seconds: 1123707659,
                    nanoseconds: 0 // 10th Aug 2005 10:00:59 PM
                },
                email: 'test@gmail.com',
                userId: '7PVMOpCKtHhLu3XuyUv9oUHKO943',
                id: 'TvbIMaRdF50Cex5VSWyG'
            },
            {
                title: 'Title',
                videoId: 'LYMGGgbOz1k',
                displayName: 'TestUser',
                dateCreated: {
                    _seconds: 1123534859,
                    nanoseconds: 0 // 8th Aug 2005 10:00:59 PM
                },
                email: 'test@gmail.com',
                userId: '7PVMOpCKtHhLu3XuyUv9oUHKO943',
                id: 'TvbIMaRdF50Cex5VSWyG'
            },
            {
                title: 'Title',
                videoId: 'LYMGGgbOz1k',
                displayName: 'TestUser',
                dateCreated: {
                    _seconds: 1094850059,
                    nanoseconds: 0 // 10th Sep 2004 10:00:59 PM
                },
                email: 'test@gmail.com',
                userId: '7PVMOpCKtHhLu3XuyUv9oUHKO943',
                id: 'TvbIMaRdF50Cex5VSWyG'
            },
            {
                title: 'Title',
                videoId: 'LYMGGgbOz1k',
                displayName: 'TestUser',
                dateCreated: {
                    _seconds: 873925259,
                    nanoseconds: 0 // 10th Sep 1997 10:00:59 PM
                },
                email: 'test@gmail.com',
                userId: '7PVMOpCKtHhLu3XuyUv9oUHKO943',
                id: 'TvbIMaRdF50Cex5VSWyG'
            }
        ]);
    });
});
