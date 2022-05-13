import { UPDATE_MATTER } from "./actions";

export default function reducer(state, action) {
  switch (action.type) {
    case UPDATE_MATTER:
      return {
        ...state,
        matter: action.matter,
      };
    default:
      return state;
  }
}
