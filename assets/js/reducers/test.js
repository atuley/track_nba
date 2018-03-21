import _ from "lodash";
import {
  CHANGE_NAME
} from "../constants/test";

const initialState = {
  name: "before"
};

export default function(state={initialState}, action) {
  switch(action.type) {
    case CHANGE_NAME: {
      return {...state, name: action.name}
    }
    default: {
      return state || initialState;
    }
  }
}
