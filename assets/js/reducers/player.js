import _ from "lodash";
import { replaceListItem } from "../utils";
import {
  RECEIVE_PLAYERS,
  RECEIVE_PLAYER_TO_WATCH,
  RECEIVE_CACHED_PLAYERS,
  ADD_PLAYER_TO_WATCH,
  REMOVE_PLAYER
} from "../constants";

export default function(state={
  players: [],
  stats: [],
  playersWatching: [],
  isLoading: true
}, action) {
  switch(action.type) {
    case RECEIVE_PLAYERS: {
      return {...state, players: action.players}
    }
    case ADD_PLAYER_TO_WATCH: {
      return {...state, isLoading: action.isLoading}
    }
    case RECEIVE_PLAYER_TO_WATCH: {
      var newPlayersList = _.concat(state.playersWatching, action.player)
      var playerIdList = []
      _.forEach(newPlayersList, function(value) {
        playerIdList.push(value.personId)
      })
      localStorage.setItem('playersWatching', JSON.stringify(playerIdList))
      return {...state, playersWatching: newPlayersList, isLoading: action.isLoading}
    }
    case RECEIVE_CACHED_PLAYERS: {
      return {...state, playersWatching: action.playersWatching, isLoading: action.isLoading}
    }
    case REMOVE_PLAYER: {
      return {...state, playersWatching: action.playersWatching}
    }
  }
  return state;
}
