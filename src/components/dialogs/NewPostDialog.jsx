import {
   Dialog,
   DialogContent,
   DialogTitle,
   InputLabel,
   TextField,
   Select,
   Tabs,
   Tab,
   FormHelperText,
} from "@material-ui/core";
import { ArrowBack, PostAdd } from "@material-ui/icons";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNewPost } from "../../actions/postActions";

import { category, location } from "../../data/data";
import { a11yProps, getToday, TabPanel } from "../../app/functions";

const NewProductDialog = (props) => {
   const [page, setPage] = useState(0);

   const user = useSelector((state) => state.user.user);

   const dispatch = useDispatch();
   const { onClose, open } = props;
   const initState = {
      title: "",
      star: 0,
      size: null,
      category: "",
      subCategory: "",
      location: "",
      cost: null,
      content: "",
      imageUrls: [],
      createDate: new Date(),
      date: getToday(),
      address: null,
      plantDay: null,
      outDay: null,
      landNumber: null,
   };
   const [newPost, setNewPost] = useState(initState);
   const [images, setImages] = useState([]);

   const handleClose = () => {
      onClose();
   };

   const handleCreate = async () => {
      if (images.length === 0) return alert("하나 이상의 이미지를 올려주세요.");
      if (newPost.title === "") return alert("제목을 입력해주세요.");
      if (newPost.category === "") return alert("카테고리를 입력해주세요.");
      if (newPost.location === "") return alert("지역을 입력해주세요.");
      if (newPost.size < 0) return alert("면적을 입력해주세요.");

      if (newPost.cost === "") return alert("가격 입력해주세요.");
      if (newPost.cost < 0) return alert("가격은 0 이하가 될 수 없습니다.");

      if (newPost.content === "") return alert("내용을 입력해주세요.");

      if (!window.confirm("게시글을 등록하시겠습니까?")) return;

      await dispatch(addNewPost(newPost, images, user));
      alert("게시글 생성 완료!");
      setNewPost(initState);
      onClose();
   };

   const handleChange = (e) => {
      setNewPost({
         ...newPost,
         [e.target.name]: e.target.value,
      });
   };
   const handleChangePage = (event, newValue) => {
      setPage(newValue);
   };

   return (
      <Dialog fullScreen open={open} onClose={handleClose}>
         <DialogTitle>
            <ArrowBack onClick={handleClose} />
            &emsp; 글 올리기
            <PostAdd
               style={{ position: "fixed", top: 20, right: 20 }}
               onClick={handleCreate}
            />
         </DialogTitle>
         <DialogContent style={{ padding: 20 }}>
            <TabPanel value={page} index={0}>
               <br />
               <h5>1. 게시글 정보를 입력해주세요.</h5>
               <br />
               <br />
               <InputLabel>이미지를 업로드해주세요.</InputLabel>
               <input type="file" onChange={(e) => setImages(e.target.files)} />
               <br />
               <br />
               <InputLabel>제목</InputLabel>
               <TextField
                  variant="outlined"
                  fullWidth
                  name="title"
                  value={newPost.title}
                  placeholder="제목을 입력해주세요."
                  onChange={handleChange}
               />
               &emsp;
               <InputLabel>내용</InputLabel>
               <TextField
                  variant="outlined"
                  multiline
                  type="text"
                  fullWidth
                  name="content"
                  value={newPost.content}
                  placeholder="내용을 입력해주세요."
                  onChange={handleChange}
               />
            </TabPanel>
            <TabPanel value={page} index={1}>
               <br />
               <h5>2. 가격, 면적을 입력해주세요.</h5>
               <br />
               <br />
               <InputLabel>가격</InputLabel>
               <TextField
                  variant="outlined"
                  type="number"
                  fullWidth
                  name="cost"
                  value={newPost.cost}
                  placeholder="가격을 입력해주세요."
                  onChange={handleChange}
               />
               <FormHelperText>
                  {Number(newPost.cost).toLocaleString()} 원
               </FormHelperText>
               &emsp;
               <InputLabel>면적</InputLabel>
               <TextField
                  variant="outlined"
                  type="number"
                  fullWidth
                  name="size"
                  value={newPost.size}
                  placeholder="면적을 입력해주세요.(평)"
                  onChange={handleChange}
               />
               <FormHelperText>
                  {Number(newPost.size).toLocaleString()} 평
               </FormHelperText>
            </TabPanel>
            <TabPanel value={page} index={2}>
               <br />
               <h5>3. 상품 정보를 입력해주세요.</h5>
               <br />
               <br />
               <InputLabel>품목</InputLabel>
               <Select fullWidth native name="category" onChange={handleChange}>
                  <option
                     disabled
                     value={newPost.category}
                     placeholder="품목을 선택해주세요."
                  />
                  {category.map((data, index) => (
                     <option value={data.value} key={index}>
                        {data.text}
                     </option>
                  ))}
               </Select>
               &emsp;
               <TextField
                  variant="outlined"
                  type="text"
                  fullWidth
                  name="subCategory"
                  value={newPost.subCategory}
                  placeholder="상세 품종을 입력해주세요."
                  onChange={handleChange}
               />
               &emsp;
               <InputLabel>지역</InputLabel>
               <Select native fullWidth name="location" onChange={handleChange}>
                  <option disabled value={newPost.location} />
                  {location.map((data, index) => (
                     <option value={data.value} key={index}>
                        {data.text}
                     </option>
                  ))}
               </Select>
               &emsp;
               <TextField
                  variant="outlined"
                  type="text"
                  fullWidth
                  name="address"
                  value={newPost.address}
                  placeholder="상세 주소를 입력해주세요."
                  onChange={handleChange}
               />
            </TabPanel>
            <TabPanel value={page} index={3}>
               <br />
               <h5>4. 계약 정보를 입력해주세요.</h5>
               <br />
               <br />
               <InputLabel>파종일</InputLabel>
               <TextField
                  variant="outlined"
                  type="date"
                  fullWidth
                  name="plantDay"
                  placeholder="파종일을 입력해주세요."
                  value={newPost.plantDay}
                  onChange={handleChange}
               />
               &emsp;
               <InputLabel>반출날짜</InputLabel>
               <TextField
                  variant="outlined"
                  type="date"
                  fullWidth
                  name="outDay"
                  placeholder="반출일을 입력해주세요."
                  value={newPost.outDay}
                  onChange={handleChange}
               />
               &emsp;
               <InputLabel>토지등록번호</InputLabel>
               <TextField
                  variant="outlined"
                  type="text"
                  fullWidth
                  placeholder="토지등록번호를 입력해주세요."
                  name="landNumber"
                  value={newPost.landNumber}
                  onChange={handleChange}
               />
            </TabPanel>
            <Tabs
               variant="scrollable"
               scrollButtons="on"
               style={{ position: "fixed", bottom: 0, left: -5 }}
               value={page}
               onChange={handleChangePage}
            >
               <Tab label="1.게시글 정보" {...a11yProps(0)} />
               <Tab label="2.가격,면적" {...a11yProps(1)} />
               <Tab label="3.상품 정보" {...a11yProps(2)} />
               <Tab label="4.계약 정보" {...a11yProps(3)} />
            </Tabs>
         </DialogContent>
      </Dialog>
   );
};

export default NewProductDialog;
