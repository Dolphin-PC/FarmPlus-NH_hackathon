/**
 * 원본 소스코드
 * 화면 : https://github.com/Dolphin-PC/FarmPlus-NH_hackathon/blob/main/src/views/RegisterPageView.tsx#L58
 * API : https://github.com/Dolphin-PC/FarmPlus-NH_hackathon/blob/main/src/api/financialActions.ts#L12
 */

// 1. 계좌인증
const handleOnAccountAuth = async () => {
  setOpenSnackbar(true);

  const res = await accountHolderFunc(accountInfo);
  if (res === null || res === undefined) return;

  if (res.data.Header.Rsms === "정상처리 되었습니다.") {
    setCheckAccount(true);
  }
  setStatus(res.data.Header.Rsms);
};

// 2. 계좌인증 API호출
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

// 3. 회원가입 처리
const handleOnRegister = async () => {
  if (personalInfo.name === "") return alert("이름을 입력해주세요.");
  if (personalInfo.phoneNumber === "") return alert("전화번호를 입력해주세요.");
  if (personalInfo.address === "") return alert("주소를 입력해주세요.");
  if (personalInfo.birthDay === "") return alert("생년월일을 입력해주세요.");
  if (personalInfo.id === "") return alert("아이디를 입력해주세요.");
  if (personalInfo.password === "") return alert("비밀번호를 입력해주세요.");
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

// 4. 회원가입 API
export const newUser = async (user: { personalInfo: TypePersonalInfo; accountInfo: TypeAccountInfo }): Promise<boolean> => {
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
  return await FiredbRef.child("users/" + user.personalInfo.id)
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
