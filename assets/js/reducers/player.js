import _ from "lodash";
import { replaceListItem } from "../utils";
import {
  RECEIVE_PLAYERS,
  RECEIVE_PLAYER_TO_WATCH,
  RECEIVE_CACHED_PLAYERS,
  ADD_PLAYER_TO_WATCH,
  REMOVE_PLAYER,
  CACHED_PLAYERS_LOADING,
  FETCH_PLAYERS_STARTED,
  FETCH_PLAYERS_ERROR,
  FETCH_PLAYERS_SUCCESS
} from "../constants";

export default function(state={
  players: [],
  stats: [],
  playersWatching: [],
  isLoading: false
}, action) {
  switch(action.type) {
    case FETCH_PLAYERS_STARTED: {
      return {...state};
    }
    case FETCH_PLAYERS_ERROR: {
      return {...state, error: action.error};
    }
    case FETCH_PLAYERS_SUCCESS: {
      return {...state, players: action.players};
    }
    
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
    case CACHED_PLAYERS_LOADING: {
      return {...state, isLoading: action.isLoading}
    }
    case RECEIVE_CACHED_PLAYERS: {
      return {...state, playersWatching: action.playersWatching, isLoading: action.isLoading}
    }
    case REMOVE_PLAYER: {
      var newPlayers = state.players.slice(0)
      var index = _.findIndex(newPlayers, function(o) {
        return o.personId == action.personId;
      });
      newPlayers[index].isWatching = false;
      return {...state, playersWatching: action.playersWatching, players: newPlayers}
    }
  }
  return state;
}
