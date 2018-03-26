import _ from "lodash";
import {
  CHANGE_NAME,
  RECEIVE_PLAYERS,
  SUBSCRIBE_TO_PLAYER,
  UPDATE_PLAYER_STATE
} from "../constants";

export default function(state={
  name: "before",
  players: []
}, action) {
  switch(action.type) {
    case CHANGE_NAME: {
      return {...state, name: action.name}
    }
    case RECEIVE_PLAYERS: {
      return {...state, players: action.players}
    }
    case UPDATE_PLAYER_STATE: {
      return {...state, stats: action.stats}
    }
  }
  return state;
}
