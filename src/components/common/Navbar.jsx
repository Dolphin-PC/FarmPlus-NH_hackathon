import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import {
   AppBar,
   BottomNavigation,
   BottomNavigationAction,
   Toolbar,
} from "@material-ui/core";
import {
   Home,
   Favorite,
   AccountCircle,
   Search,
   FilterList,
   Notifications,
} from "@material-ui/icons";

const Navbar = (props) => {
   const [value, setValue] = useState("main");

   const handleChange = (event, value) => {
      setValue(value);
   };

   const TopNavbarRender = (props) => {
      return (
         <AppBar position="fixed">
            <Toolbar style={{ justifyContent: "space-between" }}>
               {props.children}
            </Toolbar>
         </AppBar>
      );
   };
   const BottomNavbarRender = () => {
      return (
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
      );
   };

   switch (value) {
      case "main":
         return (
            <Fragment>
               <TopNavbarRender>
                  상단 헤더바{" "}
                  <div>
                     <Search />
                     &emsp;
                     <FilterList />
                     &emsp;
                     <Notifications />
                  </div>
               </TopNavbarRender>

               {props.children}
               <BottomNavbarRender />
            </Fragment>
         );
      case "favorite":
         return (
            <Fragment>
               <TopNavbarRender>찜리스트</TopNavbarRender>
               {props.children}
               <BottomNavbarRender />
            </Fragment>
         );
      case "setting":
         return (
            <Fragment>
               <TopNavbarRender>설정</TopNavbarRender>
               {props.children}
               <BottomNavbarRender />
            </Fragment>
         );
      default:
         return <BottomNavbarRender />;
   }
};

export default Navbar;
