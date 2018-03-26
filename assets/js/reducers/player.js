import _ from "lodash";
import {
  CHANGE_NAME,
  RECEIVE_PLAYERS
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
  }
  return state;
}
