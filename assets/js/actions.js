import thunk from 'redux-thunk';
import fetch from 'isomorphic-fetch';
import { polyfill } from 'es6-promise';
import { updateWatchingState } from './utils';
import _ from 'lodash';

import {
  RECEIVE_PLAYERS,
  RECEIVE_PLAYER_TO_WATCH,
  RECEIVE_CACHED_PLAYERS,
  ADD_PLAYER_TO_WATCH,
  REMOVE_PLAYER,
  defaultHeaders,
  fetchPlayersStarted,
  fetchPlayersError,
  fetchPlayersSuccess,
  fetchCachedPlayersStarted,
  fetchCachedPlayersError,
  fetchCachedPlayersSuccess,
  fetchPlayerStarted,
  fetchPlayerError,
  fetchPlayerSuccess,
} from "./constants";

export function getAllPlayers() {
  return dispatch => {
    dispatch(fetchPlayersStarted());
    fetch(`/api/players`)
      .then(response => response.json())
      .then(players => dispatch(fetchPlayersSuccess(updateWatchingState(players.data))))
      .catch(error => dispatch(fetchPlayersError(error)));
  };
}

export function getCachedPlayers() {
  const cachedPlayers = JSON.parse(localStorage.getItem('playersWatching'));

  return dispatch => {
    dispatch(fetchCachedPlayersStarted());
    fetch(`/api/players/${cachedPlayers}`, {headers: defaultHeaders, method: 'POST'})
      .then(response => response.json())
      .then(players => dispatch(fetchCachedPlayersSuccess(players.data)))
      .catch(error => dispatch(fetchCachedPlayersError(error)));
  };
}

export function addPlayerToWatch(player) {
  return dispatch => {
    dispatch(fetchPlayerStarted())
    fetch(`/api/player/${player.personId}`, {headers: defaultHeaders, method: 'POST'})
      .then(response => response.json())
      .then(player => dispatch(fetchPlayerSuccess(player.data)))
      .catch(error => dispatch(fetchPlayerError(error)));
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
    playersWatching: newPlayersWatching,
    personId: player.personId
  };
}
