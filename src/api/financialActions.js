import { bankCode } from "../data/data";
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

   console.info(body);

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
