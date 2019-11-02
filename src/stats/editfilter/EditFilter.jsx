import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { noop } from 'lodash';
import defaultStyles from './EditFilter.module.scss';
import Slider from '../../common/slider/Slider';
import StyledButton from '../../common/StyledButton/StyledButton';

export const marks = [
    {
        value: 0,
        label: '0'
    },
    {
        value: 2,
        label: '2'
    },
    {
        value: 4,
        label: '4'
    },
    {
        value: 6,
        label: '6'
    },
    {
        value: 8,
        label: '8'
    },
    {
        value: 10,
        label: '10'
    }
];

const EditFilter = props => {
    console.log('eh');
    const [minWeek, setMinWeek] = useState(props.minWeek);
    const [maxWeek, setMaxWeek] = useState(props.maxWeek);

    const confirm = useCallback(() => {
        props.confirmFilter(minWeek, maxWeek);
    }, [props.confirmFilter, minWeek, maxWeek]);

    return (
        <div className={props.styles.editFilterWrapper}>
            <Slider
                marks={marks}
                min={0}
                max={10}
                step={1}
                text="Min Week"
                onChange={setMinWeek}
                defaultValue={minWeek}
            />
            <Slider
                marks={marks}
                min={0}
                max={10}
                step={1}
                text="Max Week"
                onChange={setMaxWeek}
                defaultValue={maxWeek}
            />
            <StyledButton text="Confirm" onClick={confirm} />
        </div>
    );
};

EditFilter.defaultProps = {
    confirmFilter: noop,
    maxWeek: 0,
    minWeek: 0,
    styles: defaultStyles
};

EditFilter.propTypes = {
    confirmFilter: PropTypes.func,
    maxWeek: PropTypes.number,
    minWeek: PropTypes.number,
    styles: PropTypes.objectOf(PropTypes.string)
};

export default EditFilter;
