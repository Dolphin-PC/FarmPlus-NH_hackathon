import Axios from "axios";
import { serverUrl } from "../app/info";

// TODO firebase
/**
 * 계약서 전송
 * user > data > trade > isContract(true) 수정
 * @param {*} user
 * @param {*} tradeId
 */
export const sendContract = async (user, tradeId) => {
  let myInfo = await Axios.get(`${serverUrl}/users/${user.user.id}`).catch((err) => {
    console.error(err);
  });

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
