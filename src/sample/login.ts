/**
 * 원본 소스코드
 * 화면 : https://github.com/Dolphin-PC/FarmPlus-NH_hackathon/blob/main/src/views/LoginPageView.tsx#L24
 * API : https://github.com/Dolphin-PC/FarmPlus-NH_hackathon/blob/main/src/actions/userActions.ts#L41
 */

const _user = useSelector((state: RootStateType) => state.user);
const dispatch = useDispatch();

const handleLogin = () => {
  // 로그인 처리
  dispatch(loginUser(user));
};

// 로그인
export const loginUser = (user: { id: string; password: string }) => async (dispatch) => {
  try {
    // * json-server
    //  await Axios.get(`${serverUrl}users?id=${user.id}`).then((res) => {
    //    console.info(res);
    //    if (res.data.length === 0) {
    //      alert("로그인 실패 | 아이디를 확인해주세요.");
    //      return;
    //    }
    //    if (res.data[0].password === user.password) {
    //      console.info(res.data[0]);
    //      dispatch({
    //        type: SET_USER,
    //        payload: res.data[0],
    //      });
    //    } else {
    //      alert("로그인 실패 | 비밀번호 오류");
    //    }
    //  });

    // * firebase
    FiredbRef.child("users/" + user.id)
      .get()
      .then((snapshot) => {
        if (snapshot.exists()) {
          const res: TypeUser = snapshot.val();
          if (res.trade) {
            res.trade = Object.values(res.trade);
          }

          if (res.notice) {
            res.notice = Object.values(res.notice);
          }

          if (res.password == user.password) {
            dispatch({
              type: SET_USER,
              payload: res,
            });
          } else {
            alert("로그인 실패 | 비밀번호 오류");
          }
        } else {
          alert("로그인 실패 | 아이디를 확인해주세요.");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  } catch (err) {
    alert("로그인 실패");
    console.error(err);
    return false;
  }
};
