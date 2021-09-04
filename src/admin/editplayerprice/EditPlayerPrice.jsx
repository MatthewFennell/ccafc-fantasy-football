import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import fp from 'lodash/fp';
import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Dropdown from '../../common/dropdown/Dropdown';
import Fade from '../../common/Fade/Fade';
import LoadingDiv from '../../common/loadingDiv/LoadingDiv';
import Spinner from '../../common/spinner/Spinner';
import StyledButton from '../../common/StyledButton/StyledButton';
import * as textInputConstants from '../../common/TextInput/constants';
import TextInput from '../../common/TextInput/TextInput';
import materialStyles from '../../materialStyles';
import { editPlayerPriceRequest, fetchPlayersForTeamRequest, fetchTeamsRequest } from '../actions';
import defaultStyles from './EditPlayerPrice.module.scss';

const EditPlayerPrice = props => {
    const classes = makeStyles(materialStyles)();
    const [playerName, setPlayerName] = useState('');
    const [playerTeam, setPlayerTeam] = useState('');
    const [newPrice, setNewPrice] = useState('');

    useEffect(() => {
        props.fetchTeamsRequest();
        // eslint-disable-next-line
    }, [props.fetchTeamsRequest]);

    const setTeam = useCallback(name => {
        setPlayerTeam(name);
        props.fetchPlayersForTeamRequest(name);
        // eslint-disable-next-line
    }, [props.fetchPlayersForTeamRequest, playerTeam, setPlayerTeam]);

    const playersForActiveTeam = fp.getOr([], playerTeam)(props.teamsWithPlayers);

    const nameToId = name => fp.get('id')(playersForActiveTeam.find(a => a.value === name));
    const nameToPrice = name => fp.get('price')(playersForActiveTeam.find(a => a.value === name));

    const editPlayerPrice = useCallback(() => {
        if (!playerTeam || !playerName || !newPrice) {
            return;
        }
        props.editPlayerPriceRequest(nameToId(playerName), newPrice, playerTeam);
        setPlayerName('');
        setPlayerTeam('');
        setNewPrice('');
        // eslint-disable-next-line
    }, [playerName, props.editPlayerPriceRequest, nameToId]);

    return (
        <Paper
            elevation={4}
            className={classes.paper}
        >
            <div className={props.styles.editPlayerPriceForm}>
                <div className={props.styles.editPlayerPriceDropdowns}>
                    <LoadingDiv
                        isLoading={props.isFetchingTeams}
                        isBorderRadius
                    >
                        <Dropdown
                            value={playerTeam}
                            onChange={setTeam}
                            options={props.allTeams}
                            title="Team"
                            key="Team"
                        />
                    </LoadingDiv>
                    <LoadingDiv
                        isLoading={props.isFetchingPlayersForTeam}
                        isBorderRadius
                    >
                        <Dropdown
                            value={playerName}
                            onChange={setPlayerName}
                            options={playersForActiveTeam}
                            title="Player"
                            key="Player"
                        />
                    </LoadingDiv>
                </div>
            </div>

            <Fade checked={Boolean(playerName)}>
                <div className={props.styles.currentPrice}>
                    <div className={props.styles.currentPriceKey}>
                        Current Price:
                    </div>
                    <div className={props.styles.currentPriceValue}>
                        {`£${nameToPrice(playerName)}m`}
                    </div>
                </div>

                <div className={props.styles.newPrice}>
                    <TextInput
                        icon={textInputConstants.textInputIcons.money}
                        onChange={setNewPrice}
                        value={newPrice}
                        iconColor="primary"
                        type="number"
                        label="Set new price"
                        onSubmit={editPlayerPrice}
                    />
                </div>
            </Fade>

            <div className={props.styles.editPlayerPriceHeader}>
                <StyledButton
                    color="primary"
                    onClick={editPlayerPrice}
                    text="Edit Player Price"
                    disabled={!playerTeam || !playerName || !newPrice}
                />
            </div>

            <div className={classNames({
                [props.styles.spinner]: true,
                [props.styles.hidden]: !props.isEditingPlayerPrice
            })}
            >
                <Spinner color="secondary" />
            </div>
        </Paper>
    );
};

EditPlayerPrice.defaultProps = {
    allTeams: [],
    isFetchingPlayersForTeam: false,
    isFetchingTeams: false,
    styles: defaultStyles
};

EditPlayerPrice.propTypes = {
    allTeams: PropTypes.arrayOf(PropTypes.shape({})),
    editPlayerPriceRequest: PropTypes.func.isRequired,
    isEditingPlayerPrice: PropTypes.bool.isRequired,
    fetchTeamsRequest: PropTypes.func.isRequired,
    fetchPlayersForTeamRequest: PropTypes.func.isRequired,
    isFetchingPlayersForTeam: PropTypes.bool,
    isFetchingTeams: PropTypes.bool,
    styles: PropTypes.objectOf(PropTypes.string),
    teamsWithPlayers: PropTypes.objectOf(PropTypes.array).isRequired
};

const mapDispatchToProps = {
    editPlayerPriceRequest,
    fetchTeamsRequest,
    fetchPlayersForTeamRequest
};

const mapStateToProps = state => ({
    allTeams: state.admin.allTeams,
    isEditingPlayerPrice: state.admin.isEditingPlayerPrice,
    isFetchingPlayersForTeam: state.admin.isFetchingPlayersForTeam,
    isFetchingTeams: state.admin.isFetchingTeams,
    teamsWithPlayers: state.admin.teamsWithPlayers
});

export default connect(mapStateToProps, mapDispatchToProps)(EditPlayerPrice);

export { EditPlayerPrice as EditPlayerPriceUnconnected };
