import React from 'react';
import PropTypes from 'prop-types';
import { noop } from 'lodash';
import defaultStyles from './TableModal.module.scss';
import Toggle from '../../common/Toggle/Toggle';
import RadioButton from '../../common/radio/RadioButton';

const TableModal = props => (
    <div className={props.styles.tableModalWrapper}>
        <div className={props.styles.columnToggles}>
            {props.columnOptions.filter(x => !x.fixed).map(x => (
                <div>
                    <div className={props.styles.columnName}>
                        {x.name}
                    </div>
                    <div>
                        <Toggle
                            color="primary"
                            checked={props.activeColumns.includes(x.id)}
                            disabled={(!props.activeColumns.includes(x.id) && props.activeColumns.length >= 4)
                                  || (props.activeColumns.includes(x.id) && props.activeColumns.length <= 2)}
                            onChange={() => props.toggleColumns(x.id)}
                        />
                    </div>
                </div>
            ))}
        </div>
        <div className={props.styles.sortingWrapper}>
            <div>
                <RadioButton
                    label="Sort By"
                    onChange={props.setSortBy}
                    options={props.activeColumns
                        .map(x => ({ label: x.charAt(0).toUpperCase() + x.slice(1) }))}
                    value={props.sortBy}
                />
            </div>
            <div>
                {props.sortingComponent}
            </div>
        </div>
    </div>
);

TableModal.defaultProps = {
    activeColumns: [],
    columnOptions: [],
    setSortBy: noop,
    sortBy: '',
    styles: defaultStyles,
    toggleColumns: noop
};

TableModal.propTypes = {
    activeColumns: PropTypes.arrayOf(PropTypes.string),
    columnOptions: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string
    })),
    setSortBy: PropTypes.func,
    sortBy: PropTypes.string,
    styles: PropTypes.objectOf(PropTypes.string),
    toggleColumns: PropTypes.func
};

export default TableModal;
