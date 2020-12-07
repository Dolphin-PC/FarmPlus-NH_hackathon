import Axios from "axios";
import { useSelector } from "react-redux";
import { serverUrl } from "../app/info";
import { ADD_FAVORITE, GET_USER, SET_FAVORITE, SET_USER } from "./types";

import shortid from "shortid";

export const newUser = async (user) => {
   await Axios.post(`${serverUrl}/users`, {
      ...user.personalInfo,
      ...user.accountInfo,
   })
      .then(() => {
         return true;
      })
      .catch((err) => {
         console.error(err);
         return false;
      });
};

export const loginUser = (user) => async (dispatch) => {
   try {
      await Axios.get(`${serverUrl}/users?id=${user.id}`).then((res) => {
         console.info(res);
         if (res.data.length === 0) {
            alert("로그인 실패 | 아이디를 확인해주세요.");
            return;
         }
         if (res.data[0].password === user.password) {
            console.info(res.data[0]);
            dispatch({
               type: SET_USER,
               payload: res.data[0],
            });
         } else {
            alert("로그인 실패 | 비밀번호 오류");
         }
      });
   } catch (err) {
      alert("로그인 실패");
      console.error(err);
      return false;
   }
};

export const getUserInfo = (user) => async (dispatch) => {
   await Axios.get(`${serverUrl}/users?id=${user.user.id}`)
      .then((res) => {
         console.info(res);
         dispatch({
            type: GET_USER,
            payload: res.data[0],
         });
      })
      .catch((err) => {
         alert("오류 발생");
         console.error(err);
      });
};

export const addFavorite = (user, current) => async (dispatch) => {
   var favoriteList = [];
   if (user.user.favorite) {
      favoriteList = user.user.favorite;
   }
   favoriteList.push(current);
   await Axios.patch(`${serverUrl}/users/${user.user.id}`, {
      favorite: favoriteList,
   })
      .then((res) => {
         alert("찜 되었습니다.");
      })
      .catch((err) => {
         console.error(err);
      });
};

export const tradeRequest = (user, current) => async (dispatch) => {
   const tradeId = shortid.generate();
   let myList = [];
   let sellerList = [];

   // 셀러 정보 가져오기(거래정보)
   const seller = await Axios.get(`${serverUrl}/users/${current.id}`);

   if (user.user.trade) {
      myList = user.user.trade;
   }
   if (seller.data.trade) {
      sellerList = seller.data.trade;
   }

   const newTrade = {
      tradeId: tradeId,
      noticeType: "거래신청",
      requester: {
         name: user.user.name,
         phoneNumber: user.user.phoneNumber,
         address: user.user.address,
         id: user.user.id,
         backCode: user.user.bankCode,
         accountNumber: user.user.accountNumber,
      },
      product: current,
   };

   myList.push(newTrade);
   sellerList.push(newTrade);

   // 내 거래내역 추가
   await Axios.patch(`${serverUrl}/users/${user.user.id}`, {
      trade: myList,
   }).catch((err) => {
      console.error(err);
   });

   // 상대방 거래내역 추가
   await Axios.patch(`${serverUrl}/users/${current.id}`, {
      trade: sellerList,
      notice: sellerList,
   })
      .then((res) => {
         alert("거래 신청이 완료되었습니다.");
      })
      .catch((err) => {
         console.error(err);
      });
};

export const acceptRequest = (user, tradeId, requester, product) => async (
   dispatch
) => {
   // 내 거래정보
   let myTradeInfo = await Axios.get(`${serverUrl}/users/${user.user.id}`);
   // 구매자 거래정보
   let requesterTradeInfo = await Axios.get(
      `${serverUrl}/users/${requester.id}`
   );

   myTradeInfo = myTradeInfo.data.trade.map((trade) => {
      if (trade.tradeId === tradeId) {
         return { ...trade, noticeType: "거래진행중" };
      }
      return trade;
   });
   requesterTradeInfo = requesterTradeInfo.data.trade.map((trade) => {
      if (trade.tradeId === tradeId) {
         return { ...trade, noticeType: "거래진행중" };
      }
      return trade;
   });

   await Axios.patch(`${serverUrl}/users/${user.user.id}`, {
      trade: myTradeInfo,
      notice: myTradeInfo,
   }).catch((err) => {
      console.error(err);
   });
   await Axios.patch(`${serverUrl}/users/${requester.id}`, {
      trade: requesterTradeInfo,
      notice: requesterTradeInfo,
   })
      .then(() => {
         console.info("거래가 성사되었습니다.");
         return true;
      })
      .catch((err) => {
         console.error(err);
      });
};
