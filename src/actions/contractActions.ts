import Axios from "axios";
import { serverUrl } from "../app/info";
import { UserRef } from "../app/firebaseConfig";
import { TypeUser } from "../data/types";
import { RootStateType } from "../reducers";

/**
 * 계약내용 확인 및 동의 후, 계약서 전송
 * user > data > trade > isContract(true) 수정
 * @param {*} user
 * @param {*} tradeId
 */
export const sendContract = async (user: TypeUser, tradeId) => {
  // let myInfo = await Axios.get(`${serverUrl}/users/${user.user.id}`).catch((err) => {
  //   console.error(err);
  // });

  // myInfo = myInfo.data.trade.map((trade) => {
  //   if (trade.tradeId === tradeId) {
  //     return {
  //       ...trade,
  //       isContract: true,
  //     };
  //   }
  //   return trade;
  // });

  // await Axios.patch(`${serverUrl}/users/${user.user.id}`, {
  //   trade: myInfo,
  //   notice: myInfo,
  // })
  //   .then(() => true)
  //   .catch((err) => {
  //     console.error(err);
  //   });

  return UserRef.child(user.id)
    .child("trade")
    .child(tradeId)
    .update({
      isContract: true,
    })
    .then(() => {
      return true;
    })
    .catch((err) => {
      console.error(err);
      return false;
    });
};
