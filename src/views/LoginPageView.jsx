import { Button, TextField } from "@material-ui/core";
import React, { Fragment, useEffect, useState } from "react";
import Lottie from "react-lottie";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { loginUser } from "../actions/userActions";
import LoginAni from "../assets/animations/login.json";

const LoginPageView = () => {
   // 현재 브라우저의 전체 높이 값을 반환
   const height = window.outerHeight;

   const history = useHistory();
   const dispatch = useDispatch();
   const _user = useSelector((state) => state.user);

   const [user, setUser] = useState({
      id: "",
      password: "",
   });

   // lottie Animation option
   const defaultOptions = {
      loop: true,
      autoplay: true,
      animationData: LoginAni,
      rendererSettings: {
         preserveAspectRatio: "xMidYMid slice",
      },
   };

   const handleLogin = () => {
      // 로그인 처리
      dispatch(loginUser(user));
   };

   const handleRegister = () => {
      history.push("/register");
   };

   const handleOnChange = (e) => {
      setUser({
         ...user,
         [e.target.name]: e.target.value,
      });
   };

   useEffect(() => {
      if (_user.user !== null) {
         history.push("/main");
      }
   }, [_user]);
   return (
      <div className="LoginStyle" style={{ height: height }}>
         <div>
            <Lottie options={defaultOptions} width={`80%`} height={`80%`} />
         </div>
         <h4>선구안</h4>
         <small>선도거래를 구조한다, 안전하게</small>&emsp;
         <form style={{ width: "80%" }}>
            <TextField
               name="id"
               value={user.id}
               type="text"
               fullWidth
               variant="outlined"
               label="아이디를 입력해주세요."
               onChange={handleOnChange}
            />
            &emsp;
            <TextField
               name="password"
               value={user.password}
               type="password"
               fullWidth
               variant="outlined"
               label="비밀번호를 입력해주세요."
               onChange={handleOnChange}
            />
            &emsp;
            <Button
               fullWidth
               color="primary"
               variant="contained"
               onClick={handleLogin}
            >
               로그인
            </Button>
            &emsp;
            <Button
               fullWidth
               color="secondary"
               variant="outlined"
               onClick={handleRegister}
            >
               회원가입
            </Button>
         </form>
      </div>
   );
};

export default LoginPageView;
