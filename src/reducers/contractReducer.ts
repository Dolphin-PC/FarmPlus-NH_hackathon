import { CLEAR_CONTRACT, SET_CONTRACT } from "../actions/types";

const initialState = {
   trade: null,
};

const contract = (state = initialState, action) => {
   switch (action.type) {
      case SET_CONTRACT:
         return {
            trade: action.payload,
         };
      case CLEAR_CONTRACT:
         return {
            trade: null,
         };

      default:
         return state;
   }
};

export default contract;
