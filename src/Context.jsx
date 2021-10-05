import _ from 'lodash';
import PropTypes from 'prop-types';
import React, { createContext } from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import * as appConstants from './constants';
import { getCorrectYear } from './common';

const getDisabledPages = appInfo => _.get(appInfo, 'disabledPages') || [];

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
            collection: 'fantasy-years',
            doc: getCorrectYear(),
            subcollections: [
                { collection: 'application-info', doc: appConstants.APPLICATION_INFO_ID }
            ],
            storeAs: 'appInfo'
        }
    ])
)(MyProvider);

export { MyProvider as MyProviderUnconnected };
