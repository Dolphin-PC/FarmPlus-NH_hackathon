import Axios from "axios";
import { serverUrl } from "../app/info";

export const receivedTradeDeposit = async (user, tradeId) => {
   const jsonServerUrl = `${serverUrl}/users/${user.user.id}`;

   let userInfo = await Axios.get(jsonServerUrl);

   userInfo = userInfo.data.trade.map((trade) => {
      if (trade.tradeId === tradeId) {
         return {
            ...trade,
            deposit: 0,
         };
      }
   });

   console.info("userInfo", userInfo);

   const result = await Axios.patch(jsonServerUrl, {
      trade: userInfo,
      notice: userInfo,
   })
      .then((res) => {
         console.info(res);
         return true;
      })
      .catch((err) => {
         console.error(err);
         alert("에러가 발생했습니다.");
      });

   return result;
};
