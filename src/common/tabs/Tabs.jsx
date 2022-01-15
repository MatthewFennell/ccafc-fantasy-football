import * as React from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PropTypes from 'prop-types';
import { noop } from 'lodash';

const SelectableTabs = props => (
    <Tabs value={props.value} onChange={props.handleChange} aria-label="disabled tabs example">
        {props.options.map(option => <Tab label={option} key={option} />)}
    </Tabs>
);

SelectableTabs.defaultProps = {
    options: [],
    value: 0,
    handleChange: noop
};

SelectableTabs.propTypes = {
    options: PropTypes.arrayOf(PropTypes.string),
    value: PropTypes.number,
    handleChange: PropTypes.func
};

export default SelectableTabs;
