import {
   Accordion,
   AccordionDetails,
   AccordionSummary,
   Button,
   Checkbox,
   Dialog,
   DialogActions,
   DialogContent,
   DialogTitle,
   Drawer,
   FormControlLabel,
   Input,
   InputLabel,
   Typography,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";

import { contract } from "../../data/data";
import { sendContract } from "../../actions/contractActions";
import { drawingTransfer } from "../../api/simplePayActions";
import ContractAccordionComp from "../accordions/ContractAccordionComp";
import { getUserInfo } from "../../actions/userActions";
import { getAccountNumber, getBankName } from "../../app/functions";
import { getRemainCost } from "../../api/financialActions";
import DrawerText from "../Drawer/DrawerText";

const ContractDialog = (props) => {
   const dispatch = useDispatch();
   const user = useSelector((state) => state.user);
   const {
      onClose,
      open,
      requester,
      product,
      tradeId,
      deposit,
      isContract,
   } = props;

   const [page, setPage] = useState("main");
   const [agreement, setAgreement] = useState({
      agree1: false,
      agree2: false,
      agree3: false,
      agree4: false,
      agree5: false,
      agree6: false,
      agree7: false,
      agree8: false,
      agree9: false,
      agree10: false,
      agree11: false,
      agree12: false,
      agree13: false,
   });
   const [isContractAgree, setIsContractAgree] = useState(false);
   const [remainCost, setRemainCost] = useState("Loading...");

   useEffect(() => {
      if (isContract) {
         setPage("deposit");
      }

      const fetchRemainCost = async () => {
         const res = await getRemainCost(user);
         if (res.data.Header.Rsms === "정상처리 되었습니다.") {
            setRemainCost(`${Number(res.data.RlpmAbamt).toLocaleString()} 원`);
         }
      };

      fetchRemainCost();
   }, [open]);

   // 계약서 조항 동의
   const handleOnAgree = (event) => {
      setAgreement({
         ...agreement,
         [event.target.name]: event.target.checked,
      });
   };

   // 계약서 뒤로가기(메인으로)
   const handleOnBack = () => {
      setPage("main");
   };

   // 계약서 다음(모든 조항 동의 후)
   const handleOnNext = () => {
      for (var i in agreement) {
         if (!agreement[i]) {
            return alert("모든 조항의 동의가 필요합니다.");
         }
      }

      setIsContractAgree(true);
      setPage("main");
   };

   // 계약서 모든 조항 동의
   const handleOnAllCheck = () => {
      setAgreement({
         agree1: true,
         agree2: true,
         agree3: true,
         agree4: true,
         agree5: true,
         agree6: true,
         agree7: true,
         agree8: true,
         agree9: true,
         agree10: true,
         agree11: true,
         agree12: true,
         agree13: true,
      });
   };

   // 계약서 다이얼로그 닫기
   const handleClose = () => {
      setPage("main");
      onClose();
   };

   // 계약서 전송
   const handleOnAccept = () => {
      if (!isContractAgree)
         return alert("계약 정보 확인 및 동의가 필요합니다.");

      if (sendContract(user, tradeId)) {
         alert("계약서 전송에 성공하였습니다.");
         dispatch(getUserInfo(user));
         handleClose();
      }
   };

   const handleOnSendDeposit = () => {
      if (!user.user.FinAcno) {
         return alert("출금이체를 위해 핀어카운트 발급이 필요합니다.");
      }

      if (window.confirm("출금 이체를 하시겠습니까?")) {
         // 출금 이체 성공 시
         if (drawingTransfer(user, product, tradeId)) {
            alert("정상적으로 처리되었습니다.");
            onClose();
         }
      }
   };

   // 계약서 Header, Bottom 틀
   const DialogRender = (props) => {
      return (
         <Dialog open={open} onClose={handleClose}>
            <DialogTitle>계약서 작성</DialogTitle>
            <DialogContent>{props.children}</DialogContent>
            <DialogActions>
               <Button onClick={handleOnAccept} color="primary">
                  전송
               </Button>
            </DialogActions>
         </Dialog>
      );
   };

   // 계약 조항 틀
   const AccordionRender = ({ summary, agreeName, content }) => {
      const check = agreement[agreeName];
      return (
         <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
               <FormControlLabel
                  control={
                     <Checkbox
                        checked={check}
                        name={agreeName}
                        onChange={handleOnAgree}
                     />
                  }
                  label={summary}
               />
            </AccordionSummary>
            <AccordionDetails>
               <Typography color="textSecondary">{content}</Typography>
            </AccordionDetails>
         </Accordion>
      );
   };

   // 메인 Render
   switch (page) {
      // 계약서 다이얼로그
      case "contract":
         return (
            <Dialog open={open} onClose={handleClose}>
               <DialogTitle>농산물 포전매매 표준계약서</DialogTitle>
               <DialogContent>
                  <p>
                     아래 목적물을 포전매매 함에 있어 매도인(이하 “갑”이라고
                     한다)과 매수인(이하 “을”이라고 한다)은 다음과 같이 계약을
                     체결하고 신의성실의 원칙에 따라 이를 이행하여야 한다.
                  </p>
                  <ContractAccordionComp
                     product={product}
                     requester={requester}
                  />
                  {contract.map((agree, index) => {
                     return <AccordionRender key={index} {...agree} />;
                  })}
                  <small>
                     [주의사항] 농수산물유통 및 가격안정에 관한 법률
                     제90조제1항제2호에 따라 이 표준계약서와 다른 계약서를
                     사용하면서 ‘표준계약서’로 거짓표시 하거나, ‘농림축산식품부’
                     및 ‘농림축산식품부 표식’을 사용하는 매수인에게는 1천만원
                     이하의 과태료가 부과됩니다.
                  </small>
               </DialogContent>
               <DialogActions
                  style={{ display: "flex", justifyContent: "space-between" }}
               >
                  <Button onClick={handleOnAllCheck} color="primary">
                     전체동의
                  </Button>
                  <div>
                     <Button onClick={handleOnBack} color="primary">
                        뒤로가기
                     </Button>
                     <Button onClick={handleOnNext} color="primary">
                        다음
                     </Button>
                  </div>
               </DialogActions>
            </Dialog>
         );

      // 송금 다이얼로그
      case "deposit":
         if (user.user.id === product.seller.id) {
            return (
               <Dialog open={open} onClose={handleClose}>
                  <DialogTitle>계약금 입금 대기 중</DialogTitle>
                  <DialogContent>
                     상대방의 계약금이 아직 입금되지 않았습니다.
                  </DialogContent>
                  <DialogActions>
                     <Button onClick={onClose} color="primary">
                        닫기
                     </Button>
                  </DialogActions>
               </Dialog>
            );
         }
         return (
            <Drawer anchor="bottom" open={open} onClose={handleClose}>
               <div style={{ padding: "20px 20px 0px 20px " }}>
                  <InputLabel>계약금 출금이체</InputLabel>
                  <hr />
                  <InputLabel>본인 계좌</InputLabel>
                  <div
                     className="Account-Bank-Box Row"
                     style={{ justifyContent: "space-between" }}
                  >
                     <div className="Col" style={{ width: "48%" }}>
                        <InputLabel>
                           {getBankName(user.user.bankCode)}
                        </InputLabel>
                        <small>
                           {getAccountNumber(user.user.accountNumber)}
                        </small>
                     </div>
                     <div
                        className="Col"
                        style={{ width: "48%", textAlign: "right" }}
                     >
                        <InputLabel>현재 금액</InputLabel>
                        <small>{remainCost}</small>
                     </div>
                  </div>

                  <InputLabel>판매자 정보</InputLabel>
                  <div className="Account-Bank-Box">
                     <DrawerText left="이름" right={product.seller.name} />
                     <DrawerText
                        left="전화번호"
                        right={product.seller.phoneNumber}
                     />
                     <DrawerText
                        left="가격"
                        right={`${product.cost.toLocaleString()} 원`}
                     />
                  </div>
               </div>

               <Button
                  fullWidth
                  variant="contained"
                  onClick={handleOnSendDeposit}
                  color="primary"
                  className="Deposit-Button"
               >
                  출금 이체
               </Button>
            </Drawer>
         );

      // 계약 버튼 다이얼로그
      default:
         return (
            <DialogRender>
               <Button
                  className="ContractButton"
                  onClick={() => setPage("contract")}
                  color="primary"
                  variant="outlined"
               >
                  <h5>
                     계약 정보 확인 및 동의{" "}
                     <Checkbox disabled checked={isContractAgree} />
                  </h5>
               </Button>
            </DialogRender>
         );
   }
};

export default ContractDialog;
