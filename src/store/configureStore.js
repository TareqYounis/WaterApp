import { createStore, combineReducers } from 'redux';

import reducer from './reducers/root';

const rootReducer = combineReducers({
    names: reducer
});

const configureStore = () => {
    return createStore(rootReducer);
};

export default configureStore;