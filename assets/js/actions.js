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
  RECEIVE_CACHED_PLAYERS,
  ADD_PLAYER_TO_WATCH,
  REMOVE_PLAYER
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

export function removePlayer(player) {
  // debugger;
  console.log("in here");
  localStorage.removeItem('playersWatching')

  let channel = socket.channel(`rooms:${player.personId}`);
  channel.leave()
    .receive("ok", resp => { console.log("Left successful", resp); })
    .receive("error", resp => { console.log("Unable to leave", resp); });

  return {
    type: REMOVE_PLAYER,
    playersWatching: []
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

export function getCachedPlayers() {
  var cachedPlayers = JSON.parse(localStorage.getItem('playersWatching'));
  return dispatch => {
    dispatch(sendCachedPlayers(cachedPlayers))
    for (var i = 0; i < cachedPlayers.length; i++) {
      let channel = socket.channel(`rooms:${cachedPlayers[i].personId}`);

      channel.join()
        .receive("ok", resp => { console.log("Joined player channel successful", resp); })
        .receive("error", resp => { console.log("Unable to join", resp); });

      channel.on("player_stat_update", payload => {
        console.log(`Got score update message for ${payload.player.personId}`, payload);
        dispatch({type: UPDATE_PLAYER_STATE, player: payload.player});
      });
    }
  }
}

export function sendCachedPlayers(cachedPlayers) {
  return {
    type: RECEIVE_CACHED_PLAYERS,
    playersWatching: cachedPlayers
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
