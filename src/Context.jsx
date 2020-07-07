import React, { createContext } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';

const getDisabledPages = appInfo => _.head(_.map(appInfo, value => (value.disabledPages)));

export const MyContext = createContext();

const MyProvider = props => (
    <MyContext.Provider value={{ disabledPages: props.disabledPages }}>
        {props.children}
    </MyContext.Provider>
);

MyProvider.defaultProps = {
    disabledPages: []
};

MyProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]).isRequired,
    disabledPages: PropTypes.arrayOf(PropTypes.string)
};

const mapDispatchToProps = {
};

const mapStateToProps = state => ({
    disabledPages: getDisabledPages(state.firestore.data.appInfo)
});

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect(() => [
        {
            collection: 'application-info',
            storeAs: 'appInfo'
        }
    ])
)(MyProvider);

export { MyProvider as MyProviderUnconnected };
