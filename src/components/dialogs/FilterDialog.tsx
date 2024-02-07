import { Avatar, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, InputLabel, MenuItem, Select } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { CLEAR_FILTER, SET_FILTER } from "../../actions/types";

import { category, location } from "../../data/data";

const FilterDialog = ({ onClose, open, filterData }) => {
  const dispatch = useDispatch();

  const [filter, setFilter] = useState({
    location: filterData.location,
    category: filterData.category,
  });

  useEffect(() => {
    setFilter({
      location: filterData.location,
      category: filterData.category,
    });
  }, [filterData]);

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

  return (
    <Dialog fullWidth open={open} onClose={handleClose}>
      <DialogTitle>게시글 필터 설정</DialogTitle>
      <DialogContent>
        <InputLabel>지역 선택</InputLabel>
        <Select fullWidth value={filter.location} name="location" onChange={handleFilter}>
          <MenuItem disabled>지역을 선택해주세요.</MenuItem>
          {location.map((location) => (
            <MenuItem key={location.value} value={location.value}>
              {location.text}
            </MenuItem>
          ))}
        </Select>
      </DialogContent>
      <DialogContent>
        <InputLabel>카테고리 선택</InputLabel>
        <Select fullWidth value={filter.category} name="category" onChange={handleFilter}>
          <MenuItem disabled>지역을 선택해주세요.</MenuItem>
          {category.map((category) => (
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
