import thunk from 'redux-thunk';
import fetch from 'isomorphic-fetch';
import { polyfill } from 'es6-promise';
import socket from "./socket";

import {
  CHANGE_NAME,
  RECEIVE_PLAYERS,
  UPDATE_PLAYER_STATE
} from "./constants";

export function subscribeToPlayerStats(playerId) {
  return dispatch => {
    let channel = socket.channel(`rooms:${playerId}`);

    channel.join()
      .receive("ok", resp => { console.log("Joined player channel successful", resp); })
      .receive("error", resp => { console.log("Unable to join", resp); });

    console.log(channel);

    channel.on("player_stat_update", payload => {
      console.log(`Got score update message for ${playerId}` , payload);
      dispatch({type: UPDATE_PLAYER_STATE, stats: payload});
    });
  };
}

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
