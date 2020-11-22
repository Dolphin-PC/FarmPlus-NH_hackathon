import {
   Dialog,
   DialogActions,
   DialogContent,
   DialogContentText,
   DialogTitle,
   Button,
   InputLabel,
   TextField,
   Select,
   MenuItem,
   ListSubheader,
} from "@material-ui/core";
import { Cancel } from "@material-ui/icons";
import React, { Fragment, useState } from "react";
import { useDispatch } from "react-redux";
import { addNewPost } from "../../actions/postActions";

import { category, location } from "../../data/data";

const NewProductDialog = (props) => {
   const dispatch = useDispatch();
   const { onClose, open } = props;
   const [newPost, setNewPost] = useState({
      title: "",
      star: 0,
      size: "",
      category: "",
      location: "",
      cost: 0,
      content: "",
   });

   const handleClose = () => {
      onClose();
   };

   const handleCreate = async () => {
      if (newPost.title === "") return alert("제목을 입력해주세요.");
      if (newPost.category === "") return alert("카테고리를 입력해주세요.");
      if (newPost.location === "") return alert("지역을 입력해주세요.");
      if (newPost.size === "") return alert("면적을 입력해주세요.");

      if (newPost.cost === "") return alert("가격 입력해주세요.");
      if (newPost.cost < 0) return alert("가격은 0 이하가 될 수 없습니다.");

      if (newPost.content === "") return alert("내용을 입력해주세요.");

      await dispatch(addNewPost(newPost));
      alert("게시글 생성 완료!");
      onClose();
   };

   const handleChange = (e) => {
      setNewPost({
         ...newPost,
         [e.target.name]: e.target.value,
      });
   };
   return (
      <Dialog
         fullScreen
         open={open}
         onClose={handleClose}
         style={{ marginTop: 60 }}
      >
         <DialogTitle>
            글 올리기
            <Cancel
               style={{ position: "fixed", top: 80, right: 20 }}
               onClick={handleClose}
            />
         </DialogTitle>

         <DialogContent>
            <Fragment>
               <TextField
                  style={TextFieldStyle}
                  fullWidth
                  name="title"
                  value={newPost.title}
                  label="제목을 입력해주세요."
                  onChange={handleChange}
               />

               <InputLabel>카테고리를 선택해주세요.</InputLabel>
               <Select
                  fullWidth
                  native
                  style={TextFieldStyle}
                  name="category"
                  onChange={handleChange}
               >
                  <option
                     disabled
                     value={newPost.category}
                     label="카테고리를 선택해주세요."
                  />
                  {category.map((data, index) => (
                     <option value={data.value} key={index}>
                        {data.text}
                     </option>
                  ))}
               </Select>

               <InputLabel>지역을 선택해주세요.</InputLabel>
               <Select
                  fullWidth
                  native
                  style={TextFieldStyle}
                  name="location"
                  onChange={handleChange}
               >
                  <option
                     disabled
                     value={newPost.location}
                     label="지역을 선택해주세요."
                  />
                  {location.map((data, index) => (
                     <option value={data.value} key={index}>
                        {data.text}
                     </option>
                  ))}
               </Select>

               <TextField
                  type="number"
                  style={TextFieldStyle}
                  fullWidth
                  name="size"
                  value={newPost.size}
                  label="면적을 입력해주세요.(㎡)"
                  onChange={handleChange}
               />
               <TextField
                  type="number"
                  style={TextFieldStyle}
                  fullWidth
                  name="cost"
                  value={newPost.cost}
                  label="가격을 입력해주세요."
                  onChange={handleChange}
               />
               <TextField
                  multiline
                  type="text"
                  style={TextFieldStyle}
                  fullWidth
                  name="content"
                  value={newPost.content}
                  label="내용을 입력해주세요."
                  onChange={handleChange}
               />
            </Fragment>
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

const TextFieldStyle = {
   marginBottom: 20,
};

export default NewProductDialog;
