import React, { Fragment } from "react";
import { useLocation } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Routers from "../../routers/Routers";

const Layout = () => {
  const location = useLocation();

  // List of paths where you don't want to show the Header and Footer
  const noLayoutPaths = ["/login", "/register"];

  // Check if the current path is one of the excluded paths
  const isLayoutExcluded = noLayoutPaths.includes(location.pathname);

  return (
    <Fragment>
      {!isLayoutExcluded && <Header />}
      <div>
        <Routers />
      </div>
      {!isLayoutExcluded && <Footer />}
    </Fragment>
  );
};

export default Layout;
