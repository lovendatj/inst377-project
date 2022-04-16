import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { paths } from "../../utils/paths.js";
import PageLogo from "../logos/page.logo.js";

import style from "../../../styles/components/nav.module.css";
import { navbar } from "../../../styles/_colors.js";
import image from '../../../images/filler/landing-page-image.jpg';

import {
  setWithExpire,
  getWithExpire,
} from "../../utils/localStorage.control.js";

const NavLarge = (props) => {
  const [isLoggedIn, setLoggedIn] = useState(props.isLoggedIn);
  const [orderInfo, setOrderInfo] = useState();

  const signOut = () => {
    setWithExpire("user", null);
    setLoggedIn(false);
    window.location.reload();
  };

  useEffect(() => {
    const user_temp = getWithExpire("user");
    if (user_temp) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
    const order = getWithExpire("order");
    if (order) {
      setOrderInfo(order);
      setTimeout(() => {
        setWithExpire("order", null);
        setOrderInfo(undefined);
      }, (1000 * 60 * 15));

    }
  }, []);

  return (
    <div className={style.navLarge}>
      <div
        className={style.topNavBanner}
        style={{
          background: navbar.topBar.background,
          color: navbar.topBar.color,
        }}
      >
      { orderInfo != undefined ? (
        <div className={style.orderInfo}>
          <Link to={`/order/success/${orderInfo.order_id}`}>
            <p>Your order is about ready, click here to see more</p>
          </Link>
        </div>
      ): null}
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
      <div
        className={style.bottomNavImage}
        style={{
          background: navbar.image.background,
          color: navbar.image.color,
        }}
      >
        <img
          src={image}
          alt="Landing Page Image"
        />
        <div className={style.overlay}></div>
        <h1>
          Welcome to the <br /> Campus Dining Hall Portal
        </h1>
      </div>
    </div>
  );
};

export default NavLarge;
