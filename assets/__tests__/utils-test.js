import { searchPlayers } from '../js/utils';

test('returns correct players from search term', () => {
  const result = searchPlayers([{ firstName: 'Alex' }, { firstName: 'Bit' }], 'b');

  expect(result.length).toEqual(1);
  expect(result[0].firstName).toEqual('Bit');
});
