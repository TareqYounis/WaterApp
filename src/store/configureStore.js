import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
//added middleware to redux to teach it how to deal with different kind of actions.
// Thunk: handles the case where we dont return an object in a action creator, instead a function
import thunk from 'redux-thunk';
import reducer from './reducers/root';

// combine reducers, compines the output of multiple reducers into state.
const rootReducer = combineReducers({
    names: reducer,
    enquiry : reducer
});

let composeEnhancers = compose;

if(__DEV__){
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}

const configureStore = () => {
    return createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)) );
};

export default configureStore;


// import { createStore, combineReducers } from 'redux';

// import reducer from './reducers/root';

// const rootReducer = combineReducers({
//     names: reducer
// });

// const configureStore = () => {
//     return createStore(rootReducer);
// };

// export default configureStore;