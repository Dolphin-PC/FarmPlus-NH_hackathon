import React, { Fragment, useState } from "react";
import { Link, useHistory } from "react-router-dom";
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
   ArrowBack,
} from "@material-ui/icons";
import { useSelector } from "react-redux";
import FilterDialog from "../dialogs/FilterDialog";
import SearchDialog from "../dialogs/SearchDialog";
import NoticeDialog from "../dialogs/NoticeDialog";

const Navbar = (props) => {
   const [value, setValue] = useState("main");
   const [openFilter, setOpenFilter] = useState(false);
   const [openSearch, setOpenSearch] = useState(false);
   const [openNotice, setOpenNotice] = useState(false);

   const history = useHistory();

   const filter = useSelector((state) => state.filter);

   const handleChange = (event, value) => {
      setValue(value);
   };
   const handleToLogout = () => {
      if (window.confirm("로그아웃 하시겠습니까?")) {
         history.push("/");
      }
   };

   const handleSearch = () => {
      setOpenSearch(true);
   };
   const handleFilter = () => {
      setOpenFilter(true);
   };
   const handleNotification = () => {
      setOpenNotice(true);
   };

   const TopNavbarRender = (props) => {
      return (
         <AppBar position="fixed" color="white">
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
                  <div>
                     <ArrowBack onClick={handleToLogout} />
                     &emsp;
                     <b onClick={handleFilter}>
                        {filter.location}&emsp;/&emsp;{filter.category}
                     </b>
                  </div>

                  <div>
                     <Search onClick={handleSearch} />
                     &emsp;
                     <FilterList onClick={handleFilter} />
                     &emsp;
                     <Notifications onClick={handleNotification} />
                     &emsp;
                  </div>
               </TopNavbarRender>

               {props.children}
               <FilterDialog
                  open={openFilter}
                  onClose={() => setOpenFilter(!openFilter)}
               />
               <SearchDialog
                  open={openSearch}
                  onClose={() => setOpenSearch(!openSearch)}
               />
               <NoticeDialog
                  open={openNotice}
                  onClose={() => setOpenNotice(!openNotice)}
               />
               <BottomNavbarRender />
            </Fragment>
         );
      case "favorite":
         return (
            <Fragment>
               <TopNavbarRender>
                  <div>
                     <ArrowBack onClick={handleToLogout} />
                     &emsp;찜리스트
                  </div>
               </TopNavbarRender>
               {props.children}
               <BottomNavbarRender />
            </Fragment>
         );
      case "setting":
         return (
            <Fragment>
               <TopNavbarRender>
                  <div>
                     <ArrowBack onClick={handleToLogout} />
                     &emsp;설정
                  </div>
               </TopNavbarRender>

               {props.children}
               <BottomNavbarRender />
            </Fragment>
         );
      default:
         return <BottomNavbarRender />;
   }
};

export default Navbar;
