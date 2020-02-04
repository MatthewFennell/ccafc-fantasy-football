import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import defaultStyles from './MatchRow.module.scss';

const covertToTime = d => moment(d, 'DD-MM-YYYY hh:mm').format('HH:mm');

const isLive = date => moment()
    .isAfter(moment(date, 'DD-MM-YYYY hh:mm'))
    && moment().isBefore(moment(date, 'DD-MM-YYYY hh:mm').add(100, 'minutes'));

const renderTeamName = name => {
    if (name.includes('St. Hild & St. Bede')) {
        return name.replace('St. Hild & St. Bede', 'Hild Bede');
    }
    if (name.includes('Josephine Butler')) {
        return name.replace('Josephine Butler', 'Butler');
    }
    if (name.includes('St. Cuthbert\'s')) {
        return name.replace('St. Cuthbert\'s', 'Cuths');
    }
    return name;
};

const MatchRow = props => (
    <div className={props.styles.matchWrapper}>
        <div className={props.styles.leftHand}>
            {isLive(props.match.time) && (
                <div className={props.styles.matchLive}>
                    <div className={props.styles.greenIcon}>
                        <FiberManualRecordIcon color="green" fontSize="small" />
                    </div>
                    <div className={props.styles.liveText}>
                        Live
                    </div>
                </div>
            )}
            <div className={props.styles.teamOne}>
                {renderTeamName(props.match.teamOne)}
            </div>
        </div>
        <div className={props.styles.versus}>
            VS
        </div>
        <div className={props.styles.rightHand}>
            <div className={props.styles.teamTwo}>
                {renderTeamName(props.match.teamTwo)}
            </div>
            <div className={props.styles.info}>
                {covertToTime(props.match.time)}
            </div>
        </div>
    </div>
);

MatchRow.defaultProps = {
    match: {},
    styles: defaultStyles
};

MatchRow.propTypes = {
    match: PropTypes.shape({
        teamOne: PropTypes.string,
        result: PropTypes.string,
        teamTwo: PropTypes.string,
        location: PropTypes.string,
        time: PropTypes.string,
        completed: PropTypes.bool,
        league: PropTypes.string
    }),
    styles: PropTypes.objectOf(PropTypes.string)
};

export default MatchRow;
