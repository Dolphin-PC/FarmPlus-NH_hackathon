// import {} from '../actions/types'

const initialState = {};

export default function userReducer(state = initialState, action) {
   switch (action.type) {
      case "":
         return {
            ...state,
         };
      default:
         return state;
   }
}
