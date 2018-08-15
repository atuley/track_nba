import _ from "lodash";
import { searchPlayers } from '../js/utils';

test('tests run', ()=> {
    expect(1+1).toEqual(2);
});

test.skip('returns correct players from search term', ()=> {
    const result = searchPlayers(null, { target: { value: 'thing' } });

    expect(result).toEqual(2);
});
