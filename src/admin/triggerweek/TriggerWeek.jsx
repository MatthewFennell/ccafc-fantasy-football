import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useCallback, useState } from 'react';
import { connect } from 'react-redux';
import Dropdown from '../../common/dropdown/Dropdown';
import Spinner from '../../common/spinner/Spinner';
import StyledButton from '../../common/StyledButton/StyledButton';
import materialStyles from '../../materialStyles';
import { compressPlayersDatabase, recalculateLeaguePositionsRequest, triggerWeekRequest } from '../actions';
import defaultStyles from './TriggerWeek.module.scss';

const TriggerWeek = props => {
    const classes = makeStyles(materialStyles)();
    const [week, setWeek] = useState('');

    const triggerWeek = useCallback(() => {
        props.triggerWeekRequest(week);
        setWeek('');
        // eslint-disable-next-line
    }, [props.triggerWeekRequest, week]);

    const calculateOptions = (props.maxGameWeek || props.maxGameWeek === 0) ? [{
        id: props.maxGameWeek + 1,
        value: props.maxGameWeek + 1,
        text: props.maxGameWeek + 1
    }] : [];

    return (
        <Paper
            elevation={4}
            className={classes.paper}
        >
            <div className={props.styles.triggerWeekForm}>
                <Dropdown
                    value={week}
                    onChange={setWeek}
                    options={calculateOptions}
                    title="Week"
                    key="Week"
                />
            </div>
            <div className={props.styles.triggerWeekHeader}>
                <StyledButton
                    color="primary"
                    onClick={triggerWeek}
                    text="Trigger Week"
                    disabled={!(week && week !== 0)}
                />
            </div>
            <div className={props.styles.recalculateLeaguePositions}>
                <div className={props.styles.databaseButtons}>
                    <StyledButton
                        color="primary"
                        onClick={() => props.compressPlayersDatabase()}
                        text="Compress Players Database"
                        disabled={props.isRecalculatingLeaguePositions
                             || props.isCompressingDatabase}
                    />
                    <StyledButton
                        color="primary"
                        onClick={() => props.recalculateLeaguePositionsRequest()}
                        text="Recalculate League Positions"
                        disabled={props.isRecalculatingLeaguePositions
                            || props.isCompressingDatabase}
                    />
                </div>
                <div className={props.styles.recalculateInfo}>
                    Please do these only after submitting results
                    for all teams - expensive operation.
                </div>
                <div className={props.styles.recalculateInfo}>
                    You will need to compress the players database after
                    creating players for them to appear.
                </div>
            </div>
            <div className={classNames({
                [props.styles.hidden]: !props.triggeringWeek
                    && !props.isRecalculatingLeaguePositions && !props.isCompressingDatabase,
                [props.styles.spinner]: true
            })}
            >
                <Spinner color="secondary" />
            </div>

            <div className={props.styles.instructionsWrapper}>
                <div className={props.styles.instructionsHeader}>
                    Instructions on how to setup and run the app
                </div>

                <div>
                    <ul>
                        <li>
                            First you will need to create all of the teams in the Create Team tab.
                            May take a refresh or two for them to start coming through
                        </li>
                        <li>
                            Then create all of the players in the Create Player tab.
                            After creating ALL of the players, make sure to click
                            {' '}
                            <b>Compresss Players Database</b>
                            {' '}
                            in the Trigger week page (above).
                            (You will need to click compress for any new players added later on too)
                        </li>
                        <li>
                            Give people time to make their initial teams
                        </li>
                        <li>
                            Before the kick off of the first match of each week, use this page to
                            Trigger the week. This essentially locks in users teams for that week
                        </li>
                        <li>
                            Be careful when triggering weeks.
                            It is very tricky to undo that so just pay attention to the timing
                        </li>
                        <li>
                            Any transfers that users make will now apply for the following week
                        </li>
                        <li>
                            Once results come in, you can add them whenever you like
                            for the previous gameweeks.
                            I would recommend adding them all at the same time.
                        </li>
                        <li>
                            Additional info such as Red / Yellow cards needs to be
                            added separately to the normal goals / assists
                        </li>
                        <li>
                            After adding in all the results, click
                            {' '}
                            <b>Recalculate League Positions</b>
                        </li>
                        <li>
                            I try to make a copy of the database once per day and store it for 2
                            weeks, so it should be possible to go back in time if something goes
                            wrong. Although this would also undo any recent transfers users make
                        </li>

                        <li>
                            The cup should just run automatically without you needing to do anything
                        </li>
                        <li>
                            Player pricing is totally up to you
                        </li>
                        <li>
                            On the divisions page, you will need to add the links for each of the
                            divisons (Prem, Div 1 ...etc) for both men and women. This will
                            generate the fixtures list. Usually available somewhere
                            at
                            {' '}
                            <a href="https://www.dur.ac.uk/teamdurham/participation/collegesport/sport/">https://www.dur.ac.uk/teamdurham/participation/collegesport/sport</a>
                        </li>
                        <li>
                            Any questions just message me on Facebook or email me at
                            {' '}
                            <a href="mailto:m.fennell@live.co.uk">m.fennell@live.co.uk</a>
                        </li>
                    </ul>

                    <div className={props.styles.instructionsHeader}>
                        Weekly order of operations
                    </div>

                    <div>
                        1) Trigger Week
                    </div>

                    <div>
                        2) Submit all results
                    </div>

                    <div>
                        3) Click recalculate league positions
                        (wait a minute after entering the last result)
                    </div>
                </div>
            </div>
        </Paper>
    );
};

TriggerWeek.defaultProps = {
    isRecalculatingLeaguePositions: false,
    compressPlayersDatabase: false,
    maxGameWeek: null,
    isCompressingDatabase: false,
    styles: defaultStyles,
    triggeringWeek: false
};

TriggerWeek.propTypes = {
    isRecalculatingLeaguePositions: PropTypes.bool,
    isCompressingDatabase: PropTypes.bool,
    compressPlayersDatabase: PropTypes.func,
    maxGameWeek: PropTypes.number,
    styles: PropTypes.objectOf(PropTypes.string),
    triggeringWeek: PropTypes.bool,
    recalculateLeaguePositionsRequest: PropTypes.func.isRequired,
    triggerWeekRequest: PropTypes.func.isRequired
};

const mapDispatchToProps = {
    compressPlayersDatabase,
    recalculateLeaguePositionsRequest,
    triggerWeekRequest
};

const mapStateToProps = state => ({
    isRecalculatingLeaguePositions: state.admin.isRecalculatingLeaguePositions,
    isCompressingDatabase: state.admin.isCompressingDatabase,
    triggeringWeek: state.admin.triggeringWeek,
    triggerWeekError: state.admin.triggerWeekError,
    triggerWeekErrorCode: state.admin.triggerWeekErrorCode,
    maxGameWeek: state.overview.maxGameWeek
});

export default connect(mapStateToProps, mapDispatchToProps)(TriggerWeek);

export { TriggerWeek as TriggerWeekUnconnected };
