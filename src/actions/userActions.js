import Axios from "axios";
import { serverUrl } from "../app/info";
import { SET_USER } from "./types";

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
