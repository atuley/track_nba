import thunk from 'redux-thunk';
import fetch from 'isomorphic-fetch';
import { polyfill } from 'es6-promise';
import socket from "./socket";
import _ from 'lodash';

import {
  CHANGE_NAME,
  RECEIVE_PLAYERS,
  UPDATE_PLAYER_STATE,
  RECEIVE_PLAYER_TO_WATCH
} from "./constants";

const defaultHeaders = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
};

export function addPlayerToWatch(player) {
  return dispatch => {
    fetch(`/api/player/${player.id}`, {
      headers: defaultHeaders,
      method: 'POST'
    })
      .then(grabJSON)
      .then((response) => {
        // console.log(`RESPONSE: ${response.data}`);
        return dispatch(receivePlayer(response.data));
      });
  };
}

export function receivePlayer(player) {
  return {
    type: RECEIVE_PLAYER_TO_WATCH,
    player: player
  };
}

export function subscribeToPlayerStats(player, playersWatching) {
  // debugger;
  return dispatch => {
    let channel = socket.channel(`rooms:${player.id}`);

    channel.join()
      .receive("ok", resp => { console.log("Joined player channel successful", resp); })
      .receive("error", resp => { console.log("Unable to join", resp); });

    // console.log(channel);

    channel.on("player_stat_update", payload => {
      console.log(`Got score update message for ${player.id}`, payload);
      dispatch({type: UPDATE_PLAYER_STATE, stats: {[player.id]: payload.log.stats}});
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
