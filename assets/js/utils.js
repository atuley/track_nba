import _ from 'lodash';
import React from 'react';

export function searchPlayers(searchContent, { target: { value: searchText } }) {
  var searchQuery = _.toLower(searchText);
  var currentPlayers = this.props[searchContent];

  const updatedPlayers = _.filter(currentPlayers, function(player) {
    return _.chain(player)
            .values()
            .toLower()
            .includes(searchQuery)
            .value();
  })

  this.setState({
    [searchContent]: updatedPlayers
  });
}

export function updateWatchingState(players) {
  let newPlayers = players.slice(0);
  const cachedPlayers = JSON.parse(localStorage.getItem('playersWatching'));
  if (localStorage.getItem('playersWatching')) {
    newPlayers.forEach(function(player) {
      if (cachedPlayers.includes(player.personId)) {
        player.isWatching = true
      }
    })
  }
  return newPlayers;
}
