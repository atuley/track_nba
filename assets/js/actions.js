import thunk from 'redux-thunk';
import fetch from 'isomorphic-fetch';
import { polyfill } from 'es6-promise';
import _ from 'lodash';
import {
  updateWatchingState,
  updatePlayersWatching,
} from './utils';

import {
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
} from './constants';

export function getAllPlayers() {
  return (dispatch) => {
    dispatch(fetchPlayersStarted());
    fetch('/api/players')
      .then(response => response.json())
      .then(players => dispatch(fetchPlayersSuccess(updateWatchingState(players.data))))
      .catch(error => dispatch(fetchPlayersError(error)));
  };
}

export function getCachedPlayers() {
  const cachedPlayers = JSON.parse(localStorage.getItem('playersWatching'));

  return (dispatch) => {
    dispatch(fetchCachedPlayersStarted());
    fetch(`/api/players/${cachedPlayers}`, { headers: defaultHeaders, method: 'POST' })
      .then(response => response.json())
      .then(players => dispatch(fetchCachedPlayersSuccess(players.data)))
      .catch(error => dispatch(fetchCachedPlayersError(error)));
  };
}

export function addPlayerToWatch(player, playersWatching) {
  return (dispatch) => {
    dispatch(fetchPlayerStarted());
    fetch(`/api/player/${player.personId}`, { headers: defaultHeaders, method: 'POST' })
      .then(response => response.json())
      .then(player => dispatch(fetchPlayerSuccess(updatePlayersWatching(player.data, playersWatching))))
      .catch(error => dispatch(fetchPlayerError(error)));
  };
}

export function removePlayer(playersWatching, player, players) {
  const cachedPlayers = JSON.parse(localStorage.getItem('playersWatching'));
  const newPlayers = players.slice(0);
  const cachedIndex = _.findIndex(cachedPlayers, cp => cp == player.personId);
  const index = _.findIndex(newPlayers, p => p.personId == player.personId);
  const newPlayersWatching = playersWatching.slice(0);

  // Remove player from cache, reset watching state
  cachedPlayers.splice(cachedIndex, 1);
  newPlayersWatching.splice(cachedIndex, 1);
  localStorage.setItem('playersWatching', JSON.stringify(cachedPlayers));
  newPlayers[index].isWatching = false;

  return {
    type: REMOVE_PLAYER,
    playersWatching: newPlayersWatching,
    players: newPlayers,
  };
}
