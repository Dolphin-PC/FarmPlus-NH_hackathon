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
import TradeCardComp from "../cards/TradeCardComp";

const TradeDialog = (props) => {
  const { onClose, open, tradeType } = props;

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
          {tradeType}
          <Cancel
            style={{ position: "fixed", top: 20, right: 20 }}
            onClick={handleClose}
          />
        </DialogTitle>

        <DialogContent>{props.children}</DialogContent>
      </Dialog>
    );
  };

  if (user.user.trade === null || user.user.trade === undefined) {
    return (
      <DialogRender>
        <p>거래 내역이 없습니다.</p>
      </DialogRender>
    );
  }

  return (
    <DialogRender>
      {user.user.trade.map((trade, index) =>
        trade.noticeType === tradeType ? (
          <TradeCardComp key={index} {...trade} />
        ) : null
      )}
    </DialogRender>
  );
};

export default TradeDialog;
