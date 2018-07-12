import _ from "lodash";
import { replaceListItem } from "../utils";
import {
  RECEIVE_PLAYERS,
  RECEIVE_PLAYER_TO_WATCH,
  RECEIVE_CACHED_PLAYERS,
  ADD_PLAYER_TO_WATCH,
  REMOVE_PLAYER,
  FETCH_PLAYERS_STARTED,
  FETCH_PLAYERS_ERROR,
  FETCH_PLAYERS_SUCCESS,
  FETCH_CACHED_PLAYERS_STARTED,
  FETCH_CACHED_PLAYERS_ERROR,
  FETCH_CACHED_PLAYERS_SUCCESS
} from "../constants";

export default function(state={
  players: [],
  stats: [],
  playersWatching: [],
  loading: false
}, action) {
  switch(action.type) {
    case FETCH_PLAYERS_STARTED:
      return {...state};
    case FETCH_PLAYERS_ERROR: {
      return {...state, error: action.error};
    }
    case FETCH_PLAYERS_SUCCESS: {
      return {...state, players: action.players};
    }
    case FETCH_CACHED_PLAYERS_STARTED: {
      return {...state, loading: true};
    }
    case FETCH_CACHED_PLAYERS_ERROR: {
      return {...state, error: action.error};
    }
    case FETCH_CACHED_PLAYERS_SUCCESS: {
      return {...state, playersWatching: action.players, loading: action.loading};
    }

    case RECEIVE_PLAYERS: {
      return {...state, players: action.players}
    }
    case ADD_PLAYER_TO_WATCH: {
      return {...state, loading: action.loading}
    }
    case RECEIVE_PLAYER_TO_WATCH: {
      var newPlayersList = _.concat(state.playersWatching, action.player)
      var playerIdList = []
      _.forEach(newPlayersList, function(value) {
        playerIdList.push(value.personId)
      })
      localStorage.setItem('playersWatching', JSON.stringify(playerIdList))
      return {...state, playersWatching: newPlayersList, loading: action.loading}
    }
    case RECEIVE_CACHED_PLAYERS: {
      return {...state, playersWatching: action.playersWatching, loading: action.loading}
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
