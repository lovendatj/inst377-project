import React, { useEffect, useState} from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Redirect } from 'react-router';
import NavSmall from "../library/components/anchorPanels/nav.small.js";
import Footer from "../library/components/anchorPanels/footer.reg.js";
import { getWithExpire } from "../library/utils/localStorage.expire.js";

// https://stackoverflow.com/questions/52253003/how-to-redirect-one-page-to-another-page-in-reactjs

const MenuPage = () => {
    const params = useParams([]);
    const navigate = useNavigate();
    const [user, setUser] = useState();
    const [isLoggedIn, setLoggedIn] = useState(false);
    
    const [menu, setMenu] = useState({});
    const [hall, setHall] = useState({});

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
            console.log(e);
            navigate('/404');
        }
    };

    const getHall = async () => {
        const response = await fetch(`/api/hall/${params.id}`, {
            method: "GET"
        });
        try {
            const data = await response.json();
            if(response.status !== 200) {
                throw Error("No hall found");
            }
            const hall_info = {
                'id': data.results[0]?.hall_id,
                'name': data.results[0]?.hall_name,
                'address': data.results[0]?.hall_address,
                'lat': data.results[0]?.hall_lat,
                'lng': data.results[0]?.hall_long,
                'hours': []
            }
            data.results.forEach(element => {
                hall_info.hours.push(
                    {
                        'day': element?.day,
                        'hours': String(element?.hours).replace(/^"(.*)"$/, '$1')
                    }
                );
            });
            setHall(hall_info);
        } catch (e) {
            console.log(e);
            navigate('/404');
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
        getHall();
        getMenu();
    }, []);


    return (
        <div>
            <NavSmall isLoggedIn={isLoggedIn}/>
            <h1>Welcome to <br/> {hall.name}!</h1>
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