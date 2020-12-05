import { bankCode } from "../data/data";

import { serverUrl } from "../app/info";
import { getTodayApi, getIsTuno, getTimeApi } from "../app/functions";

import { Iscd, FintechApsno, ApiSvcCd, AccessToken } from "../app/info";
import Axios from "axios";

export const accountHolderFunc = async (accountInfo) => {
   if (accountInfo.bankCode === "") return alert("은행사를 선택해주세요.");
   if (accountInfo.accountNumber === "")
      return alert("계좌번호를 입력해주세요.");

   const url =
      "https://developers.nonghyup.com/InquireDepositorAccountNumber.nh";

   const body = {
      Header: {
         ApiNm: "InquireDepositorAccountNumber",
         Tsymd: getTodayApi(),
         Trtm: getTimeApi(),
         Iscd,
         FintechApsno,
         ApiSvcCd,
         IsTuno: getIsTuno(),
         AccessToken,
      },
      Bncd: accountInfo.bankCode,
      Acno: accountInfo.accountNumber,
   };

   // console.info(body);

   let result;

   await Axios.post(url, body)
      .then((res) => {
         result = res;
      })
      .catch((err) => {
         console.error(err);
         return "error";
      });

   return result;
};

export const registerFinAccount = async (u) => {
   const { user } = u;

   // 핀어카운트 발급
   const url = "https://developers.nonghyup.com/OpenFinAccountDirect.nh";

   const body = {
      Header: {
         ApiNm: "OpenFinAccountDirect",
         Tsymd: getTodayApi(),
         Trtm: getTimeApi(),
         Iscd,
         FintechApsno,
         ApiSvcCd,
         IsTuno: getIsTuno(),
         AccessToken,
      },
      DrtrRgyn: "Y",
      BrdtBrno: user.birthDay,
      Bncd: user.bankCode,
      Acno: user.accountNumber,
   };

   let result;

   await Axios.post(url, body)
      .then((res) => {
         result = res;
      })
      .catch((err) => {
         alert("에러가 발생했습니다.");
         console.error(err);
         return "error";
      });

   console.info(result);

   await Axios.patch(`${serverUrl}/users/${user.id}`, {
      Rgno: result.data.Rgno,
   })
      .then(() => {
         const { Rsms } = result.data.Header;
         if (Rsms !== "정상처리 되었습니다.") {
            alert(Rsms);
         }
         console.info("Fin Account Register Success");
      })
      .catch((err) => {
         console.error(err);
         alert("에러가 발생하였습니다.");
      });

   // 핀어카운트 발급 확인
   const url1 = "https://developers.nonghyup.com/CheckOpenFinAccountDirect.nh";

   const body1 = {
      Header: {
         ApiNm: "CheckOpenFinAccountDirect",
         Tsymd: getTodayApi(),
         Trtm: getTimeApi(),
         Iscd,
         FintechApsno,
         ApiSvcCd,
         IsTuno: getIsTuno(),
         AccessToken,
      },
      Rgno: result.data.Rgno,
      BrdtBrno: user.birthDay,
   };

   let result1;

   await Axios.post(url1, body1)
      .then((res) => {
         result1 = res;
      })
      .catch((err) => {
         alert("에러가 발생했습니다.");
         console.error(err);
         return "error";
      });

   console.info(result1);

   await Axios.patch(`${serverUrl}/users/${user.id}`, {
      FinAcno: result1.data.FinAcno,
   })
      .then(() => {
         alert(result1.data.Header.Rsms);
      })
      .catch((err) => {
         console.error(err);
         alert("에러가 발생하였습니다.");
      });
};
