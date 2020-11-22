import { Button, TextField } from "@material-ui/core";
import React, { Fragment } from "react";
import Lottie from "react-lottie";
import { useHistory } from "react-router-dom";
import LoginAni from "../assets/animations/login.json";

const LoginPageView = () => {
   // 현재 브라우저의 전체 높이 값을 반환
   const height = window.outerHeight;

   const history = useHistory();

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

      // 메인 화면으로 이동
      history.push("/main");
   };

   const handleRegister = () => {
      // 회원가입 처리
   };

   const onSubmit = () => {};
   return (
      <div className="LoginStyle" style={{ height: height }}>
         <div>
            <Lottie options={defaultOptions} width={`80%`} height={`80%`} />
         </div>
         <h4>선구안</h4>
         <small>선도거래를 구조한다, 안전하게</small>&emsp;
         <form onSubmit={onSubmit} style={{ width: "80%" }}>
            <TextField
               type="text"
               fullWidth
               variant="outlined"
               label="아이디를 입력해주세요."
            />
            &emsp;
            <TextField
               type="password"
               fullWidth
               variant="outlined"
               label="비밀번호를 입력해주세요."
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
