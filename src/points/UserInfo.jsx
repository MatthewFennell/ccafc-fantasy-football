import React from 'react';
import PropTypes from 'prop-types';
import defaultStyles from './UserInfo.module.scss';
import Spinner from '../common/spinner/Spinner';

const getTotalOfStat = (team, stat) => team.reduce((prev, cur) => prev + cur[stat], 0);

const UserInfo = props => {
    const entry = (key, value) => (
        <div className={props.styles.detailWrapper}>
            <div className={props.styles.key}>
                {key}
            </div>
            <div className={props.styles.value}>
                {value}
            </div>
        </div>
    );

    return (
        props.fetchingDetails
            ? (
                <div className={props.styles.loadingSpinner}>
                    <Spinner color="secondary" />
                </div>
            )
            : (
                <>
                    {entry('User', props.displayName)}
                    {entry('Team name', props.teamName)}
                    {entry('Week points', getTotalOfStat(props.team, 'points'))}
                    <div className={props.styles.spacing} />
                    {entry('# Goals', getTotalOfStat(props.team, 'goals'))}
                    {entry('# Assists', getTotalOfStat(props.team, 'assists'))}
                    <div className={props.styles.spacing} />
                    {props.photoUrl && (
                        <div className={props.styles.photoWrapper}>
                            <img
                                className={props.styles.photo}
                                src={props.photoUrl}
                                alt="Error loading"
                            />
                        </div>
                    )}
                </>
            )
    );
};

UserInfo.defaultProps = {
    displayName: '',
    fetchingDetails: false,
    photoUrl: '',
    teamName: '',
    styles: defaultStyles,
    team: []
};

UserInfo.propTypes = {
    displayName: PropTypes.string,
    fetchingDetails: PropTypes.bool,
    photoUrl: PropTypes.string,
    teamName: PropTypes.string,
    styles: PropTypes.objectOf(PropTypes.string),
    team: PropTypes.arrayOf(PropTypes.shape({
        points: PropTypes.number
    }))
};

export default UserInfo;
