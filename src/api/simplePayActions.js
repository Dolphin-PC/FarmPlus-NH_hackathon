import { bankCode } from "../data/data";

import { serverUrl } from "../app/info";
import { getTodayApi, getIsTuno, getTimeApi } from "../app/functions";

import { Iscd, FintechApsno, ApiSvcCd, AccessToken } from "../app/info";
import Axios from "axios";

export const drawingTransfer = async (user, product, tradeId) => {
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
      FinAcno: user.user.FinAcno,
      Tram: product.cost,
      DractOtlt: `[계약금] ${product.title}(${product.name})`,
   };

   // 출금이체
   await Axios.post(url, body)
      .then((res) => {
         console.info(res.data.Header.Rsms);
      })
      .catch((err) => {
         console.error(err);
         return "error";
      });

   // DB update to [Complete]

   // 내 거래정보
   let myTradeInfo = await Axios.get(`${serverUrl}/users/${user.user.id}`);

   // 판매자 거래정보
   let sellerTradeInfo = await Axios.get(`${serverUrl}/users/${product.id}`);

   myTradeInfo = myTradeInfo.data.trade.map((trade) => {
      if (trade.tradeId === tradeId) {
         return { ...trade, noticeType: "거래완료" };
      }
      return trade;
   });
   sellerTradeInfo = sellerTradeInfo.data.trade.map((trade) => {
      if (trade.tradeId === tradeId) {
         return { ...trade, noticeType: "거래완료" };
      }
      return trade;
   });

   await Axios.patch(`${serverUrl}/users/${user.user.id}`, {
      trade: myTradeInfo,
      notice: myTradeInfo,
   }).catch((err) => {
      console.error(err);
   });
   await Axios.patch(`${serverUrl}/users/${product.id}`, {
      trade: sellerTradeInfo,
      notice: sellerTradeInfo,
   })
      .then((res) => {
         console.info(res);
         alert("정상적으로 처리되었습니다.");
      })
      .catch((err) => {
         console.error(err);
      });
};
