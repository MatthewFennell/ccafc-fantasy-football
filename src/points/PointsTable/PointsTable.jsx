import React from 'react';
import PropTypes from 'prop-types';
import defaultStyles from './PointsTable.module.scss';
import Grid from '../../common/grid/Grid';
import { POINTS } from '../../constants';

const columns = [
    {
        id: 'stat',
        label: 'Stat',
        align: 'center'
    },
    {
        id: 'value',
        label: 'Value',
        align: 'center'
    },
    {
        id: 'points',
        label: 'Points',
        align: 'center'
    }
];

const generateRows = player => {
    const rows = [
        {
            stat: 'Goals',
            value: player.goals,
            points: POINTS.GOAL[player.position] * player.goals,
            showField: true
        },
        {
            stat: 'Assists',
            value: player.assists,
            points: POINTS.ASSIST * player.assists,
            showField: true
        },
        {
            stat: 'Clean Sheet',
            value: player.cleanSheet ? 'Yes' : 'No',
            points: player.cleanSheet && POINTS.CLEAN_SHEET[player.position],
            showField: player.cleanSheet && player.position !== 'ATTACKER'
        },
        {
            stat: 'Yellow Card',
            value: player.yellowCard ? '1' : '0',
            points: POINTS.YELLOW_CARD,
            showField: player.yellowCard
        },
        {
            stat: 'Red Card',
            value: player.redCard ? '1' : '0',
            points: POINTS.RED_CARD,
            showField: player.redCard
        },
        {
            stat: 'Total',
            value: '',
            points: player.points,
            showField: true
        }
    ];
    return rows;
};

const PointsTable = props => (
    <div>
        <div className={props.styles.playerInfoWrapper}>
            <div className={props.styles.playerName}>
                {props.player.name}
            </div>
            <div className={props.styles.playerTeam}>
                {props.player.team}
            </div>
            <div className={props.styles.playerPosition}>
                {props.player.position}
            </div>
        </div>
        <Grid
            columns={columns}
            rows={generateRows(props.player).filter(row => row.showField)}
            showPagination={false}
        />
    </div>
);

PointsTable.defaultProps = {
    player: {},
    styles: defaultStyles
};

PointsTable.propTypes = {
    player: PropTypes.shape({
        assists: PropTypes.number,
        cleanSheet: PropTypes.bool,
        goals: PropTypes.number,
        id: PropTypes.string,
        name: PropTypes.string,
        points: PropTypes.number,
        position: PropTypes.string,
        redCard: PropTypes.bool,
        team: PropTypes.string,
        yellowCard: PropTypes.bool
    }),
    styles: PropTypes.objectOf(PropTypes.string)
};

export default PointsTable;
