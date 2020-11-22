import {
   Button,
   Dialog,
   DialogActions,
   DialogContent,
   DialogContentText,
   DialogTitle,
   Slide,
} from "@material-ui/core";
import { Cancel } from "@material-ui/icons";
import React from "react";

const SearchDialog = (props) => {
   const { onClose, open } = props;

   const handleClose = () => {
      onClose();
   };
   const handleSetting = () => {
      onClose();
   };

   return (
      <Dialog
         fullScreen
         open={open}
         onClose={handleClose}
         style={{ marginTop: 100 }}
      >
         <DialogTitle>
            검색어 설정
            <Cancel
               style={{ position: "fixed", top: 120, right: 20 }}
               onClick={handleClose}
            />
         </DialogTitle>

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
            <Button onClick={handleSetting} color="primary">
               설정
            </Button>
         </DialogActions>
      </Dialog>
   );
};

export default SearchDialog;
