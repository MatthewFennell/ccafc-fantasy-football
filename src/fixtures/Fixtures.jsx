import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import _, { noop } from 'lodash';
import { connect } from 'react-redux';
import defaultStyles from './Fixtures.module.scss';
import { fetchFixturesRequest } from './actions';
import Dropdown from '../common/dropdown/Dropdown';
import StyledButton from '../common/StyledButton/StyledButton';

const generateCollingwoodTeams = fixtures => fixtures
    .reduce((prev, curr) => _.uniqBy(
        [...prev, curr.teamOne, curr.teamTwo]
    ), [])
    .filter(x => x.includes('Collingwood'))
    .sort()
    .map(x => ({
        id: x,
        value: x,
        text: x
    }));

const Fixtures = props => {
    const [myTeam, setMyTeam] = useState('');

    useEffect(() => {
        props.fetchFixturesRequest();
    }, []);

    return (
        <div>
            <div className={props.styles.selectTeamWrapper}>
                <div>
                    My Team: Collingwood B
                </div>
                <div>
                    <Dropdown
                        activeValue={myTeam}
                        onChange={setMyTeam}
                        options={generateCollingwoodTeams(props.fixtures)}
                        title="My Team"
                        key="My Team"
                    />
                </div>

                <div>
                    <StyledButton
                        onClick={noop}
                        color="primary"
                        text="Update my team"
                    />
                </div>
            </div>
        </div>
    );
};

Fixtures.defaultProps = {
    fetchFixturesRequest: noop,
    fixtures: [],
    styles: defaultStyles
};

Fixtures.propTypes = {
    fetchFixturesRequest: PropTypes.func,
    fixtures: PropTypes.arrayOf(PropTypes.shape({
        teamOne: PropTypes.string,
        result: PropTypes.string,
        teamTwo: PropTypes.string,
        location: PropTypes.string,
        time: PropTypes.string,
        completed: PropTypes.bool,
        league: PropTypes.string
    })),
    styles: PropTypes.objectOf(PropTypes.string)
};

const mapStateToProps = state => ({
    fixtures: state.fixtures.fixtures
});

const mapDispatchToProps = {
    fetchFixturesRequest
};

export default connect(mapStateToProps, mapDispatchToProps)(Fixtures);
