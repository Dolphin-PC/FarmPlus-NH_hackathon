import {
   Avatar,
   Button,
   Dialog,
   DialogActions,
   DialogContent,
   DialogContentText,
   DialogTitle,
} from "@material-ui/core";
import React from "react";

const FilterDialog = (props) => {
   const { onClose, open } = props;

   const handleClose = () => {
      onClose();
   };
   const handleSetting = () => {
      // TODO: filter Reducer 설정
      onClose();
   };

   return (
      <Dialog open={open} onClose={handleClose}>
         <DialogTitle>게시글 필터 설정</DialogTitle>
         <DialogContent>
            <DialogContentText>
               Let Google help apps determine location. This means sending
               anonymous location data to Google, even when no apps are running.
            </DialogContentText>
         </DialogContent>
         <DialogActions>
            <Button onClick={handleClose} color="primary">
               취소
            </Button>
            <Button onClick={handleSetting} color="primary" autoFocus>
               설정
            </Button>
         </DialogActions>
      </Dialog>
   );
};

export default FilterDialog;
