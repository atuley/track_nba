import _ from "lodash";
import {
  REMOVE_PLAYER,
  FETCH_PLAYERS_STARTED,
  FETCH_PLAYERS_ERROR,
  FETCH_PLAYERS_SUCCESS,
  FETCH_CACHED_PLAYERS_STARTED,
  FETCH_CACHED_PLAYERS_ERROR,
  FETCH_CACHED_PLAYERS_SUCCESS,
  FETCH_PLAYER_STARTED,
  FETCH_PLAYER_ERROR,
  FETCH_PLAYER_SUCCESS
} from "../constants";

const initialState = {
  players: [],
  stats: [],
  playersWatching: [],
  loading: false,
  error: null
};

export default function(state=initialState, action) {
  switch(action.type) {
    case FETCH_PLAYERS_STARTED:
      return {
        ...state
      };
    case FETCH_PLAYERS_ERROR:
      return {
        ...state,
        error: action.error
      };
    case FETCH_PLAYERS_SUCCESS:
      return {
        ...state,
        players: action.players
      };

    case FETCH_CACHED_PLAYERS_STARTED:
      return {
        ...state,
        loading: true
      };
    case FETCH_CACHED_PLAYERS_ERROR:
      return {
        ...state,
        error: action.error,
        loading: action.loading
      };
    case FETCH_CACHED_PLAYERS_SUCCESS:
      return {
        ...state,
        playersWatching: action.players,
        loading: action.loading
      };

    case FETCH_PLAYER_STARTED:
      return {
        ...state,
        loading: action.loading
      };
    case FETCH_PLAYER_ERROR:
      return {
        ...state,
        error: action.error,
        loading: action.loading
      };
    case FETCH_PLAYER_SUCCESS:
      var newPlayersList = _.concat(state.playersWatching, action.player)
      var playerIdList = []
      _.forEach(newPlayersList, function(value) {
        playerIdList.push(value.personId)
      })
      localStorage.setItem('playersWatching', JSON.stringify(playerIdList))
      return {
        ...state,
        playersWatching: newPlayersList,
        loading: action.loading
      };

    case REMOVE_PLAYER:
      var newPlayers = state.players.slice(0)
      var index = _.findIndex(newPlayers, function(o) {
        return o.personId == action.personId;
      });
      newPlayers[index].isWatching = false;
      return {
        ...state,
        playersWatching: action.playersWatching,
        players: newPlayers
      };

    default:
      return state || initialState;
  }
}
