import Axios from "axios";
import { serverUrl } from "../app/info";
import { UserRef } from "../app/firebaseConfig";
import { TypeUser } from "../data/dbType";
import { RootStateType } from "../reducers";

/**
 * @desc 계약내용 확인 및 동의 후, 계약서 전송
 * user > data > trade > isContract(true) 수정
 * @param {*} user
 * @param {*} tradeId
 */
export const sendContract = async (user: TypeUser, tradeId: string) => {
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

  try {
    await UserRef.child(user.id)
      .child("trade")
      .child(tradeId)
      .update({
        isContract: true,
      })
      .catch((err) => {
        throw err;
      });
    await UserRef.child(user.id)
      .child("notice")
      .child(tradeId)
      .update({
        isContract: true,
      })
      .catch((err) => {
        throw err;
      });
    return true;
  } catch (err) {
    return false;
  }
};
