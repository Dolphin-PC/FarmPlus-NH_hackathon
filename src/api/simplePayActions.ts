import { bankCode } from "../data/data";

import { serverUrl } from "../app/info";
import { getTodayApi, getIsTuno, getTimeApi } from "../app/functions";

import { Iscd, FintechApsno, ApiSvcCd, AccessToken } from "../app/info";
import Axios from "axios";
import { UserRef } from "../app/firebaseConfig";
import { TypeNoticeType, TypeProduct, TypeTrade, TypeUser } from "../data/dbType";

// 출금 이체
export const drawingTransfer = async (user: TypeUser, product: TypeProduct, tradeId: string): Promise<boolean> => {
  let result;

  const url = "https://developers.nonghyup.com/DrawingTransfer.nh";

  const body = {
    Header: {
      ApiNm: "DrawingTransfer",
      Tsymd: getTodayApi(),
      Trtm: getTimeApi(),
      Iscd,
      FintechApsno,
      ApiSvcCd,
      IsTuno: getIsTuno(),
      AccessToken,
    },
    FinAcno: user.FinAcno,
    Tram: product.cost,
    DractOtlt: `[계약금] ${product.title}(${product.seller.name})`,
  };

  try {
    // 출금이체
    await Axios.post(url, body)
      .then((res) => {
        console.info(res.data.Header.Rsms);
      })
      .catch((err) => {
        console.error(err);
        throw err;
      });

    // * firebase
    await UserRef.child(user.id)
      .child("trade")
      .child(tradeId)
      .update({
        deposit: product.cost,
      })
      .catch((err) => {
        throw err;
      });
    await UserRef.child(user.id)
      .child("notice")
      .child(tradeId)
      .update({
        deposit: product.cost,
      })
      .catch((err) => {
        throw err;
      });

    await UserRef.child(product.seller.id)
      .child("trade")
      .child(tradeId)
      .update({
        deposit: product.cost,
      })
      .catch((err) => {
        throw err;
      });
    await UserRef.child(product.seller.id)
      .child("notice")
      .child(tradeId)
      .update({
        deposit: product.cost,
      })
      .catch((err) => {
        throw err;
      });

    return true;
  } catch (err) {
    console.error(err);
    return false;
  }

  // // 내 거래정보
  // let myTradeInfo = await Axios.get(`${serverUrl}/users/${user.user.id}`);

  // // 판매자 거래정보
  // let sellerTradeInfo = await Axios.get(`${serverUrl}/users/${product.seller.id}`);

  // myTradeInfo = myTradeInfo.data.trade.map((trade) => {
  //   if (trade.tradeId === tradeId) {
  //     return { ...trade, deposit: product.cost };
  //   }
  //   return trade;
  // });
  // sellerTradeInfo = sellerTradeInfo.data.trade.map((trade) => {
  //   if (trade.tradeId === tradeId) {
  //     return { ...trade, deposit: product.cost };
  //   }
  //   return trade;
  // });

  // await Axios.patch(`${serverUrl}/users/${user.user.id}`, {
  //   trade: myTradeInfo,
  //   notice: myTradeInfo,
  // }).catch((err) => {
  //   console.error(err);
  // });
  // result = await Axios.patch(`${serverUrl}/users/${product.seller.id}`, {
  //   trade: sellerTradeInfo,
  //   notice: sellerTradeInfo,
  // })
  //   .then((res) => {
  //     console.info(res);
  //     return true;
  //   })
  //   .catch((err) => {
  //     console.error(err);
  //     return false;
  //   });

  // return result;
};

// 입금 이체
export const receivedTransferAccountNumber = async (user: TypeUser, product: TypeProduct, requester: TypeUser, tradeId: string): Promise<boolean> => {
  let result;
  const url = "https://developers.nonghyup.com/ReceivedTransferAccountNumber.nh";

  const body = {
    Header: {
      ApiNm: "ReceivedTransferAccountNumber",
      Tsymd: getTodayApi(),
      Trtm: getTimeApi(),
      Iscd,
      FintechApsno,
      ApiSvcCd: "ReceivedTransferA",
      IsTuno: getIsTuno(),
      AccessToken,
    },
    Bncd: user.bankCode,
    Acno: user.accountNumber,
    Tram: product.cost - product.cost * 0.01,
    DractOtlt: `[${user.id}]계약금 출금`,
    MractOtlt: "[팜플러스]계약금 입금",
  };

  // 입금이체
  try {
    await Axios.post(url, body).catch((err) => {
      throw err;
    });

    const update = {
      noticeType: "거래완료",
      deposit: 0,
    };
    await UserRef.child(user.id)
      .child("trade")
      .child(tradeId)
      .update(update)
      .catch((err) => {
        throw err;
      });
    await UserRef.child(user.id)
      .child("notice")
      .child(tradeId)
      .update(update)
      .catch((err) => {
        throw err;
      });
    await UserRef.child(requester.id)
      .child("trade")
      .child(tradeId)
      .update(update)
      .catch((err) => {
        throw err;
      });
    await UserRef.child(requester.id)
      .child("notice")
      .child(tradeId)
      .update(update)
      .catch((err) => {
        throw err;
      });
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }

  // // 내 거래정보
  // let myTradeInfo = await Axios.get(`${serverUrl}/users/${user.user.id}`);

  // // 판매자 거래정보
  // let sellerTradeInfo = await Axios.get(`${serverUrl}/users/${requester.id}`);

  // myTradeInfo = myTradeInfo.data.trade.map((trade) => {
  //   if (trade.tradeId === tradeId) {
  //     return { ...trade, noticeType: "거래완료", deposit: 0 };
  //   }
  //   return trade;
  // });
  // sellerTradeInfo = sellerTradeInfo.data.trade.map((trade) => {
  //   if (trade.tradeId === tradeId) {
  //     return { ...trade, noticeType: "거래완료", deposit: 0 };
  //   }
  //   return trade;
  // });

  // await Axios.patch(`${serverUrl}/users/${user.user.id}`, {
  //   trade: myTradeInfo,
  //   notice: myTradeInfo,
  // }).catch((err) => {
  //   console.error(err);
  // });

  // result = await Axios.patch(`${serverUrl}/users/${requester.id}`, {
  //   trade: sellerTradeInfo,
  //   notice: sellerTradeInfo,
  // })
  //   .then((res) => {
  //     console.info(res);
  //     return true;
  //   })
  //   .catch((err) => {
  //     console.error(err);
  //     return false;
  //   });

  // return result;
};

// * (+추가) 이체 여부 확인
export const confirmTransferTrade = async (user: TypeUser, tradeId: string): Promise<boolean> => {
  const snapshot = await UserRef.child(user.id).child("trade").child(tradeId).get();
  const res: TypeTrade = snapshot.val();

  if (res.deposit) {
    return false;
  }

  return true;
};
