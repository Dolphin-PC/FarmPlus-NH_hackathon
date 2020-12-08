import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import { Cancel } from "@material-ui/icons";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserInfo } from "../../actions/userActions";
import NoticeCardComp from "../cards/NoticeCardComp";

const NoticeDialog = (props) => {
  const { onClose, open } = props;

  const handleClose = () => {
    onClose();
  };

  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserInfo(user));
  }, [open]);

  const DialogRender = (props) => {
    return (
      <Dialog fullScreen open={open} onClose={handleClose}>
        <DialogTitle>
          수신된 알림
          <Cancel
            style={{ position: "fixed", top: 20, right: 20 }}
            onClick={handleClose}
          />
        </DialogTitle>

        <DialogContent>{props.children}</DialogContent>
      </Dialog>
    );
  };

  if (user.user.notice === null || user.user.notice === undefined) {
    return (
      <DialogRender>
        <p>수신된 알림이 없습니다.</p>
      </DialogRender>
    );
  }

  return (
    <DialogRender>
      {/* TODO: 칼럼 CardComponent 추가하기, 
         게시글이랑 똑같은 양식으로 게시글이랑 붙여서 해도 되고, 
         상단이나 하단에 위치해도 되고*/}

      {user.user.notice.map((noti, index) => (
        <NoticeCardComp key={index} {...noti} />
      ))}
    </DialogRender>
  );
};

export default NoticeDialog;
