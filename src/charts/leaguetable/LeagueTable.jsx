import React, { useState } from 'react';
import PropTypes from 'prop-types';
import defaultStyles from './LeagueTable.module.scss';
import Grid from '../../common/grid/Grid';
import * as helpers from '../helpers';
import Slider from '../../common/slider/Slider';

const LeagueTable = props => {
    const [minWeek, setMinWeek] = useState(1);
    const [maxWeek, setMaxWeek] = useState(props.maxGameweek);
    const leagueTable = helpers.generateNewTable(props.fixtures);
    return (
        <div className={props.styles.leagueTableWrapper}>
            <div className={props.styles.sliderWrapper}>
                <Slider
                    marks={helpers.marks(props.maxGameweek)}
                    min={1}
                    max={props.maxGameweek}
                    step={1}
                    text="From Week"
                    onChange={setMinWeek}
                    defaultValue={minWeek}
                    showMarker={false}
                />
                <Slider
                    marks={helpers.marks(props.maxGameweek)}
                    min={1}
                    max={props.maxGameweek}
                    step={1}
                    text="To Week"
                    onChange={setMaxWeek}
                    defaultValue={maxWeek}
                    showMarker={false}
                />
            </div>
            <Grid
                columns={helpers.columns}
                gridHeader="League Table"
                loading={props.fetchingAllTeams}
                rows={leagueTable}
                rowsPerPageOptions={[20]}
                showPagination={false}
            />
        </div>
    );
};

LeagueTable.defaultProps = {
    fetchingAllTeams: false,
    fixtures: [],
    maxGameweek: 0,
    styles: defaultStyles
};

LeagueTable.propTypes = {
    fetchingAllTeams: PropTypes.bool,
    fixtures: PropTypes.arrayOf(PropTypes.shape({
        teamOne: PropTypes.string,
        result: PropTypes.string,
        teamTwo: PropTypes.string,
        location: PropTypes.string,
        time: PropTypes.string,
        completed: PropTypes.bool,
        league: PropTypes.string
    })),
    maxGameweek: PropTypes.number,
    styles: PropTypes.objectOf(PropTypes.string)
};

export default LeagueTable;
