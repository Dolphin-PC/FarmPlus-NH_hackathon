import React, { Fragment, useState } from "react";
import {
   Button,
   IconButton,
   InputLabel,
   Select,
   Snackbar,
   Tab,
   Tabs,
   TextField,
} from "@material-ui/core";
import { ArrowBack, Close } from "@material-ui/icons";
import { useHistory } from "react-router-dom";

import { bankCode } from "../data/data";
import { accountHolderFunc } from "../api/financialActions";
import { a11yProps, TabPanel } from "../app/functions";
import { newUser } from "../actions/userActions";
import * as Color from "../assets/colors";

const RegisterPageView = () => {
   const [value, setValue] = useState(0);
   const history = useHistory();
   const [personalInfo, setPersonalInfo] = useState({
      name: "",
      phoneNumber: "",
      address: "",
      landNumber: "",
      birthDay: "",
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

      if (res.data.Header.Rsms === "정상처리 되었습니다.") {
         setCheckAccount(true);
      }
      setStatus(res.data.Header.Rsms);
   };

   const handleOnRegister = async () => {
      // 회원가입 처리
      if (personalInfo.name === "") return alert("이름을 입력해주세요.");
      if (personalInfo.phoneNumber === "")
         return alert("전화번호를 입력해주세요.");
      if (personalInfo.address === "") return alert("주소를 입력해주세요.");
      if (personalInfo.birthDay === "")
         return alert("생년월일을 입력해주세요.");
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

   const handleChangePage = (event, newValue) => {
      setValue(newValue);
   };

   return (
      <div style={{ padding: 20 }}>
         <div className="Row">
            <ArrowBack onClick={handleOnLogin} />
            &emsp;<h4>회원가입</h4>
         </div>
         <hr />
         <TabPanel value={value} index={0}>
            <br />
            <h5>1. 개인정보를 입력해주세요.(필수)</h5>
            <br />
            <br />
            <InputLabel>이름</InputLabel>
            <TextField
               variant="outlined"
               placeholder="이름"
               required
               fullWidth
               name="name"
               value={personalInfo.name}
               onChange={onChangePersonalInfo}
            />
            &emsp;
            <InputLabel>전화번호</InputLabel>
            <TextField
               variant="outlined"
               placeholder="전화번호"
               required
               fullWidth
               name="phoneNumber"
               value={personalInfo.phoneNumber}
               onChange={onChangePersonalInfo}
            />
            &emsp;
            <InputLabel>주소</InputLabel>
            <TextField
               variant="outlined"
               placeholder="주소"
               required
               fullWidth
               name="address"
               value={personalInfo.address}
               onChange={onChangePersonalInfo}
            />
            &emsp;
            <InputLabel>생년월일</InputLabel>
            <TextField
               variant="outlined"
               placeholder="생년월일"
               required
               fullWidth
               name="birthDay"
               value={personalInfo.birthDay}
               onChange={onChangePersonalInfo}
            />
            &emsp;
         </TabPanel>
         <TabPanel value={value} index={1}>
            <br />
            <h5>2. 계정정보를 입력해주세요.(필수)</h5>
            <br />
            <br />
            <InputLabel>아이디</InputLabel>
            <TextField
               variant="outlined"
               required
               fullWidth
               name="id"
               placeholder="아이디"
               value={personalInfo.id}
               onChange={onChangePersonalInfo}
            />
            &emsp;
            <InputLabel>비밀번호</InputLabel>
            <TextField
               fullWidth
               variant="outlined"
               required
               type="password"
               name="password"
               placeholder="비밀번호"
               value={personalInfo.password}
               onChange={onChangePersonalInfo}
            />
         </TabPanel>
         <TabPanel value={value} index={2}>
            <br />
            <h5>3. 서류를 등록해주세요.(선택)</h5>
            <br />
            <br />
            <InputLabel>토지등록번호</InputLabel>
            <TextField
               variant="outlined"
               fullWidth
               placeholder="토지등록번호"
               name="landNumber"
               value={personalInfo.landNumber}
               onChange={onChangePersonalInfo}
            />
         </TabPanel>
         <TabPanel value={value} index={3}>
            <br />
            <h5>4. 계좌정보를 입력해주세요.(필수)</h5>
            <br />
            <br />
            <InputLabel>은행사 선택</InputLabel>
            <Select
               variant="outlined"
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
            &emsp;
            <InputLabel>계좌번호</InputLabel>
            <TextField
               variant="outlined"
               disabled={checkAccount}
               fullWidth
               placeholder="계좌번호 입력"
               name="accountNumber"
               value={accountInfo.accountNumber}
               onChange={onChangeAccountInfo}
            />
            <br />
            <div
               style={{ display: "flex", alignItems: "center", marginTop: 15 }}
            >
               <Button
                  style={{
                     border: `1px solid ${Color.mainColor}`,
                     color: Color.mainColor,
                  }}
                  disabled={checkAccount}
                  onClick={handleOnAccountAuth}
               >
                  계좌인증
               </Button>
               &emsp;
               <small>{status}</small>
            </div>
            &emsp;
            <Button
               fullWidth
               style={{ backgroundColor: Color.mainColor, color: "white" }}
               onClick={handleOnRegister}
            >
               회원가입
            </Button>
         </TabPanel>
         <Tabs
            variant="scrollable"
            scrollButtons="on"
            style={{ position: "fixed", bottom: 0, left: -5 }}
            value={value}
            onChange={handleChangePage}
         >
            <Tab label="개인정보(필수)" {...a11yProps(0)} />
            <Tab label="계정정보(필수)" {...a11yProps(1)} />
            <Tab label="판매자서류(선택)" {...a11yProps(2)} />
            <Tab label="계좌정보(필수)" {...a11yProps(3)} />
         </Tabs>
         <SnackbarRender />
      </div>
   );
};
export default RegisterPageView;
