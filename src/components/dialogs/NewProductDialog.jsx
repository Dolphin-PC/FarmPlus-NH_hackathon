import {
   Dialog,
   DialogActions,
   DialogContent,
   DialogContentText,
   DialogTitle,
   Button,
} from "@material-ui/core";
import { Cancel } from "@material-ui/icons";
import React from "react";

const NewProductDialog = (props) => {
   const { onClose, open } = props;

   const handleClose = () => {
      onClose();
   };

   const handleCreate = () => {
      alert("게시글 생성!");
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
            글 올리기
            <Cancel
               style={{ position: "fixed", top: 120, right: 20 }}
               onClick={handleClose}
            />
         </DialogTitle>

         <DialogContent>
            <input type="file" />
         </DialogContent>
         <DialogActions>
            <Button onClick={handleClose} color="secondary" variant="outlined">
               취소
            </Button>
            <Button onClick={handleCreate} color="primary" variant="contained">
               게시
            </Button>
         </DialogActions>
      </Dialog>
   );
};

export default NewProductDialog;
