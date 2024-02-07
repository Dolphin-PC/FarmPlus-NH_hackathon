import { Button, Chip, Input, InputLabel, MenuItem, Select } from "@material-ui/core";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { Col } from "reactstrap";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { SET_FILTER, SET_NAV } from "../actions/types";
import { category, location } from "../data/data";
import * as Color from "../assets/colors";
import { RootStateType } from "../reducers";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const FilterPageView = () => {
  const height = window.outerHeight;
  const [filterCategory, setFilterCategory] = useState("전체");
  const [filterLocation, setFilterLocation] = useState("전체");
  const user = useSelector((state: RootStateType) => state.user);

  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    dispatch({
      type: SET_NAV,
      payload: window.location.href.split("/")[3],
    });
  }, []);

  const handleToMain = () => {
    history.push("/main");
  };
  const handleToFilterMain = () => {
    dispatch({
      type: SET_FILTER,
      payload: {
        location: filterLocation,
        category: filterCategory,
      },
    });
    history.push("/main");
  };
  const handleToFilterInit = () => {
    setFilterCategory("전체");
    setFilterLocation("전체");
  };

  const CategoryRender = () => {
    const handleChange = (e) => {
      setFilterCategory(e.target.value);
    };
    return (
      <div style={grayStyle} className="FilterDiv">
        <InputLabel>검색할 카테고리</InputLabel>
        <hr />
        <Select
          value={filterCategory}
          onChange={handleChange}
          input={<Input />}
          renderValue={() => (
            <div>
              <Chip key={filterCategory} label={filterCategory} />
            </div>
          )}
          MenuProps={MenuProps}
        >
          {category.map((cate, index) => (
            <MenuItem key={index} value={cate.value}>
              {cate.text}
            </MenuItem>
          ))}
        </Select>
      </div>
    );
  };
  const LocationRender = () => {
    const handleChange = (e) => {
      setFilterLocation(e.target.value);
    };
    return (
      <div style={grayStyle} className="FilterDiv">
        <InputLabel>검색할 지역</InputLabel>
        <hr />
        <Select
          value={filterLocation}
          onChange={handleChange}
          input={<Input />}
          renderValue={() => (
            <div>
              <Chip key={filterLocation} label={filterLocation} />
            </div>
          )}
          MenuProps={MenuProps}
        >
          {location.map((loca, index) => (
            <MenuItem key={index} value={loca.value}>
              {loca.text}
            </MenuItem>
          ))}
        </Select>
      </div>
    );
  };
  return (
    <div
      className="LoginStyle"
      style={{
        height: height,
        alignItems: "flex-start",
        paddingLeft: 20,
        paddingRight: 20,
      }}
    >
      <div>
        <h3>
          <AccountCircleIcon style={{ fontSize: 40 }} />
          &ensp;{user.name} 님 안녕하세요.
        </h3>
        <hr />
      </div>
      <CategoryRender />
      &emsp;
      <LocationRender />
      &emsp;
      <div className="Row" style={{ width: "100%" }}>
        <div style={{ width: "50%" }}>
          <Button fullWidth variant="contained" onClick={handleToFilterInit} style={{ borderRadius: 40 }}>
            초기화
          </Button>
        </div>
        &emsp;
        <div style={{ width: "50%" }}>
          <Button
            fullWidth
            variant="contained"
            onClick={handleToFilterMain}
            style={{
              borderRadius: 40,
              backgroundColor: Color.mainColor,
              color: "white",
            }}
          >
            검색
          </Button>
        </div>
      </div>
      &ensp;
      <Button
        fullWidth
        variant="outlined"
        color="secondary"
        onClick={handleToMain}
        style={{
          borderRadius: 40,
        }}
      >
        지금 안할래요
      </Button>
    </div>
  );
};

const grayStyle = {
  backgroundColor: "#e7e7e7",
  padding: 20,
  borderRadius: 10,
  width: "100%",
};

export default FilterPageView;
