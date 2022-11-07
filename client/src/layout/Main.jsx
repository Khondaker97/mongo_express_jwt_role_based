import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { Navbar } from "../components";

import ScrollToTop from "../utils/ScrollToTop";
const Main = () => {
  //set dark theme choice locally
  const [dark, setDark] = useState(false);

  return (
    <ScrollToTop>
      <Navbar dark={dark} setDark={setDark} />
      <Outlet context={[dark]} />
    </ScrollToTop>
  );
};

export default Main;
