import React from "react";

const DrawerText = ({ left, right }) => (
   <div className="Row" style={{ justifyContent: "space-between", margin: 8 }}>
      <small>{left}</small>
      <b style={{ textAlign: "right" }}>{right}</b>
   </div>
);

export default DrawerText;
