import { Dialog, DialogContent, DialogTitle } from "@material-ui/core";
import { Cancel, Refresh } from "@material-ui/icons";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserInfo } from "../../actions/userActions";
import NoticeCardComp from "../cards/NoticeCardComp";
import ColumnCardComp from "../cards/ColumnCardComp";
import { RootStateType } from "../../reducers";

const NoticeDialog = (props) => {
  const { onClose, open } = props;

  const handleClose = () => {
    onClose();
  };

  const dispatch = useDispatch();
  const user = useSelector((state: RootStateType) => state.user);

  const handleOnRefresh = () => {
    dispatch(getUserInfo(user));
  };

  const DialogRender = (props) => {
    return (
      <Dialog fullScreen open={open} onClose={handleClose}>
        <DialogTitle>
          수신된 알림 &ensp;
          <Refresh onClick={handleOnRefresh} className="RefreshIcon" />
          <Cancel style={{ position: "fixed", top: 20, right: 20 }} onClick={handleClose} />
        </DialogTitle>

        <DialogContent>
          <ColumnCardComp />
          {props.children}
        </DialogContent>
      </Dialog>
    );
  };

  if (user.notice === undefined || user.notice === null || user.notice.length === 0) {
    return (
      <DialogRender>
        <p>수신된 알림이 없습니다.</p>
      </DialogRender>
    );
  }

  return (
    <DialogRender>
      {user.notice.map((noti, index) => (
        <NoticeCardComp key={index} {...noti} />
      ))}
    </DialogRender>
  );
};

export default NoticeDialog;
