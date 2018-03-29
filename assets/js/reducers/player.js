import _ from "lodash";
import {
  CHANGE_NAME,
  RECEIVE_PLAYERS,
  SUBSCRIBE_TO_PLAYER,
  UPDATE_PLAYER_STATE,
  ADD_PLAYER_TO_WATCH
} from "../constants";

//initial state might not be working

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
      // const updatedPlayer = state.playersWatching
      return {...state, stats: action.stats}
      //playersWatching: playersWatching.last.stats = action.stats
    }
    case ADD_PLAYER_TO_WATCH: {
      return {...state, playersWatching: _.concat(state.playersWatching, action.player)}
    }
  }
  return state;
}
