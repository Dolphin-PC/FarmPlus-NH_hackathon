import React, { useEffect } from "react";
import MainPageView from "./views/MainPageView";

import { Provider } from "react-redux";
import store from "./store";

// Materialize-css
// import "materialize-css/dist/css/materialize.min.css";
// Material-ui 랑 충돌 일어남
import M from "materialize-css/dist/js/materialize.min.js";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LoginPageView from "./views/LoginPageView";

const App = () => {
   useEffect(() => {
      M.AutoInit();
   }, []);

   const height = window.outerHeight;

   return (
      <Provider store={store}>
         <BrowserRouter>
            <Switch>
               <div
                  style={{
                     display: "flex",
                     justifyContent: "center",
                     alignItems: "center",
                     height: height,
                     flexDirection: "column",
                  }}
               >
                  <Route exact path="/" component={LoginPageView} />
                  <Route exact path="/main" component={MainPageView} />
               </div>
            </Switch>
         </BrowserRouter>
      </Provider>
   );
};

export default App;
