import _ from "lodash";
import {
  CHANGE_NAME,
  RECEIVE_PLAYERS,
  UPDATE_PLAYER_STATE,
  RECEIVE_PLAYER_TO_WATCH
} from "../constants";

export default function(state={
  name: "before",
  players: [],
  stats: [],
  playersWatching: []
}, action) {
  switch(action.type) {
    case CHANGE_NAME: {
      return {...state, name: action.name}
    }
    case RECEIVE_PLAYERS: {
      return {...state, players: action.players}
    }
    case UPDATE_PLAYER_STATE: {
      // Might want to create a player struct that already has the game log appended to it so I don't have to have a stats array
      // _.filter(state.stats, function(stat) {return Object.keys(stat)[0] != Object.keys(action.stats)[0]})
      // if (state.stats.hasValue(Object.keys(action.stats)[0])) { //if the playerId exists in stats array
      //   replaceListItem()
      // } else {
      //   concat new playerstats to array
      // }
      return {...state, stats: _.concat(state.stats, action.stats)}
    }
    case RECEIVE_PLAYER_TO_WATCH: {
      return {...state, playersWatching: _.concat(state.playersWatching, action.player)}
    }
  }
  return state;
}
