import {
   Dialog,
   DialogContent,
   DialogContentText,
   DialogTitle,
} from "@material-ui/core";
import { Cancel } from "@material-ui/icons";
import React from "react";

const NoticeDialog = (props) => {
   const { onClose, open } = props;

   const handleClose = () => {
      onClose();
   };

   return (
      <Dialog fullScreen open={open} onClose={handleClose}>
         <DialogTitle>
            수신된 알림
            <Cancel
               style={{ position: "fixed", top: 20, right: 20 }}
               onClick={handleClose}
            />
         </DialogTitle>

         <DialogContent>
            <DialogContentText>
               Let Google help apps determine location. This means sending
               anonymous location data to Google, even when no apps are running.
            </DialogContentText>
         </DialogContent>
      </Dialog>
   );
};

export default NoticeDialog;
