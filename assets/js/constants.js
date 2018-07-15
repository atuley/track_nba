export const REMOVE_PLAYER = "REMOVE_PLAYER";
export const FETCH_PLAYERS_STARTED = "FETCH_PLAYERS_STARTED";
export const FETCH_PLAYERS_ERROR = "FETCH_PLAYERS_ERROR";
export const FETCH_PLAYERS_SUCCESS = "FETCH_PLAYERS_SUCCESS";
export const FETCH_CACHED_PLAYERS_STARTED = "FETCH_CACHED_PLAYERS_STARTED";
export const FETCH_CACHED_PLAYERS_ERROR = "FETCH_CACHED_PLAYERS_ERROR";
export const FETCH_CACHED_PLAYERS_SUCCESS = "FETCH_CACHED_PLAYERS_SUCCESS";
export const FETCH_PLAYER_STARTED = "FETCH_PLAYER_STARTED";
export const FETCH_PLAYER_ERROR = "FETCH_PLAYER_ERROR";
export const FETCH_PLAYER_SUCCESS = "FETCH_PLAYER_SUCCESS";

export const defaultHeaders = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
};

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

export const fetchCachedPlayersStarted = () => ({
  type: FETCH_CACHED_PLAYERS_STARTED,
  loading: true
});

export const fetchCachedPlayersError = error => ({
  type: FETCH_CACHED_PLAYERS_ERROR,
  loading: false,
  error
});

export const fetchCachedPlayersSuccess = players => ({
  type: FETCH_CACHED_PLAYERS_SUCCESS,
  loading: false,
  players
});

export const fetchPlayerStarted = () => ({
  type: FETCH_PLAYER_STARTED,
  loading: true
});

export const fetchPlayerError = error => ({
  type: FETCH_PLAYER_ERROR,
  loading: false,
  error
});

export const fetchPlayerSuccess = playersWatching => ({
  type: FETCH_PLAYER_SUCCESS,
  loading: false,
  playersWatching
});
