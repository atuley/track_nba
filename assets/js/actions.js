import thunk from 'redux-thunk';
import fetch from 'isomorphic-fetch';
import { polyfill } from 'es6-promise';
import socket from "./socket";
import _ from 'lodash';

import {
  RECEIVE_PLAYERS,
  RECEIVE_PLAYER_TO_WATCH,
  RECEIVE_CACHED_PLAYERS,
  ADD_PLAYER_TO_WATCH,
  REMOVE_PLAYER
} from "./constants";

const defaultHeaders = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
};

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
    fetch(`/api/players/${cachedPlayers}`, {
      headers: defaultHeaders,
      method: 'POST'
    })
      .then(grabJSON)
      .then((response) => {
        return dispatch(sendCachedPlayers(response.data));
      });
  };
}

export function removePlayer(playersWatching, player) {
  var cachedPlayers = JSON.parse(localStorage.getItem('playersWatching'))
  var index = _.findIndex(cachedPlayers, function(o) {
    return o == player.personId;
  });

  cachedPlayers.splice(index, 1)
  localStorage.setItem('playersWatching', JSON.stringify(cachedPlayers))

  var newPlayersWatching = playersWatching.slice(0)
  newPlayersWatching.splice(index, 1)

  return {
    type: REMOVE_PLAYER,
    playersWatching: newPlayersWatching
  };
}

export function addPlayer() {
  return {
    type: ADD_PLAYER_TO_WATCH,
    isLoading: true
  };
}

export function receivePlayer(player) {
  return {
    type: RECEIVE_PLAYER_TO_WATCH,
    player: player,
    isLoading: false
  };
}

export function sendCachedPlayers(cachedPlayers) {
  return {
    type: RECEIVE_CACHED_PLAYERS,
    playersWatching: cachedPlayers
  };
}

export function receivePlayers(players) {
  var newPlayers = players;
  if (localStorage.getItem('playersWatching')) {
    var cachedPlayers = JSON.parse(localStorage.getItem('playersWatching'));
    for (var i = 0; i < newPlayers.length; i++) {
      for (var j = 0; j < cachedPlayers.length; j++) {
        if (cachedPlayers[j] == newPlayers[i].personId) {
          newPlayers[i].isWatching = true
        }
      }
    }
  }
  return {
    type: RECEIVE_PLAYERS,
    players: newPlayers
  };
}

function grabJSON(response) {
  return response.json();
}
