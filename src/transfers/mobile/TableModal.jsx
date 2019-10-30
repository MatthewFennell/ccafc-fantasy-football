import React from 'react';
import PropTypes from 'prop-types';
import { noop } from 'lodash';
import defaultStyles from './TableModal.module.scss';
import Toggle from '../../common/Toggle/Toggle';

const TableModal = props => {
    console.log('ey');
    console.log('columns options', props.columnOptions);
    return (
        <div className={props.styles.tableModalWrapper}>
            <div className={props.styles.columnToggles}>
                {props.columnOptions.filter(x => !x.fixed).map(x => (
                    <div>
                        <div className={props.styles.columnName}>
                            {x.id.charAt(0).toUpperCase() + x.id.slice(1)}
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


        </div>
    );
};

TableModal.defaultProps = {
    activeColumns: [],
    columnOptions: [],
    styles: defaultStyles,
    toggleColumns: noop
};

TableModal.propTypes = {
    activeColumns: PropTypes.arrayOf(PropTypes.string),
    columnOptions: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string
    })),
    styles: PropTypes.objectOf(PropTypes.string),
    toggleColumns: PropTypes.func
};

export default TableModal;
