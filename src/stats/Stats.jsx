import React, { useEffect, useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import fp from 'lodash/fp';
import EditIcon from '@material-ui/icons/Edit';
import defaultStyles from './Stats.module.scss';
import { fetchTeamsRequest } from '../admin/actions';
import Dropdown from '../common/dropdown/Dropdown';
import * as selectors from './selectors';
import * as constants from '../constants';
import { fetchTeamStatsByWeekRequest } from './actions';
import StyledButton from '../common/StyledButton/StyledButton';

const Stats = props => {
    useEffect(() => {
        props.fetchTeamsRequest();
    }, [props.fetchTeamsRequest]);

    useEffect(() => {
        if (props.currentTeam !== 'none' && props.currentGameWeek) {
            props.fetchTeamStatsByWeekRequest(props.currentTeam, props.currentGameWeek);
        }
    }, [props.currentTeam, props.currentGameWeek]);

    const [editFilterModalOpen, setEditFilterModalOpen] = useState(false);

    const loadNewTeam = useCallback(team => {
        const id = fp.get('id')(props.allTeams.find(x => x.text === team));
        props.history.push(`${constants.URL.STATS}/${id}/${props.minWeek}/${props.maxWeek}`);
    }, [props.currentGameWeek, props.currentTeam, props.allTeams]);

    return (
        <div className={props.styles.statsWrapper}>
            <div className={props.styles.statsHeader}>
                <Dropdown
                    activeValue={fp.getOr('', 'text')(props.allTeams.find(x => x.id === props.currentTeam))}
                    onChange={loadNewTeam}
                    options={props.allTeams}
                    title="Team"
                />
                <div className={props.styles.editFiltersWrapper}>
                    <div className={props.styles.editFilter}>
                        Edit Filters
                    </div>
                    <EditIcon />
                </div>
            </div>
        </div>
    );
};

Stats.defaultProps = {
    allTeams: [],
    currentGameWeek: 0,
    currentTeam: '',
    maxWeek: 0,
    minWeek: 0,
    styles: defaultStyles
};

Stats.propTypes = {
    allTeams: PropTypes.arrayOf(PropTypes.shape({})),
    currentGameWeek: PropTypes.number,
    currentTeam: PropTypes.string,
    fetchTeamStatsByWeekRequest: PropTypes.func.isRequired,
    fetchTeamsRequest: PropTypes.func.isRequired,
    history: PropTypes.shape({
        push: PropTypes.func.isRequired
    }).isRequired,
    maxWeek: PropTypes.number,
    minWeek: PropTypes.number,
    styles: PropTypes.objectOf(PropTypes.string)
};

const mapDispatchToProps = {
    fetchTeamsRequest,
    fetchTeamStatsByWeekRequest
};

const mapStateToProps = (state, props) => ({
    allTeams: state.admin.allTeams,
    minWeek: selectors.getCurrentMinWeek(props),
    maxWeek: selectors.getCurrentMaxWeek(props),
    currentTeam: selectors.getCurrentTeam(props),
    maxGameWeek: state.overview.maxGameWeek
});

export default connect(mapStateToProps, mapDispatchToProps)(Stats);
