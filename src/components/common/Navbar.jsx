import React, { Fragment, useState, useEffect } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import FilterDialog from "../dialogs/FilterDialog";
import SearchDialog from "../dialogs/SearchDialog";
import NoticeDialog from "../dialogs/NoticeDialog";
import {
   CLEAR_FILTER,
   CLEAR_POSTS,
   CLEAR_USER,
   SET_NAV,
} from "../../actions/types";
import * as Color from "../../assets/colors";

const Navbar = (props) => {
   const nav = useSelector((state) => state.nav);
   const dispatch = useDispatch();

   const [openFilter, setOpenFilter] = useState(false);
   const [openSearch, setOpenSearch] = useState(false);
   const [openNotice, setOpenNotice] = useState(false);

   const history = useHistory();

   const filter = useSelector((state) => state.filter);
   const user = useSelector((state) => state.user);

   const handleChange = (event, value) => {
      dispatch({
         type: SET_NAV,
         payload: value,
      });
   };
   const handleToLogout = () => {
      if (window.confirm("로그아웃 하시겠습니까?")) {
         dispatch({ type: CLEAR_USER });
         dispatch({ type: CLEAR_FILTER });
         dispatch({ type: CLEAR_POSTS });
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
         <AppBar position="fixed" color="default">
            <Toolbar style={{ justifyContent: "space-between" }}>
               {props.children}
            </Toolbar>
         </AppBar>
      );
   };
   const BottomNavbarRender = () => {
      return (
         <BottomNavigation
            value={nav.location}
            onChange={handleChange}
            style={{
               position: "fixed",
               bottom: 0,
               width: "100%",
               borderTop: `1px solid lightgray`,
               paddingTop: 10,
            }}
         >
            <BottomNavigationAction
               component={Link}
               to="/main"
               label="Main"
               value="main"
               icon={<Home style={{ color: Color.mainColor }} />}
            />
            <BottomNavigationAction
               component={Link}
               to="/favorite"
               label="Favorite"
               value="favorite"
               icon={<Favorite style={{ color: Color.mainColor }} />}
            />

            <BottomNavigationAction
               component={Link}
               to="/setting"
               label="Setting"
               value="setting"
               icon={<AccountCircle style={{ color: Color.mainColor }} />}
            />
         </BottomNavigation>
      );
   };

   switch (nav.location) {
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
               <SearchDialog
                  open={openSearch}
                  onClose={() => setOpenSearch(!openSearch)}
               />
               <FilterDialog
                  open={openFilter}
                  onClose={() => setOpenFilter(!openFilter)}
                  filterData={filter}
               />
               <NoticeDialog
                  open={openNotice}
                  onClose={() => setOpenNotice(!openNotice)}
                  user={user}
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
      case "filter":
         return (
            <Fragment>
               <TopNavbarRender>
                  <div>
                     <ArrowBack onClick={handleToLogout} />
                     &emsp;게시물 필터 설정
                  </div>
               </TopNavbarRender>
               {props.children}
               <BottomNavbarRender />
            </Fragment>
         );
      default:
         return <Fragment>{props.children}</Fragment>;
   }
};

export default Navbar;
