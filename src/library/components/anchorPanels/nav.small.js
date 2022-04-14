import React, { useState, useEffect } from "react";
import { Link, Route } from "react-router-dom";

import { paths } from "../../utils/paths.js";
import PageLogo from "../logos/page.logo.js";

import style from "../../../styles/components/nav.module.css";
import { navbar } from "../../../styles/_colors.js";

import {
  setWithExpire,
  getWithExpire,
} from "../../utils/localStorage.expire.js";

const NavSmall = (props) => {
  const [isLoggedIn, setLoggedIn] = useState(props.isLoggedIn);

  const signOut = () => {
    setLoggedIn(false);
    setWithExpire("user", null);
    window.location.reload();
  };

  useEffect(() => {
    const user_temp = getWithExpire("user");
    if (user_temp) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, []);

  return (
    <div className={style.navSmall}>
      <div
        className={style.topNavBanner}
        style={{
          background: navbar.topBar.background,
          color: navbar.topBar.color,
        }}
      >
        <h3>INST377 Final Project</h3>
      </div>
      <div
        className={style.bottomNavBanner}
        style={{
          background: navbar.bottomBar.background,
          color: navbar.bottomBar.color,
        }}
      >
        <PageLogo />
        <ul>
          {paths.map((path, index) => {
            return (
              <li key={index}>
                <Link
                  style={{
                    color: navbar.bottomBar.color,
                  }}
                  to={path.path}
                >
                  {path.name}
                </Link>
              </li>
            );
          })}
          <li>
            {isLoggedIn ? (
              <button onClick={signOut}>Sign Out</button>
            ) : (
              <Link
                style={{
                  color: navbar.bottomBar.color,
                }}
                to="/signin"
              >
                Sign In/Sign Up
              </Link>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default NavSmall;
