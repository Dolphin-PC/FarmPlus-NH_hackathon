import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Drawer, InputLabel } from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";

import { Fragment, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRemainCost } from "../../api/financialActions";
import { receivedTransferAccountNumber } from "../../api/simplePayActions";
import { getAccountNumber, getBankName } from "../../app/functions";
import ContractAccordionComp from "../accordions/ContractAccordionComp";
import DrawerText from "../Drawer/DrawerText";
import * as Color from "../../assets/colors";
import { RootStateType } from "../../reducers";

const CompleteDialog = (props) => {
  const { onClose, open, requester, product, tradeId, deposit } = props;

  const dispatch = useDispatch();
  const user = useSelector((state: RootStateType) => state.user);
  const [remainCost, setRemainCost] = useState("Loading...");
  const [star, setStar] = useState(2);
  const realCost = product.cost - product.cost * 0.01;

  useEffect(() => {
    const fetchRemainCost = async () => {
      const res = await getRemainCost(user);
      if (res.data.Header.Rsms === "정상처리 되었습니다.") {
        setRemainCost(`${Number(res.data.RlpmAbamt).toLocaleString()} 원`);
      }
    };

    fetchRemainCost();
  }, [open]);

  const handleClose = () => {
    onClose();
  };
  const handleOnAccept = () => {
    // 판매자 일 경우, 돈 입금이체 신청
    if (window.confirm(`${realCost.toLocaleString()} 원\n입금 이체를 신청하시겠습니까?`)) {
      if (receivedTransferAccountNumber(user, product, requester, tradeId)) {
        alert("정상적으로 처리되었습니다.");
        onClose();
      } else {
        alert("오류가 발생했습니다.(console 확인)");
      }
    }
  };

  const DialogRender = (props) => {
    return (
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>거래 완료</DialogTitle>
        <DialogContent>{props.children}</DialogContent>
      </Dialog>
    );
  };

  if (user.id === requester.id) {
    return (
      <DialogRender>
        <small>게시물 명</small>
        <br />
        {product.title}
        <br />
        <br />
        <Fragment>
          <ContractAccordionComp product={product} requester={requester} />

          <br />
          <InputLabel>거래가 완료되었습니다.</InputLabel>
          <DialogActions>
            <Rating
              value={star}
              onChange={(event, star) => {
                setStar(star);
              }}
            />
          </DialogActions>
        </Fragment>
      </DialogRender>
    );
  }
  return (
    <Drawer anchor="bottom" open={open} onClose={handleClose}>
      <div style={{ padding: "20px 20px 0px 20px " }}>
        <h5>계약금 입금이체</h5>
        <hr />
        <InputLabel>본인 계좌</InputLabel>
        <div className="Account-Bank-Box Row" style={{ justifyContent: "space-between" }}>
          <div className="Col" style={{ width: "48%" }}>
            <InputLabel>{getBankName(user.bankCode)}</InputLabel>
            <small>{getAccountNumber(user.accountNumber)}</small>
          </div>
          <div className="Col" style={{ width: "48%", textAlign: "right" }}>
            <InputLabel>현재 금액</InputLabel>
            <small>{remainCost}</small>
          </div>
        </div>

        <InputLabel>판매 정보</InputLabel>
        <div className="Account-Bank-Box">
          <DrawerText left="게시글" right={product.title} />
          <DrawerText left="품종/품목" right={`${product.category}/${product.subCategory}`} />
          <DrawerText left="계약금" right={`${product.cost.toLocaleString()} 원`} />
          <DrawerText left="서비스 수수료(1%)" right={`${(product.cost * 0.01).toLocaleString()} 원`} />
          <DrawerText left="실 입금액" right={`${realCost.toLocaleString()} 원`} />
        </div>
      </div>
      <div style={{ marginBottom: 40 }}>
        <ContractAccordionComp product={product} requester={requester} />
      </div>

      <Button
        style={{
          padding: 10,
          position: "fixed",
          bottom: 0,
          backgroundColor: deposit === 0 ? "gray" : Color.mainColor,
          color: "white",
        }}
        disabled={deposit === 0 ? true : false}
        onClick={handleOnAccept}
        fullWidth
      >
        {deposit === 0 ? "입금완료" : "입금받기"}
      </Button>
    </Drawer>
  );
};

export default CompleteDialog;
