/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { noop } from 'lodash';
import defaultStyles from './LeagueTable.module.scss';
import Grid from '../../common/grid/Grid';
import * as helpers from '../helpers';

const LeagueTable = props => {
    const leagueTable = useCallback(() => helpers.generateNewTable(props.fixtures),
        [props.fixtures]);

    return (
        <>
            <div
                className={props.styles.leagueTableBuffer}
                onClick={() => props.setIsCollapsableOpen(false)}
                tabIndex={0}
                role="button"
            />
            <Grid
                columns={helpers.columns}
                gridHeader="League Table"
                loading={props.loadingFixtures}
                maxHeight={600}
                rows={leagueTable()}
                rowsPerPageOptions={[20]}
                showPagination={false}
            />
        </>
    );
};

LeagueTable.defaultProps = {
    fixtures: [],
    loadingFixtures: false,
    setIsCollapsableOpen: noop,
    styles: defaultStyles
};

LeagueTable.propTypes = {
    fixtures: PropTypes.arrayOf(PropTypes.shape({
        teamOne: PropTypes.string,
        result: PropTypes.string,
        teamTwo: PropTypes.string,
        location: PropTypes.string,
        time: PropTypes.string,
        completed: PropTypes.bool,
        league: PropTypes.string
    })),
    loadingFixtures: PropTypes.bool,
    setIsCollapsableOpen: PropTypes.func,
    styles: PropTypes.objectOf(PropTypes.string)
};

export default LeagueTable;
