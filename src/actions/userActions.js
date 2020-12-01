import Axios from "axios";
import { useSelector } from "react-redux";
import { serverUrl } from "../app/info";
import { ADD_FAVORITE, GET_USER, SET_FAVORITE, SET_USER } from "./types";

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
   var noticeList = [];
   if (user.user.notice) {
      noticeList = user.user.notice;
   }
   noticeList.push({
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
   });
   await Axios.patch(`${serverUrl}/users/${current.id}`, {
      notice: noticeList,
   })
      .then((res) => {
         alert("거래 신청이 완료되었습니다.");
      })
      .catch((err) => {
         console.error(err);
      });
};
