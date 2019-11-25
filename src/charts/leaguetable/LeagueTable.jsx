import React, { useState } from 'react';
import PropTypes from 'prop-types';
import defaultStyles from './LeagueTable.module.scss';
import Grid from '../../common/grid/Grid';
import * as helpers from '../helpers';
import Slider from '../../common/slider/Slider';

const LeagueTable = props => {
    const [minWeek, setMinWeek] = useState(1);
    const [maxWeek, setMaxWeek] = useState(props.maxGameweek);
    const leagueTable = helpers.generateLeagueTable(props.allTeams, minWeek, maxWeek);
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
    allTeams: [],
    fetchingAllTeams: false,
    maxGameweek: 0,
    styles: defaultStyles
};

LeagueTable.propTypes = {
    allTeams: PropTypes.arrayOf(PropTypes.shape({})),
    fetchingAllTeams: PropTypes.bool,
    maxGameweek: PropTypes.number,
    styles: PropTypes.objectOf(PropTypes.string)
};

export default LeagueTable;