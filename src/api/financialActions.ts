import { bankCode } from "../data/data";

import { serverUrl } from "../app/info";
import { getTodayApi, getIsTuno, getTimeApi } from "../app/functions";

import { Iscd, FintechApsno, ApiSvcCd, AccessToken } from "../app/info";
import Axios from "axios";
import { TypeUser } from "../data/dbType";
import { TypeAccountHolderResult } from "../data/apiType";
import { UserRef } from "../app/firebaseConfig";

export const accountHolderFunc = async (accountInfo): Promise<TypeAccountHolderResult> => {
  if (accountInfo.bankCode === "") return alert("은행사를 선택해주세요.");
  if (accountInfo.accountNumber === "") return alert("계좌번호를 입력해주세요.");

  const url = "https://developers.nonghyup.com/InquireDepositorAccountNumber.nh";

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

  return await Axios.post(url, body)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.error(err);
      return "error";
    });
};

export const registerFinAccount = async (user: TypeUser) => {
  // 핀어카운트 발급(https://developers.nonghyup.com/guide/GU_1010)
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

  try {
    let result = await Axios.post(url, body)
      .then((res) => res)
      .catch((err) => {
        console.error(err);
        throw err;
      });

    console.log(result.data);
    if (!result.data.Rgno) {
      alert(result.data.Header.Rsms);
      throw new Error(result.data);
    }

    console.log(result);
    await UserRef.child(user.id)
      .update({
        Rgno: result.data.Rgno,
      })
      .catch((err) => {
        console.error(err);
        throw err;
      });

    // console.info(result);

    // await Axios.patch(`${serverUrl}/users/${user.id}`, {
    //   Rgno: result.data.Rgno,
    // })
    //   .then(() => {
    //     const { Rsms } = result.data.Header;
    //     if (Rsms !== "정상처리 되었습니다.") {
    //       alert(Rsms);
    //     }
    //     console.info("Fin Account Register Success");
    //   })
    //   .catch((err) => {
    //     console.error(err);
    //     alert("에러가 발생하였습니다.");
    //   });

    // 핀어카운트 발급 확인(https://developers.nonghyup.com/guide/GU_1020)
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
      .then((res) => (result1 = res))
      .catch((err) => {
        console.error(err);
        throw err;
      });

    // console.info(result1);

    // await Axios.patch(`${serverUrl}/users/${user.id}`, {
    //   FinAcno: result1.data.FinAcno,
    // })
    //   .then(() => {
    //     alert(result1.data.Header.Rsms);
    //   })
    //   .catch((err) => {
    //     console.error(err);
    //     alert("에러가 발생하였습니다.");
    //   });

    await UserRef.child(user.id)
      .update({ FinAcno: result1.data.FinAcno })
      .then(() => {
        alert(result1.data.Header.Rsms);
      })
      .catch((err) => {
        console.error(err);
        throw err;
      });
  } catch (err) {
    console.error(err);
    // alert("에러가 발생하였습니다.");
  }
};

export const getRemainCost = async (user: TypeUser) => {
  const url = "https://developers.nonghyup.com/InquireBalance.nh";

  const body = {
    Header: {
      ApiNm: "InquireBalance",
      Tsymd: getTodayApi(),
      Trtm: getTimeApi(),
      Iscd,
      FintechApsno,
      ApiSvcCd,
      IsTuno: getIsTuno(),
      AccessToken,
    },
    FinAcno: user.FinAcno,
  };

  const result = await Axios.post(url, body)
    .then((res) => res)
    .catch((err) => {
      // console.error(err);
      return err;
    });

  return result;
};
