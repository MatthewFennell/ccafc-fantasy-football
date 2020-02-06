import * as helpers from './helpers';

const videosPositiveKarma = [
    {
        upvotes: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        downvotes: [1, 2, 3, 4, 5]
    },
    {
        upvotes: [1, 2, 3, 4, 5],
        downvotes: []
    }
];

const videosNegativeKarma = [
    {
        upvotes: [1, 2],
        downvotes: [1, 2, 3, 4, 5]
    },
    {
        upvotes: [1, 2, 3, 4, 5],
        downvotes: [1, 2, 3, 4, 5, 6, 7, 8, 9]
    }
];

describe('Karma calculations', () => {
    it('Generates the correct amount of karma when positive', () => {
        expect(helpers.generateKarma(videosPositiveKarma)).toEqual('+10');
    });

    it('Generates the correct amount of karma when negative', () => {
        expect(helpers.generateKarma(videosNegativeKarma)).toEqual('-7');
    });
});
