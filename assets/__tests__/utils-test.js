import { searchPlayers, updateWatchingState, updatePlayersWatching } from '../js/utils';

describe('searchPlayers', () => {
  test('returns correct players from search term when searching by name', () => {
    const result = searchPlayers([{ firstName: 'Alex' }, { firstName: 'Bit' }], 'b');

    expect(result.length).toEqual(1);
    expect(result[0].firstName).toEqual('Bit');
  });

  test('returns correct players from search term when searching by id', () => {
    const result = searchPlayers([{ firstName: 'Alex', id: '1' }, { firstName: 'Bit', id: '2'}], '1');

    expect(result.length).toEqual(1);
    expect(result[0].firstName).toEqual('Alex');
  });
});

describe('updateWatchingState', () => {
  test('returns updated list of players with correct isWatching value', () => {
    const players = [{ personId: '1', isWatching: false }, { personId: '2', isWatching: false}]
    const cachedPlayers = ['1']

    localStorage.setItem('playersWatching', JSON.stringify(cachedPlayers));

    const result = updateWatchingState(players, cachedPlayers);
    expect(result[0].isWatching).toEqual(true);
    expect(result[1].isWatching).toEqual(false);
  });
});

describe('updatePlayersWatching', () => {
  test('added player is appended to players list and is stored in localStorage', () => {
    const playersWatching = [{ personId: '1', isWatching: false }];
    const player = { personId: '2', isWatching: false};

    localStorage.setItem('playersWatching', JSON.stringify(playersWatching))
    expect(JSON.parse(localStorage.getItem('playersWatching')).length).toEqual(1)

    const result = updatePlayersWatching(player, playersWatching);
    const localStorageResult = JSON.parse(localStorage.getItem('playersWatching'));

    expect(result[1].personId).toEqual('2');
    expect(localStorageResult.length).toEqual(2)
  });
});
