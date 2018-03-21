import React, {Component} from "react";
import {createStore, applyMiddleware, compose} from "redux";
import {Provider} from "react-redux";
import thunk from 'redux-thunk';
import rootReducer from "../reducers/index";
import { TrackNbaApp } from "../components/TrackNbaApp";

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div>
          <TrackNbaApp />
        </div>
      </Provider>
    );
  }
}
