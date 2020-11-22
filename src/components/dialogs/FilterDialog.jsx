import {
   Avatar,
   Button,
   Dialog,
   DialogActions,
   DialogContent,
   DialogContentText,
   DialogTitle,
   InputLabel,
   MenuItem,
   Select,
} from "@material-ui/core";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CLEAR_FILTER, SET_FILTER, SET_LOCATION } from "../../actions/types";

const FilterDialog = (props) => {
   const { onClose, open } = props;
   const _filter = useSelector((state) => state.filter);
   const dispatch = useDispatch();

   const [filter, setFilter] = useState({
      location: _filter.location,
      category: _filter.category,
   });

   const handleClose = () => {
      onClose();
   };
   const handleSetting = () => {
      // TODO: filter Reducer 설정
      dispatch({
         type: SET_FILTER,
         payload: filter,
      });
      onClose();
   };
   const handleFilter = (e) => {
      switch (e.target.name) {
         case "location":
            return setFilter({
               ...filter,
               location: e.target.value,
            });
         case "category":
            return setFilter({
               ...filter,
               category: e.target.value,
            });
         default:
            return;
      }
   };
   const handleInit = () => {
      setFilter({
         category: "전체",
         location: "전체",
      });
      dispatch({
         type: CLEAR_FILTER,
      });
      onClose();
   };

   const locationData = [
      { value: "전체", text: "전체" },
      { value: "서울", text: "서울" },
      { value: "부산", text: "부산" },
      { value: "강원도", text: "강원도" },
      { value: "경기도", text: "경기도" },
      { value: "대전", text: "대전" },
   ];
   const categoryData = [
      { value: "전체", text: "전체" },
      { value: "감자", text: "감자" },
      { value: "고구마", text: "고구마" },
      { value: "사과", text: "사과" },
      { value: "배", text: "배" },
      { value: "양파", text: "양파" },
      { value: "수박", text: "수박" },
   ];

   return (
      <Dialog fullWidth open={open} onClose={handleClose}>
         <DialogTitle>게시글 필터 설정</DialogTitle>
         <DialogContent>
            <InputLabel>지역 선택</InputLabel>
            <Select
               fullWidth
               value={filter.location}
               name="location"
               onChange={handleFilter}
            >
               <MenuItem disabled>지역을 선택해주세요.</MenuItem>
               {locationData.map((location) => (
                  <MenuItem key={location.value} value={location.value}>
                     {location.text}
                  </MenuItem>
               ))}
            </Select>
         </DialogContent>
         <DialogContent>
            <InputLabel>카테고리 선택</InputLabel>
            <Select
               fullWidth
               value={filter.category}
               name="category"
               onChange={handleFilter}
            >
               <MenuItem disabled>지역을 선택해주세요.</MenuItem>
               {categoryData.map((category) => (
                  <MenuItem key={category.value} value={category.value}>
                     {category.text}
                  </MenuItem>
               ))}
            </Select>
         </DialogContent>
         <DialogActions>
            <Button onClick={handleInit} color="secondary">
               초기화
            </Button>
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

export default FilterDialog;
