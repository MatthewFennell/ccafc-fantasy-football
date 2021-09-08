import Slider from '@material-ui/core/Slider';
import { makeStyles } from '@material-ui/core/styles';
import { noop } from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import defaultStyles from './Slider.module.scss';

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%'
    },
    margin: {
        height: theme.spacing(3)
    }

}));

function valuetext(value) {
    return value;
}

const CustomSlider = props => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <div className={props.styles.sliderText}>
                {props.text}
            </div>
            <Slider
                onChange={(e, value) => {
                    e.stopPropagation();
                    e.preventDefault();
                    props.onChange(value);
                }}
                defaultValue={props.defaultValue}
                getAriaValueText={valuetext}
                aria-labelledby="discrete-slider-always"
                step={props.step}
                marks={props.marks}
                min={props.min}
                max={props.max}
                valueLabelDisplay={props.showMarker ? 'on' : 'off'}
                value={props.value}
            />
        </div>
    );
};

CustomSlider.defaultProps = {
    defaultValue: 0,
    marks: [],
    max: 0,
    min: 0,
    onChange: noop,
    showMarker: true,
    step: 1,
    styles: defaultStyles,
    text: '',
    value: 0
};

CustomSlider.propTypes = {
    defaultValue: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    marks: PropTypes.arrayOf(PropTypes.shape({
        value: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number
        ]),
        label: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number
        ])
    })),
    max: PropTypes.number,
    min: PropTypes.number,
    onChange: PropTypes.func,
    showMarker: PropTypes.bool,
    step: PropTypes.number,
    styles: PropTypes.objectOf(PropTypes.string),
    text: PropTypes.string,
    value: PropTypes.number
};

export default CustomSlider;
