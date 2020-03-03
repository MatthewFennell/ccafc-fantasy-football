/* eslint-disable no-use-before-define */

import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import CircularProgress from '@material-ui/core/CircularProgress';
import defaultStyles from './Autocomplete.module.scss';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const AutocompleteCheckbox = props => (
    <div className={classNames({
        [props.styles.autocompletePadding]: props.withPadding
    })}
    >
        <Autocomplete
            multiple
            id="checkboxes-tags-demo"
            options={top100Films}
            disableCloseOnSelect
            getOptionLabel={option => option.title}
            loading={props.loading}
            renderOption={(option, { selected }) => (
                <>
                    <Checkbox
                        icon={icon}
                        checkedIcon={checkedIcon}
                        style={{ marginRight: 8 }}
                        checked={selected}
                    />
                    {option.title}
                </>
            )}
            style={{ width: 500 }}
            renderInput={params => (
                <TextField
                    {...params}
                    variant="outlined"
                    label="Checkboxes"
                    placeholder="Favorites"
                    InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                            <>
                                {props.loading ? (
                                    <CircularProgress
                                        color={props.loadingColor}
                                        size={20}
                                    />
                                ) : null}
                                {params.InputProps.endAdornment}
                            </>
                        )
                    }}
                />
            )}
        />
    </div>
);

AutocompleteCheckbox.propTypes = {
    loading: PropTypes.bool,
    loadingColor: PropTypes.string,
    withPadding: PropTypes.bool,
    styles: PropTypes.objectOf(PropTypes.string)
};

AutocompleteCheckbox.defaultProps = {
    loading: false,
    loadingColor: 'primary',
    withPadding: false,
    styles: defaultStyles
};

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const top100Films = [
    { title: 'The Shawshank Redemption', year: 1994 },
    { title: 'The Godfather', year: 1972 },
    { title: 'The Godfather: Part II', year: 1974 },
    { title: 'The Dark Knight', year: 2008 },
    { title: '12 Angry Men', year: 1957 },
    { title: 'Schindler\'s List', year: 1993 },
    { title: 'Pulp Fiction', year: 1994 },
    { title: 'The Lord of the Rings: The Return of the King', year: 2003 },
    { title: 'The Good, the Bad and the Ugly', year: 1966 },
    { title: 'Fight Club', year: 1999 },
    { title: 'The Lord of the Rings: The Fellowship of the Ring', year: 2001 },
    { title: 'Star Wars: Episode V - The Empire Strikes Back', year: 1980 },
    { title: 'Forrest Gump', year: 1994 },
    { title: 'Inception', year: 2010 },
    { title: 'The Lord of the Rings: The Two Towers', year: 2002 },
    { title: 'One Flew Over the Cuckoo\'s Nest', year: 1975 },
    { title: 'Goodfellas', year: 1990 },
    { title: 'The Matrix', year: 1999 },
    { title: 'Seven Samurai', year: 1954 },
    { title: 'Star Wars: Episode IV - A New Hope', year: 1977 },
    { title: 'City of God', year: 2002 },
    { title: 'Se7en', year: 1995 },
    { title: 'The Silence of the Lambs', year: 1991 },
    { title: 'It\'s a Wonderful Life', year: 1946 },
    { title: 'Life Is Beautiful', year: 1997 },
    { title: 'The Usual Suspects', year: 1995 },
    { title: 'Léon: The Professional', year: 1994 },
    { title: 'Spirited Away', year: 2001 },
    { title: 'Saving Private Ryan', year: 1998 },
    { title: 'Once Upon a Time in the West', year: 1968 },
    { title: 'American History X', year: 1998 },
    { title: 'Interstellar', year: 2014 }
];

export default AutocompleteCheckbox;
