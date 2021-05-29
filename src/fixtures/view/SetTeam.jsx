import React from 'react';
import PropTypes from 'prop-types';
import { noop } from 'lodash';
import defaultStyles from './SetTeam.module.scss';
import Dropdown from '../../common/dropdown/Dropdown';
import StyledButton from '../../common/StyledButton/StyledButton';
import Spinner from '../../common/spinner/Spinner';
import LoadingDiv from '../../common/loadingDiv/LoadingDiv';

const Button = props => (
    <div className={props.styles.selectTeamWrapper}>
        <div className={props.styles.myTeam}>
            {props.loadingMyTeam ? <Spinner color="secondary" />
                : (
                    <div className={props.styles.detailWrapper}>
                        <div className={props.styles.key}>
                            My team
                        </div>
                        <div className={props.styles.value}>
                            {props.myTeam}
                        </div>
                    </div>
                )}
        </div>
        <div>
            <LoadingDiv isLoading={props.loadingFixtures} isPadding isBorderRadius>
                <Dropdown
                    value={props.activeTeam}
                    onChange={props.setActiveTeam}
                    options={props.teamOptions}
                    orderInput={false}
                    title="Set Team"
                    key="Set Team"
                />
            </LoadingDiv>
        </div>

        <div>
            <StyledButton
                onClick={props.updateMyTeam}
                color="primary"
                text="Update my team"
                disabled={Boolean(!props.activeTeam)
                    || props.activeTeam === props.myTeam
                    || props.loadingMyTeam}
            />
        </div>
    </div>
);

Button.defaultProps = {
    activeTeam: '',
    loadingMyTeam: false,
    loadingFixtures: false,
    myTeam: '',
    setActiveTeam: noop,
    styles: defaultStyles,
    teamOptions: [],
    updateMyTeam: noop
};

Button.propTypes = {
    activeTeam: PropTypes.string,
    loadingMyTeam: PropTypes.bool,
    loadingFixtures: PropTypes.bool,
    myTeam: PropTypes.string,
    setActiveTeam: PropTypes.func,
    styles: PropTypes.objectOf(PropTypes.string),
    teamOptions: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string,
        value: PropTypes.string,
        text: PropTypes.string
    })),
    updateMyTeam: PropTypes.func
};

export default Button;
