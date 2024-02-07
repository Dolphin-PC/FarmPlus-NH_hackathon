import { bankCode } from "../data/data";

import { serverUrl } from "../app/info";
import { getTodayApi, getIsTuno, getTimeApi } from "../app/functions";

import { Iscd, FintechApsno, ApiSvcCd, AccessToken } from "../app/info";
import Axios from "axios";
import { UserRef } from "../app/firebaseConfig";
import { TypeProduct, TypeUser } from "../data/dbType";

// 출금 이체
export const drawingTransfer = async (user: TypeUser, product: TypeProduct, tradeId: string) => {
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

  // 출금이체
  await Axios.post(url, body)
    .then((res) => {
      console.info(res.data.Header.Rsms);
    })
    .catch((err) => {
      console.error(err);
    });

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

  // * firebase
  UserRef.child(user.id).child("trade").child(tradeId).update({
    deposit: product.cost,
  });

  UserRef.child(product.seller.id).child("trade").child(tradeId).update({
    deposit: product.cost,
  });

  // return result;
};

// 입금 이체
export const receivedTransferAccountNumber = async (user, product, requester, tradeId) => {
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
    Bncd: product.bankCode,
    Acno: product.accountNumber,
    Tram: product.cost - product.cost * 0.01,
    DractOtlt: `[${user.user.id}]계약금 출금`,
    MractOtlt: "[팜플러스]계약금 입금",
  };

  // 입금이체
  try {
    await Axios.post(url, body)
      .then((res) => {
        console.info(res.data);
        return true;
      })
      .catch((err) => {
        console.error(err);
        return false;
      });
  } catch (err) {
    return console.error(err);
  }

  // TODO firebase
  // 내 거래정보
  let myTradeInfo = await Axios.get(`${serverUrl}/users/${user.user.id}`);

  // TODO firebase
  // 판매자 거래정보
  let sellerTradeInfo = await Axios.get(`${serverUrl}/users/${requester.id}`);

  console.info();

  myTradeInfo = myTradeInfo.data.trade.map((trade) => {
    if (trade.tradeId === tradeId) {
      return { ...trade, noticeType: "거래완료", deposit: 0 };
    }
    return trade;
  });
  sellerTradeInfo = sellerTradeInfo.data.trade.map((trade) => {
    if (trade.tradeId === tradeId) {
      return { ...trade, noticeType: "거래완료", deposit: 0 };
    }
    return trade;
  });

  // TODO firebase
  await Axios.patch(`${serverUrl}/users/${user.user.id}`, {
    trade: myTradeInfo,
    notice: myTradeInfo,
  }).catch((err) => {
    console.error(err);
  });

  // TODO firebase
  result = await Axios.patch(`${serverUrl}/users/${requester.id}`, {
    trade: sellerTradeInfo,
    notice: sellerTradeInfo,
  })
    .then((res) => {
      console.info(res);
      return true;
    })
    .catch((err) => {
      console.error(err);
      return false;
    });

  return result;
};
