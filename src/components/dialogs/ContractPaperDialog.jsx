import {
   Accordion,
   AccordionDetails,
   AccordionSummary,
   Avatar,
   Button,
   Checkbox,
   Dialog,
   DialogActions,
   DialogContent,
   DialogContentText,
   DialogTitle,
   FormControlLabel,
   Paper,
   Typography,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { acceptRequest } from "../../actions/userActions";

const ContractPaperDialog = (props) => {
   const { onClose, open, requester, product, tradeId } = props;
   console.info(open);

   const dispatch = useDispatch();
   const user = useSelector((state) => state.user);

   const handleClose = () => {
      onClose();
   };

   const handleOnWrite = () => {};

   const DialogRender = (props) => {
      return (
         <Dialog open={open} onClose={handleClose}>
            <DialogTitle>농산물 포전매매 표준계약서</DialogTitle>
            <DialogContent>{props.children}</DialogContent>
            <DialogActions>
               <Button onClick={handleClose} color="primary">
                  작성
               </Button>
            </DialogActions>
         </Dialog>
      );
   };

   const AccordionRender = (props) => {
      return (
         <Accordion>
            <AccordionSummary
               expandIcon={<ExpandMoreIcon />}
               aria-label="Expand"
               aria-controls="additional-actions1-content"
               id="additional-actions1-header"
            >
               <FormControlLabel
                  aria-label="Acknowledge"
                  onClick={(event) => event.stopPropagation()}
                  onFocus={(event) => event.stopPropagation()}
                  control={<Checkbox />}
                  label="I acknowledge that I should stop the click event propagation"
               />
            </AccordionSummary>
            <AccordionDetails>
               <Typography color="textSecondary">
                  The click event of the nested action will propagate up and
                  expand the accordion unless you explicitly stop it.
               </Typography>
            </AccordionDetails>
         </Accordion>
      );
   };
   return (
      <DialogRender>
         <p>
            아래 목적물을 포전매매 함에 있어 매도인(이하 “갑”이라고 한다)과
            매수인(이하 “을”이라고 한다)은 다음과 같이 계약을 체결하고
            신의성실의 원칙에 따라 이를 이행하여야 한다.
         </p>

         {/* <small>
            [주의사항] 농수산물유통 및 가격안정에 관한 법률 제90조제1항제2호에
            따라 이 표준계약서와 다른 계약서를 사용하면서 ‘표준계약서’로
            거짓표시 하거나, ‘농림축산식품부’ 및 ‘농림축산식품부 표식’을
            사용하는 매수인에게는 1천만원 이하의 과태료가 부과됩니다.
         </small> */}
      </DialogRender>
   );
};

const ButtonStyle = {
   padding: 20,
};

export default ContractPaperDialog;
