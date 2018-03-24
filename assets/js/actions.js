import thunk from 'redux-thunk';

import {
  CHANGE_NAME
} from "./constants";

export function changeTheName() {
  return {
    type: CHANGE_NAME,
    name: "New name"
  };
}
