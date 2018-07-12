export const RECEIVE_PLAYERS = "RECEIVE_PLAYERS";
export const RECEIVE_PLAYER_TO_WATCH = "RECEIVE_PLAYER_TO_WATCH";
export const RECEIVE_CACHED_PLAYERS = "RECEIVE_CACHED_PLAYERS";
export const ADD_PLAYER_TO_WATCH = "ADD_PLAYER_TO_WATCH";
export const REMOVE_PLAYER = "REMOVE_PLAYER";

//start refactor
export const defaultHeaders = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
};

//Fetch all players for search
export const FETCH_PLAYERS_STARTED = "FETCH_PLAYERS_STARTED";
export const FETCH_PLAYERS_ERROR = "FETCH_PLAYERS_ERROR";
export const FETCH_PLAYERS_SUCCESS = "FETCH_PLAYERS_SUCCESS";

export const fetchPlayersStarted = () => ({
  type: FETCH_PLAYERS_STARTED
});

export const fetchPlayersError = error => ({
  type: FETCH_PLAYERS_ERROR,
  error
});

export const fetchPlayersSuccess = players => ({
  type: FETCH_PLAYERS_SUCCESS,
  players
});

//Fetch players that have been cached
export const FETCH_CACHED_PLAYERS_STARTED = "FETCH_CACHED_PLAYERS_STARTED";
export const FETCH_CACHED_PLAYERS_ERROR = "FETCH_CACHED_PLAYERS_ERROR";
export const FETCH_CACHED_PLAYERS_SUCCESS = "FETCH_CACHED_PLAYERS_SUCCESS";

export const fetchCachedPlayersStarted = () => ({
  type: FETCH_CACHED_PLAYERS_STARTED,
  isLoading: true
});

export const fetchCachedPlayersError = error => ({
  type: FETCH_CACHED_PLAYERS_ERROR,
  error
});

export const fetchCachedPlayersSuccess = players => ({
  type: FETCH_CACHED_PLAYERS_SUCCESS,
  isLoading: false,
  players
});
