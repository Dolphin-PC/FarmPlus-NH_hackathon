import Axios from "axios";
import { serverUrl } from "../app/info";

export const sendContract = async (user, tradeId) => {
   let myInfo = await Axios.get(`${serverUrl}/users/${user.user.id}`).catch(
      (err) => {
         console.error(err);
      }
   );

   myInfo = myInfo.data.trade.map((trade) => {
      if (trade.tradeId === tradeId) {
         return {
            ...trade,
            isContract: true,
         };
      }
      return trade;
   });

   await Axios.patch(`${serverUrl}/users/${user.user.id}`, {
      trade: myInfo,
      notice: myInfo,
   })
      .then(() => true)
      .catch((err) => {
         console.error(err);
      });
};
