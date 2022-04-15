import React, { useEffect, useState } from "react";

import Footer from "../library/components/anchorPanels/footer.reg.js";
import ImageDescriptionLarge from "../library/components/panels/image.description.large.js";
import NavLarge from "../library/components/anchorPanels/nav.large.js";

import { getWithExpire } from "../library/utils/localStorage.control.js";

import style from "../styles/pages/app.module.css";
import { standard } from "../styles/_colors.js";

const App = () => {
  const [user, setUser] = useState();
  const [isLoggedIn, setLoggedIn] = useState(false);

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
  }, []);

  return (
    <div
      className={style.main}
      style={{
        background: standard.primary,
        color: standard.colorPrimary,
      }}
    >
      <NavLarge isLoggedIn={isLoggedIn} />
      <ImageDescriptionLarge />
      <Footer />
    </div>
  );
};

export default App;
