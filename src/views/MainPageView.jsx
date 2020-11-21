import { TextField } from "@material-ui/core";
import React from "react";
import SearchIcon from "@material-ui/icons/Search";

const MainPageView = () => {
   const onSubmit = (e) => {
      e.preventDefault();
      alert("Search!!");
   };
   return (
      <div className="MainStyle">
         <form onSubmit={onSubmit}>
            <TextField
               InputProps={{ startAdornment: <SearchIcon /> }}
               fullWidth
               variant="outlined"
               color="primary"
               placeholder="검색어를 입력하세요."
            />
         </form>
         <div>Lists</div>
         <div>Lists</div>
      </div>
   );
};

export default MainPageView;
