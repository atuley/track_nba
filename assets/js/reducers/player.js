import _ from "lodash";
import { replaceListItem } from "../utils";
import {
  CHANGE_NAME,
  RECEIVE_PLAYERS,
  UPDATE_PLAYER_STATE,
  RECEIVE_PLAYER_TO_WATCH,
  ADD_PLAYER_TO_WATCH
} from "../constants";

export default function(state={
  name: "before",
  players: [],
  stats: [],
  playersWatching: [],
  isLoading: false
}, action) {
  switch(action.type) {
    case CHANGE_NAME: {
      return {...state, name: action.name}
    }
    case RECEIVE_PLAYERS: {
      return {...state, players: action.players}
    }
    case UPDATE_PLAYER_STATE: {
      var origPlayerPayload = _.find(state.playersWatching, function(o){ return o.personId == action.player.personId; });

      var newPlayersList = replaceListItem(
        state.playersWatching,
        origPlayerPayload,
        action.player
      );

      return {
        ...state,
        playersWatching: newPlayersList
      };
    }
    case ADD_PLAYER_TO_WATCH: {
      return {...state, isLoading: action.isLoading}
    }
    case RECEIVE_PLAYER_TO_WATCH: {
      return {...state, playersWatching: _.concat(state.playersWatching, action.player), isLoading: action.isLoading}
    }
  }
  return state;
}
