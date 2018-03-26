import thunk from 'redux-thunk';
import fetch from 'isomorphic-fetch';
import { polyfill } from 'es6-promise';

import {
  CHANGE_NAME,
  RECEIVE_PLAYERS
} from "./constants";

export function changeTheName() {
  return {
    type: CHANGE_NAME,
    name: "New name"
  };
}

export function getAllPlayers() {
  return dispatch => {
    fetch(`/api/players`)
      .then(grabJSON)
      .then((response) => {
        return dispatch(receivePlayers(response.data));
      });
  };
}

export function receivePlayers(players) {
  return {
    type: RECEIVE_PLAYERS,
    players: players
  };
}

//this will go away even
function grabJSON(response) {
  return response.json();
}
