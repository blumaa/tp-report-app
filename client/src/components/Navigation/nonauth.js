import React from "react";
import { Link } from "react-router-dom";
import * as routes from "../../constants/routes";
import Logo from "../App/images/logo";

function NonAuthNavigation() {
  return (
    <div className="navbar">
      <div id="navbar-button">
        <div className="navbar-left">
          <Link to={routes.HOME}>HOME</Link>
        </div>
      </div>
      <div id="navbar-header">
        <div className="navbar-logo">
          <Logo />
        </div>
        <div className="navbar-title">TP REPORT</div>
      </div>
      <div id="navbar-button">
        <div className="navbar-right">
          {/* <Link to={routes.SIGN_UP}>SIGN UP</Link> */}
          <Link to={routes.LOGIN}>LOGIN</Link>
        </div>
      </div>
    </div>
  );
}

export default NonAuthNavigation;
