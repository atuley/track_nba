import { applyMiddleware, createStore } from "redux"

import logger from "redux-logger"
import thunk from "redux-thunk"
// import promise from "redux-promise-middleware"

import rootReducer from "./reducers/index"

const middleware = applyMiddleware(thunk)

export default createStore(rootReducer, middleware, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
