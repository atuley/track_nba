import _ from 'lodash';

export function searchPlayers(searchContent, searchText) {
  const searchQuery = _.toLower(searchText);

  return _.filter(searchContent, player => _.chain(player)
    .values()
    .toLower()
    .includes(searchQuery)
    .value());
}

export function updateWatchingState(players, cachedPlayers) {
  const newPlayers = players.slice(0);
  
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
