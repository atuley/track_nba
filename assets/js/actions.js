import thunk from 'redux-thunk';
import fetch from 'isomorphic-fetch';
import { polyfill } from 'es6-promise';
import socket from "./socket";
import _ from 'lodash';

import {
  CHANGE_NAME,
  RECEIVE_PLAYERS,
  UPDATE_PLAYER_STATE,
  RECEIVE_PLAYER_TO_WATCH,
  ADD_PLAYER_TO_WATCH
} from "./constants";

const defaultHeaders = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
};

export function addPlayer() {
  return {
    type: ADD_PLAYER_TO_WATCH,
    isLoading: true
  };
}

export function addPlayerToWatch(player) {
  return dispatch => {
    fetch(`/api/player/${player.personId}`, {
      headers: defaultHeaders,
      method: 'POST'
    })
      .then(grabJSON)
      .then((response) => {
        return dispatch(receivePlayer(response.data));
      });
  };
}

export function receivePlayer(player) {
  return {
    type: RECEIVE_PLAYER_TO_WATCH,
    player: player,
    isLoading: false
  };
}

export function subscribeToPlayerStats(player, playersWatching) {
  return dispatch => {
    let channel = socket.channel(`rooms:${player.personId}`);

    channel.join()
      .receive("ok", resp => { console.log("Joined player channel successful", resp); })
      .receive("error", resp => { console.log("Unable to join", resp); });

    channel.on("player_stat_update", payload => {
      console.log(`Got score update message for ${player.personId}`, payload);
      dispatch({type: UPDATE_PLAYER_STATE, player: payload.player});
    });
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

function grabJSON(response) {
  return response.json();
}
