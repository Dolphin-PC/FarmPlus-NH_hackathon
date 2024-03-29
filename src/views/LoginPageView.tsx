import { Button, TextField } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { SET_NAV } from "../actions/types";
import { loginUser } from "../actions/userActions";
// import * as Color from "../assets/colors";
import loginVideo from "../assets/video/LoginVideo.mp4";
import { RootStateType } from "../reducers";

const LoginPageView = () => {
  // 현재 브라우저의 전체 높이 값을 반환
  const height = window.outerHeight;

  const history = useHistory();
  const dispatch = useDispatch();
  const _user = useSelector((state: RootStateType) => state.user);

  const [user, setUser] = useState({
    id: "seller",
    password: "123",
  });

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

  // eslint-disable-next-line
  useEffect(() => {
    if (_user !== null) {
      history.push("/filter");
      dispatch({
        type: SET_NAV,
        payload: "filter",
      });
    }
    // eslint-disable-next-line
  }, [_user]);

  return (
    <div className="LoginStyle" style={{ height: height }}>
      <video controls width="100%" height={height} style={{ position: "absolute", objectFit: "cover", zIndex: -1 }} autoPlay muted>
        <source src={loginVideo} type="video/mp4" />
      </video>
      <h1 style={{ fontSize: 50, position: "fixed", top: 20, left: 20 }} className="LoginHeader">
        FARM
        <br />
        PLUS +
      </h1>
      <form style={{ width: "80%", position: "fixed", bottom: 20 }}>
        <TextField
          name="id"
          value={user.id}
          type="text"
          fullWidth
          variant="outlined"
          label="아이디를 입력해주세요."
          onChange={handleOnChange}
          style={{
            color: "white",
            borderColor: "white",
            backgroundColor: "white",
            borderRadius: 10,
          }}
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
          style={{
            color: "white",
            borderColor: "white",
            backgroundColor: "white",
            borderRadius: 10,
          }}
        />
        &emsp;
        <Button size="large" style={{ backgroundColor: "white" }} fullWidth variant="contained" onClick={handleLogin}>
          로그인
        </Button>
        &emsp;
        <Button size="large" fullWidth color="secondary" variant="contained" onClick={handleRegister}>
          회원가입
        </Button>
      </form>
    </div>
  );
};

export default LoginPageView;
