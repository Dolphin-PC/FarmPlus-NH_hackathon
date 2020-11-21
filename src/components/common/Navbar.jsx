import {
   AppBar,
   BottomNavigation,
   BottomNavigationAction,
   Toolbar,
} from "@material-ui/core";
import React, { Fragment, useState } from "react";
import { Home, Favorite, AccountCircle } from "@material-ui/icons";
import { Link } from "react-router-dom";

const Navbar = (props) => {
   const [value, setValue] = useState("main");

   const handleChange = (event, value) => {
      setValue(value);
   };
   return (
      <Fragment>
         <AppBar position="fixed">
            <Toolbar>상단 헤더바</Toolbar>
         </AppBar>
         {props.children}

         <BottomNavigation
            value={value}
            onChange={handleChange}
            style={{ position: "fixed", bottom: 0, width: "100%" }}
         >
            <BottomNavigationAction
               component={Link}
               to="/main"
               label="Main"
               value="main"
               icon={<Home />}
            />
            <BottomNavigationAction
               component={Link}
               to="/favorite"
               label="Favorite"
               value="favorite"
               icon={<Favorite />}
            />

            <BottomNavigationAction
               component={Link}
               to="/setting"
               label="Setting"
               value="setting"
               icon={<AccountCircle />}
            />
         </BottomNavigation>
      </Fragment>
   );
};

export default Navbar;
