import Axios from "axios";
import { useSelector } from "react-redux";
import { serverUrl } from "../app/info";
import { ADD_FAVORITE, GET_USER, SET_FAVORITE, SET_USER } from "./types";

import shortid from "shortid";
import { FireDB, FiredbRef, UserRef } from "../app/firebaseConfig";
import { TypeUser } from "../data/types";

// 회원가입
export const newUser = async (user) => {
  // * json-server
  //   await Axios.post(`${serverUrl}/users`, {
  //     ...user.personalInfo,
  //     ...user.accountInfo,
  //   })
  //     .then(() => {
  //       return true;
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //       return false;
  //     });

  // * firebase
  FiredbRef.child("users/" + user.personalInfo.id)
    .set({
      ...user.personalInfo,
      ...user.accountInfo,
    })
    .then(() => true)
    .catch((err) => {
      console.error(err);
      return false;
    });
};

// 로그인
export const loginUser = (user) => async (dispatch) => {
  try {
    // * json-server
    //  await Axios.get(`${serverUrl}users?id=${user.id}`).then((res) => {
    //    console.info(res);
    //    if (res.data.length === 0) {
    //      alert("로그인 실패 | 아이디를 확인해주세요.");
    //      return;
    //    }
    //    if (res.data[0].password === user.password) {
    //      console.info(res.data[0]);
    //      dispatch({
    //        type: SET_USER,
    //        payload: res.data[0],
    //      });
    //    } else {
    //      alert("로그인 실패 | 비밀번호 오류");
    //    }
    //  });

    // * firebase
    FiredbRef.child("users/" + user.id)
      .get()
      .then((snapshot) => {
        if (snapshot.exists()) {
          const res: TypeUser = snapshot.val();
          if (res.trade) {
            res.trade = Object.values(res.trade);
          }

          if (res.password == user.password) {
            dispatch({
              type: SET_USER,
              payload: res,
            });
          } else {
            alert("로그인 실패 | 비밀번호 오류");
          }
        } else {
          alert("로그인 실패 | 아이디를 확인해주세요.");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  } catch (err) {
    alert("로그인 실패");
    console.error(err);
    return false;
  }
};

// 사용자 정보 조회
export const getUserInfo = (user: TypeUser) => async (dispatch) => {
  // * json-server
  //   await Axios.get(`${serverUrl}/users/${user.user.id}`)
  //     .then((res) => {
  //       console.info(res);
  //       dispatch({
  //         type: GET_USER,
  //         payload: res.data,
  //       });
  //     })
  //     .catch((err) => {
  //       alert("오류 발생");
  //       console.error(err);
  //     });

  // * firebase
  FiredbRef.child("users/" + user.id)
    .get()
    .then((snapshot) => {
      if (snapshot.exists()) {
        let res = snapshot.val();

        // trade
        if (res.trade) {
          res.trade = Object.values(res.trade).map((value) => value);
        }

        dispatch({
          type: GET_USER,
          payload: res,
        });
      } else {
        alert("오류 발생");
      }
    });
};

// 찜하기
export const addFavorite = (user, current) => async (dispatch) => {
  var favoriteList = [];
  if (user.user.favorite) {
    favoriteList = user.user.favorite;
  }
  favoriteList.push(current);

  //   * json-server
  // await Axios.patch(`${serverUrl}/users/${user.user.id}`, {
  //   favorite: favoriteList,
  // })
  //   .then((res) => {
  //     alert("찜 되었습니다.");
  //   })
  //   .catch((err) => {
  //     console.error(err);
  //   });

  //   * firebase
  FiredbRef.child("users/" + user.user.id)
    .update({
      favorite: favoriteList,
    })
    .then((res) => {
      alert("찜 되었습니다.");
    })
    .catch((err) => {
      console.error(err);
    });
};

// 거래 요청
export const tradeRequest = (user, current) => async (dispatch) => {
  let requester = { ...user.user };
  // 불필요한 정보 삭제
  delete requester.notice;
  delete requester.favorite;
  delete requester.trade;

  let result;

  const tradeId = shortid.generate();

  let myList = [];
  let sellerList = [];

  // const myTradeInfo = await Axios.get(`${serverUrl}/users/${user.user.id}`).then((res) => res.data.trade);
  // const sellerTradeInfo = await Axios.get(`${serverUrl}/users/${current.seller.id}`).then((res) => res.data.trade);

  // if (myTradeInfo) {
  //   myList = myTradeInfo;
  // }
  // if (sellerTradeInfo) {
  //   sellerList = sellerTradeInfo;
  // }

  // const newTrade = {
  //   tradeId: tradeId,
  //   noticeType: "거래대기",
  //   requester,
  //   product: current,
  // };

  // myList.push(newTrade);
  // sellerList.push(newTrade);

  // // 내 거래내역 추가
  // await Axios.patch(`${serverUrl}/users/${user.user.id}`, {
  //   trade: myList,
  // });

  // // 상대방 거래내역 추가
  // result = await Axios.patch(`${serverUrl}/users/${current.seller.id}`, {
  //   trade: sellerList,
  //   notice: sellerList,
  // })
  //   .then((res) => {
  //     return true;
  //   })
  //   .catch((err) => {
  //     return false;
  //   });

  // * firebase
  const newTrade = {
    tradeId: tradeId,
    noticeType: "거래대기",
    requester,
    product: current,
  };

  FiredbRef.child("users/" + user.user.id + "/trade")
    .child(tradeId)
    .update(newTrade)
    .then(() => true)
    .catch(() => false);
  FiredbRef.child("users/" + current.seller.id + "/trade")
    .child(tradeId)
    .update(newTrade)
    .then(() => true)
    .catch(() => false);

  return result;
};

// TODO firebase
/**
 * 거래수락
 * 거래요청자 -> 판매자, 판매자의 거래수락 Action
 * @param {*} user
 * @param {*} tradeId
 * @param {*} requester
 * @param {*} product
 * @returns
 */
export const acceptRequest = (user, tradeId, requester, product) => async (dispatch) => {
  try {
    const updateObj = {
      noticeType: "거래진행",
    };
    // 내 거래정보 -> noticeType(거래진행 변경)
    UserRef.child(user.user.id).child("trade/").child(tradeId).update(updateObj);
    // 상대방 거래정보 -> noticeType(거래진행 변경)
    UserRef.child(requester.id).child("trade/").child(tradeId).update(updateObj);

    return true;
  } catch (err) {
    console.error(err);
    return false;
  }

  // let result;

  // // 내 거래정보
  // let myTradeInfo = await Axios.get(`${serverUrl}/users/${user.user.id}`);
  // // 구매자 거래정보
  // let requesterTradeInfo = await Axios.get(`${serverUrl}/users/${requester.id}`);

  // myTradeInfo = myTradeInfo.data.trade.map((trade) => {
  //   if (trade.tradeId === tradeId) {
  //     return { ...trade, noticeType: "거래진행" };
  //   }
  //   return trade;
  // });
  // requesterTradeInfo = requesterTradeInfo.data.trade.map((trade) => {
  //   if (trade.tradeId === tradeId) {
  //     return { ...trade, noticeType: "거래진행" };
  //   }
  //   return trade;
  // });

  // result = await Axios.patch(`${serverUrl}/users/${user.user.id}`, {
  //   trade: myTradeInfo,
  //   notice: myTradeInfo,
  // }).catch((err) => {
  //   console.error(err);
  // });

  // result = await Axios.patch(`${serverUrl}/users/${requester.id}`, {
  //   trade: requesterTradeInfo,
  //   notice: requesterTradeInfo,
  // })
  //   .then(() => {
  //     console.info("거래가 성사되었습니다.");
  //     return true;
  //   })
  //   .catch((err) => {
  //     console.error(err);
  //     return false;
  //   });

  // return result;
};
