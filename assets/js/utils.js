import _ from 'lodash';
import React from 'react';

export function searchPlayers(searchContent, { target: { value: searchText } }) {
  const searchQuery = _.toLower(searchText);

  const updatedPlayers = _.filter(this.props[searchContent], player => _.chain(player)
    .values()
    .toLower()
    .includes(searchQuery)
    .value());

  this.setState({
    [searchContent]: updatedPlayers,
  });
}

export function updateWatchingState(players) {
  const newPlayers = players.slice(0);
  const cachedPlayers = JSON.parse(localStorage.getItem('playersWatching'));

  if (localStorage.getItem('playersWatching')) {
    newPlayers.forEach((player) => {
      if (cachedPlayers.includes(player.personId)) {
        player.isWatching = true;
      }
    });
  }
  return newPlayers;
}

export function updatePlayersWatching(player, playersWatching) {
  const updatedPlayersWatching = _.concat(playersWatching, player);
  const updatedCachedPlayers = [];

  _.forEach(updatedPlayersWatching, (player) => {
    updatedCachedPlayers.push(player.personId);
  });
  localStorage.setItem('playersWatching', JSON.stringify(updatedCachedPlayers));

  return updatedPlayersWatching;
}
