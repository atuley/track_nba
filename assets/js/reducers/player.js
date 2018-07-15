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
      return {
        ...state,
        playersWatching: action.playersWatching,
        loading: action.loading
      };

    case REMOVE_PLAYER:
      return {
        ...state,
        playersWatching: action.playersWatching,
        players: action.players
      };

    default:
      return state || initialState;
  }
}
