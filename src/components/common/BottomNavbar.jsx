import { BottomNavigation, BottomNavigationAction } from "@material-ui/core";
import React, { useState } from "react";

import { Home, Favorite, AccountCircle } from "@material-ui/icons";

const BottomNavbar = () => {
   const [value, setValue] = useState("home");

   const handleChange = (event, value) => {
      setValue(value);
   };
   return (
      <BottomNavigation
         value={value}
         onChange={handleChange}
         style={{ position: "fixed", bottom: 0, width: "100%" }}
      >
         <BottomNavigationAction label="Home" value="home" icon={<Home />} />
         <BottomNavigationAction
            label="Favorite"
            value="favorite"
            icon={<Favorite />}
         />
         <BottomNavigationAction
            label="Setting"
            value="setting"
            icon={<AccountCircle />}
         />
      </BottomNavigation>
   );
};

export default BottomNavbar;
