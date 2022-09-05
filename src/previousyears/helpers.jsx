import React from 'react';
import fp from 'lodash/fp';
import classNames from 'classnames';

export const sortListAscDescDesktop = (list, isAscending, property) => {
    if (isAscending) {
        return fp.sortBy(property)(list);
    }
    return fp.sortBy(property)(list).reverse();
};

export const headerCell = (sortBy, activeSort, styles, expectedSort) => (
    <div
        className={classNames({
            [styles.activeSort]: activeSort === expectedSort,
            [styles.headerCell]: true
        })}
        role="button"
        tabIndex={0}
        onClick={() => sortBy(expectedSort)}
    >
        {expectedSort}
    </div>
);

export const columns = (sortBy, activeSort, styles) => [
    {
        id: 'name',
        name: 'Name',
        label: headerCell(sortBy, activeSort, styles, 'Name'),
        fixed: true,
        active: true,
        align: 'center'
    },
    {
        id: 'team',
        name: 'Team',
        label: headerCell(sortBy, activeSort, styles, 'Team'),
        fixed: false,
        active: true,
        align: 'center'
    },
    {
        id: 'price',
        name: 'Price',
        label: headerCell(sortBy, activeSort, styles, 'Price'),
        fixed: false,
        active: true,
        align: 'center'
    },
    {
        id: 'goals',
        name: 'Goals',
        label: headerCell(sortBy, activeSort, styles, 'Goals'),
        fixed: false,
        active: true,
        align: 'center'
    },
    {
        id: 'assists',
        name: 'Assists',
        label: headerCell(sortBy, activeSort, styles, 'Assists'),
        fixed: false,
        active: true,
        align: 'center'
    },
    {
        id: 'points',
        name: 'Points',
        label: headerCell(sortBy, activeSort, styles, 'Points'),
        fixed: false,
        active: true,
        align: 'center'
    },
    {
        id: 'manOfTheMatchs',
        name: 'MOTMs',
        label: headerCell(sortBy, activeSort, styles, 'MOTMs'),
        fixed: false,
        active: true,
        align: 'center'
    },
    {
        id: 'dickOfTheDays',
        name: 'DOTDs',
        label: headerCell(sortBy, activeSort, styles, 'DOTDs'),
        fixed: false,
        active: true,
        align: 'center'
    },
    {
        id: 'yellowCards',
        name: 'Yellows',
        label: headerCell(sortBy, activeSort, styles, 'Yellows'),
        fixed: false,
        active: true,
        align: 'center'
    },
    {
        id: 'redCards',
        name: 'Reds',
        label: headerCell(sortBy, activeSort, styles, 'Reds'),
        fixed: false,
        active: true,
        align: 'center'
    },
    {
        id: 'cleanSheets',
        name: 'Clean Sheets',
        label: headerCell(sortBy, activeSort, styles, 'CleanSheets'),
        fixed: false,
        active: true,
        align: 'center'
    },
    {
        id: 'ownGoals',
        name: 'Own Goals',
        label: headerCell(sortBy, activeSort, styles, 'OwnGoals'),
        fixed: false,
        active: true,
        align: 'center'
    },
    {
        id: 'penaltyMisses',
        name: 'Pen Misses',
        label: headerCell(sortBy, activeSort, styles, 'PenaltyMisses'),
        fixed: false,
        active: true,
        align: 'center'
    },
    {
        id: 'penaltySaves',
        name: 'Pen Saves',
        label: headerCell(sortBy, activeSort, styles, 'PenaltySaves'),
        fixed: false,
        active: true,
        align: 'center'
    }
];
