import React, { useEffect, useState} from 'react';
import { Link, useParams, Route } from 'react-router-dom';
import NavSmall from "../library/components/anchorPanels/nav.small.js";
import Footer from "../library/components/anchorPanels/footer.reg.js";
import { getWithExpire } from "../library/utils/localStorage.expire.js";

const MenuPage = () => {
    const params = useParams([]);
    const [user, setUser] = useState();
    const [isLoggedIn, setLoggedIn] = useState(false);
    
    const [menu, setMenu] = useState({});

    const getMenu = async () => {
        const response = await fetch(`/api/meals/${params.id}`, {
            method: "GET"
        });
        try {
            const data = await response.json();
            if(response.status !== 200) {
                throw Error("No menu found");
            }
            setMenu(data.results);
        } catch (e) {
            window.location.href = "/404";
        }
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
        getMenu();
    }, []);


    return (
        <div>
            <NavSmall isLoggedIn={isLoggedIn}/>
            <h1>MenuPage</h1>
            {
                menu.length > 0 ?
                    menu.map((meal, index) => {
                        return (
                            <div key={index}>
                                <p>{meal.meal_name}</p>
                            </div>
                        );
                    })
                    : <p>Loading...</p>
            }
            <Footer />
        </div>
    );
};

export default MenuPage;