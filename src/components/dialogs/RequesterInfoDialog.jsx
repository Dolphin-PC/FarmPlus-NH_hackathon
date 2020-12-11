import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import PhoneIcon from "@material-ui/icons/Phone";
import HomeIcon from "@material-ui/icons/Home";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { acceptRequest, getUserInfo } from "../../actions/userActions";

const RequesterInfoDialog = (props) => {
  const { onClose, open, requester, product, tradeId } = props;

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const handleClose = () => {
    onClose();
  };

  const handleOnDenied = () => {
    alert("거래 취소");
    onClose();
  };

  const handleOnAccept = () => {
    if (window.confirm("거래를 수락하시겠습니까?")) {
      if (dispatch(acceptRequest(user, tradeId, requester, product))) {
        alert("거래가 성사되었습니다!");
        onClose();
      }
    }
  };

  const DialogRender = (props) => {
    return (
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>거래요청</DialogTitle>
        <DialogContent>{props.children}</DialogContent>
        <DialogActions>
          <Button onClick={handleOnDenied} color="primary">
            거절
          </Button>
          <Button onClick={handleOnAccept} color="primary">
            수락
          </Button>
        </DialogActions>
      </Dialog>
    );
  };
  return (
    <DialogRender>
      <div style={{ marginBottom: "20px" }}>
        <small>게시물 명</small>
        <div>{product.title}</div>
      </div>

      <div>
        <small>신청자 정보</small>
        <div style={{ display: "flex", alignItems: "center" }}>
          <div className="text-center" style={{ width: 40 }}>
            <Avatar>{requester.name[0]}</Avatar>
          </div>

          <div style={{ marginLeft: 5 }}>{requester.name}</div>
        </div>

        <div style={{ display: "flex", alignItems: "center" }}>
          <div
            className="text-center"
            style={{
              width: 40,
              height: 40,
              borderRadius: "50%",
              border: "1px solid black",
              lineHeight: 2,
              flexShrink: 0,
            }}
          >
            <HomeIcon />
          </div>
          <div style={{ marginLeft: 5 }}>
            강원도 춘천시 옥천동 2-4 303호{requester.address}
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center" }}>
          <div
            className="text-center"
            style={{
              width: 40,
              height: 40,
              borderRadius: "50%",
              border: "1px solid black",
              lineHeight: 2,
              flexShrink: 0,
            }}
          >
            <PhoneIcon />
          </div>

          <div style={{ marginLeft: 5 }}>{requester.phoneNumber}</div>
        </div>
      </div>
    </DialogRender>
  );
};

export default RequesterInfoDialog;
