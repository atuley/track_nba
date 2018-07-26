import { applyMiddleware, createStore, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/index';

const middleware = applyMiddleware(thunk);

// export default createStore(rootReducer,
// compose(middleware, window.__REDUX_DEVTOOLS_EXTENSION__
//  && window.__REDUX_DEVTOOLS_EXTENSION__()))
export default createStore(rootReducer, compose(middleware));
