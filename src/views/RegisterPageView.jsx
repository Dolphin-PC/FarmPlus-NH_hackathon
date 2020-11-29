import React, { Fragment, useState } from "react";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import {
   Button,
   IconButton,
   InputLabel,
   Select,
   Snackbar,
   TextField,
} from "@material-ui/core";
import { Close } from "@material-ui/icons";
import { useHistory } from "react-router-dom";

import { bankCode } from "../data/data";
import { accountHolderFunc } from "../api/financialActions";
import { getIsTuno } from "../app/functions";
import { newUser } from "../actions/userActions";

const RegisterPageView = () => {
   const history = useHistory();
   const [personalInfo, setPersonalInfo] = useState({
      name: "",
      phoneNumber: "",
      address: "",
      id: "",
      password: "",
   });
   const [accountInfo, setAccountInfo] = useState({
      bankCode: "011",
      accountNumber: "",
   });
   const [checkAccount, setCheckAccount] = useState(false);
   const [openSnackbar, setOpenSnackbar] = useState(false);
   const [status, setStatus] = useState("계좌인증을 해주세요.");

   const onChangePersonalInfo = (e) => {
      setPersonalInfo({
         ...personalInfo,
         [e.target.name]: e.target.value,
      });
   };
   const onChangeAccountInfo = (e) => {
      setAccountInfo({
         ...accountInfo,
         [e.target.name]: e.target.value,
      });
   };

   const handleOnAccountAuth = async () => {
      setOpenSnackbar(true);

      const res = await accountHolderFunc(accountInfo);
      if (res === null || res === undefined) return;

      switch (res.data.Header.Rsms) {
         case "정상처리 되었습니다.":
            setCheckAccount(true);

         default:
            setStatus(res.data.Header.Rsms);
      }
   };

   const handleOnRegister = async () => {
      // 회원가입 처리
      if (personalInfo.name === "") return alert("이름을 입력해주세요.");
      if (personalInfo.phoneNumber === "")
         return alert("전화번호를 입력해주세요.");
      if (personalInfo.address === "") return alert("주소를 입력해주세요.");
      if (personalInfo.id === "") return alert("아이디를 입력해주세요.");
      if (personalInfo.password === "")
         return alert("비밀번호를 입력해주세요.");
      if (!checkAccount) return alert("계좌인증을 해주세요.");

      const user = {
         personalInfo,
         accountInfo,
      };
      if (newUser(user)) {
         alert("회원가입이 완료되었습니다.");
         history.push("/");
      } else {
         return alert("회원가입 실패!");
      }
   };

   const handleOnLogin = () => {
      history.push("/");
   };

   const SnackbarRender = () => {
      return (
         <Snackbar
            open={openSnackbar}
            message={status}
            action={
               <Fragment>
                  <IconButton
                     size="small"
                     aria-label="close"
                     color="inherit"
                     onClick={() => setOpenSnackbar(false)}
                  >
                     <Close fontSize="small" />
                  </IconButton>
               </Fragment>
            }
         />
      );
   };

   return (
      <div style={{ padding: 20 }}>
         <AccountCircleIcon style={{ fontSize: 50 }} />
         &emsp;회원가입
         <hr />
         <InputLabel>개인정보 입력</InputLabel>
         <div style={TextFieldDivStyle}>
            <TextField
               fullWidth
               label="이름"
               name="name"
               value={personalInfo.name}
               onChange={onChangePersonalInfo}
            />
            <TextField
               fullWidth
               label="전화번호"
               name="phoneNumber"
               value={personalInfo.phoneNumber}
               onChange={onChangePersonalInfo}
            />
            <TextField
               fullWidth
               label="주소"
               name="address"
               value={personalInfo.address}
               onChange={onChangePersonalInfo}
            />
            <TextField
               fullWidth
               label="아이디"
               name="id"
               value={personalInfo.id}
               onChange={onChangePersonalInfo}
            />
            <TextField
               type="password"
               fullWidth
               label="비밀번호"
               name="password"
               value={personalInfo.password}
               onChange={onChangePersonalInfo}
            />
         </div>
         <br />
         <InputLabel>계좌정보 입력</InputLabel>
         <div style={TextFieldDivStyle}>
            <Select
               disabled={checkAccount}
               fullWidth
               native
               name="bankCode"
               onChange={onChangeAccountInfo}
            >
               <option
                  disabled
                  value={accountInfo.bankCode}
                  label="은행사를 선택해주세요."
               />
               {bankCode.map((data, index) => (
                  <option value={data.value} key={index}>
                     {data.text}
                  </option>
               ))}
            </Select>
            <TextField
               disabled={checkAccount}
               fullWidth
               label="계좌번호 입력"
               name="accountNumber"
               value={accountInfo.accountNumber}
               onChange={onChangeAccountInfo}
            />
            <br />
            <div
               style={{ display: "flex", alignItems: "center", marginTop: 5 }}
            >
               <Button
                  disabled={checkAccount}
                  variant="contained"
                  color="inherit"
                  onClick={handleOnAccountAuth}
               >
                  계좌인증
               </Button>
               &emsp;
               <small>{status}</small>
            </div>
         </div>
         &emsp;
         <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleOnRegister}
         >
            회원가입
         </Button>
         &emsp;
         <Button
            fullWidth
            variant="outlined"
            color="secondary"
            onClick={handleOnLogin}
         >
            돌아가기
         </Button>
         <SnackbarRender />
      </div>
   );
};

const TextFieldDivStyle = {
   border: "1px solid lightgrey",
   padding: 30,
};

export default RegisterPageView;
