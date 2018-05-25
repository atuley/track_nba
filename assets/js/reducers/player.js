import _ from "lodash";
import { replaceListItem } from "../utils";
import {
  CHANGE_NAME,
  RECEIVE_PLAYERS,
  UPDATE_PLAYER_STATE,
  RECEIVE_PLAYER_TO_WATCH,
  RECEIVE_CACHED_PLAYERS,
  ADD_PLAYER_TO_WATCH,
  REMOVE_PLAYER,
  UPDATE_BUTTON
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
      var newPlayers = action.players;
      if (localStorage.getItem('playersWatching')) {
        var cachedPlayers = JSON.parse(localStorage.getItem('playersWatching'));
        for (var i = 0; i < newPlayers.length; i++) {
          for (var j = 0; j < cachedPlayers.length; j++) {
            if (cachedPlayers[j].personId == newPlayers[i].personId) {
              newPlayers[i].isWatching = true
            }
          }
        }
      }
      return {...state, players: newPlayers}
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
      var newPlayersList = _.concat(state.playersWatching, action.player)
      localStorage.setItem('playersWatching', JSON.stringify(newPlayersList))
      return {...state, playersWatching: newPlayersList, isLoading: action.isLoading}
    }
    case RECEIVE_CACHED_PLAYERS: {
      return {...state, playersWatching: action.playersWatching}
    }
    case REMOVE_PLAYER: {
      return {...state, playersWatching: action.playersWatching}
    }
  }
  return state;
}
