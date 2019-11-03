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
import StyledModal from '../common/modal/StyledModal';
import EditFilter from './editfilter/EditFilter';
import { columns } from './helpers';

const Stats = props => {
    useEffect(() => {
        props.fetchTeamsRequest();
    }, [props.fetchTeamsRequest]);

    const [editFilterModalOpen, setEditFilterModalOpen] = useState(false);
    const [activeColumns, setActiveColumns] = useState(columns
        .filter(x => x.initialActive).map(x => x.id));

    const loadNewTeam = useCallback(team => {
        const id = fp.get('id')(props.allTeams.find(x => x.text === team));
        props.history.push(`${constants.URL.STATS}/${id}/${props.minWeek}/${props.maxWeek}`);
    }, [props.currentGameWeek, props.currentTeam, props.allTeams]);

    const confirmFilter = useCallback((minWeek, maxWeek, active) => {
        setActiveColumns(active);
        props.history.push(`${constants.URL.STATS}/${props.currentTeam}/${minWeek}/${maxWeek}`);
        setEditFilterModalOpen(false);
    }, [props.currentTeam, props.history]);

    return (
        <>
            <div className={props.styles.statsWrapper}>
                <div className={props.styles.statsHeader}>
                    <div className={props.styles.dropdownWrapper}>
                        <Dropdown
                            activeValue={fp.getOr('', 'text')(props.allTeams.find(x => x.id === props.currentTeam))}
                            onChange={loadNewTeam}
                            options={props.allTeams}
                            title="Team"
                        />
                    </div>
                    <div
                        className={props.styles.editFiltersWrapper}
                        role="button"
                        tabIndex={0}
                        onClick={() => setEditFilterModalOpen(true)}
                    >
                        <div className={props.styles.editFilter}>
                        Edit Filters
                        </div>
                        <EditIcon color="primary" />
                    </div>
                </div>


            </div>
            <StyledModal
                backdrop
                closeModal={() => setEditFilterModalOpen(false)}
                isOpen={editFilterModalOpen}
                headerMessage="Edit Filters"
            >
                <EditFilter
                    activeColumns={activeColumns}
                    allColumns={columns}
                    confirmFilter={confirmFilter}
                    maxWeek={props.maxWeek}
                    minWeek={props.minWeek}
                />
            </StyledModal>
        </>
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
