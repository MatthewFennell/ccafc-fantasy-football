import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { noop } from 'lodash';
import defaultStyles from './EditFilter.module.scss';
import Slider from '../../common/slider/Slider';
import StyledButton from '../../common/StyledButton/StyledButton';
import { marks } from '../helpers';
import Toggle from '../../common/Toggle/Toggle';


const EditFilter = props => {
    const [minWeek, setMinWeek] = useState(props.minWeek);
    const [maxWeek, setMaxWeek] = useState(props.maxWeek);
    const [activeColumns, setActiveColumns] = useState(props.activeColumns);

    const toggle = useCallback(item => {
        if (activeColumns.includes(item)) {
            setActiveColumns(activeColumns.filter(x => x !== item));
        } else {
            setActiveColumns(activeColumns.concat([item]));
        }
    }, [activeColumns]);

    const confirm = useCallback(() => {
        props.confirmFilter(minWeek, maxWeek, activeColumns);
    }, [props.confirmFilter, minWeek, maxWeek, activeColumns]);

    return (
        <div className={props.styles.editFilterWrapper}>
            <Slider
                marks={marks}
                min={0}
                max={10}
                step={1}
                text="From Week"
                onChange={setMinWeek}
                defaultValue={minWeek}
            />
            <Slider
                marks={marks}
                min={0}
                max={10}
                step={1}
                text="To Week"
                onChange={setMaxWeek}
                defaultValue={maxWeek}
            />
            <div className={props.styles.togglesWrapper}>
                {props.allColumns.map(x => (
                    <div key={x.id}>
                        <div className={props.styles.columnName}>
                            {x.label}
                        </div>
                        <div>
                            <Toggle
                                color="primary"
                                checked={activeColumns.includes(x.id)}
                                onChange={() => toggle(x.id)}
                            />
                        </div>
                    </div>
                ))}
            </div>
            <div className={props.styles.confirmButton}>
                <StyledButton text="Confirm" onClick={confirm} />
            </div>
        </div>
    );
};

EditFilter.defaultProps = {
    activeColumns: [],
    allColumns: [],
    confirmFilter: noop,
    maxWeek: 0,
    minWeek: 0,
    styles: defaultStyles
};

EditFilter.propTypes = {
    activeColumns: PropTypes.arrayOf(PropTypes.string),
    allColumns: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string,
        label: PropTypes.string
    })),
    confirmFilter: PropTypes.func,
    maxWeek: PropTypes.number,
    minWeek: PropTypes.number,
    styles: PropTypes.objectOf(PropTypes.string)
};

export default EditFilter;
