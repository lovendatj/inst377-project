import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import NavSmall from "../library/components/anchorPanels/nav.small.js";
import Footer from "../library/components/anchorPanels/footer.reg.js";
import { DiningCard } from "../library/components/panels/card.layout.js";
import PopUp from "../library/components/panels/popup.js";
import { getWithExpire } from "../library/utils/localStorage.expire.js";

import style from "../styles/pages/order.module.css";

const Order = () => {
  const [user, setUser] = useState();
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isPopUpOpen, setPopUpOpen] = useState(false);
  const [data, setData] = useState(null);

  const navigate = useNavigate();

  const getDiners = async () => {
    const response = await fetch("/api/hours", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    try {
      const data = await response.json();
      setData(data.results);
    } catch (e) {
      console.log(e);
    }
  };

  const loginPopup = () => {
    return (
      <PopUp
        title={"Login"}
        message={"Please login to continue."}
        callback={() => setPopUpOpen(false)}
        redirect={"/signin"}
      />
    );
  };
  const checkUser = () => {
    const user_temp = getWithExpire("user");
    if (user_temp != null) {
      setUser(user_temp);
      setLoggedIn(true);
    } else {
      setUser(null);
      setLoggedIn(false);
    }
  };

  useEffect(() => {
    checkUser();
    getDiners();
  }, []);

  return (
    <div>
      <NavSmall isLoggedIn={isLoggedIn} />
      {isPopUpOpen && loginPopup()}
      <div
        className={style.dinerContainer}
        onClick={() => {
          isLoggedIn ? setPopUpOpen(false) : setPopUpOpen(true);
        }}
      >
        <h1>Select a location to get started...</h1>
        <div className={style.dinerList}>
          {data?.length > 0 &&
            data?.map((item) => (
              <DiningCard
                key={item?.hall_id}
                data={item}
                clickFunc={() => {
                  if (!isPopUpOpen && isLoggedIn) {
                    navigate(`/order/${item?.hall_id}`);
                  }
                }}
              />
            ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Order;
