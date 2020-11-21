import { FormControl, MenuItem, Select, TextField } from "@material-ui/core";
import { Col } from "reactstrap";
import React, { Fragment } from "react";

import { useSelector } from "react-redux";

const MainPageView = () => {
   const filter = useSelector((state) => state.filter.state);

   const HeaderRender = () => {
      return (
         <Fragment>
            <small>지역&ensp;/&ensp;카테고리</small>
            <h5>
               {filter.location}&emsp;/&emsp;{filter.category}
            </h5>
            <hr />
         </Fragment>
      );
   };
   return (
      <div className="MainStyle">
         <HeaderRender />
         <div>Lists</div>
         <div>Lists</div>
      </div>
   );
};

export default MainPageView;
