import _ from "lodash";
import {
  CHANGE_NAME
} from "../constants";

export default function(state={
  name: "before"
}, action) {
  switch(action.type) {
    case CHANGE_NAME: {
      return {...state, name: action.name}
    }
  }
  return state;
}
