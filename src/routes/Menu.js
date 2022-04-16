import React, { useEffect, useState} from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';

import NavSmall from "../library/components/anchorPanels/nav.small.js";
import Footer from "../library/components/anchorPanels/footer.reg.js";
import { getWithExpire, setWithoutExpire } from "../library/utils/localStorage.control.js";

import style from "../styles/pages/menu.module.css";

// https://stackoverflow.com/questions/52253003/how-to-redirect-one-page-to-another-page-in-reactjs

const MenuPage = () => {
    const params = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState();
    const [isLoggedIn, setLoggedIn] = useState(false);
    
    const [menu, setMenu] = useState({});
    const [hall, setHall] = useState({});
    
    const [items, setItems] = useState({});

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

    const addToOrder = (item_id, res) => {
        setItems({
            ...items,
            [`${item_id}-${res}`]: 
                items[`${item_id}-${res}`] ? 
                items[`${item_id}-${res}`] + 1 : 1
        });
    };
    const removeFromOrder = (item_id, res) => {
        let amount = items[`${item_id}-${res}`] - 1 > 0 ? items[`${item_id}-${res}`] - 1 : 0;
        setItems({
            ...items,
            [`${item_id}-${res}`]: amount
        });
    };

    const createOrder = async(event) => {        
        event.preventDefault();
        const response = await fetch(`/api/order`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "user_id": user.user_id,
                "token": user.token,
                "hall_id": params.id,
                "items": items,
                "timestamp": String(new Date().getTime())                               
            })
        });
        try {
            const data = await response.json();
            if(response.status !== 200) {
                throw Error("Error submitting order");
            }
            setWithoutExpire("order", {
                "user_id": data.results.user_id,
                "token": data.results.token,
                "order_id": data.results.order_id,

            });
            navigate(`/order/success/${data.results.order_id}`);
        } catch (e) {
            console.log(e);
            navigate('/order/failed');
        }

    };


    useEffect(() => {
        getHall();
        getMenu();
    }, [user]);

    useEffect(() => {
        checkUser();
    }, []);
    


    return (
        <div>
            <NavSmall isLoggedIn={isLoggedIn}/>
            <div className={style.menuContainer}>
                <h1>Welcome to {hall.name}!</h1>
                {
                    menu.length > 0 ?
                        <form>
                            <table>
                                <thead>
                                    <tr>   
                                        <th>Meal</th>
                                        <th>Restrictions</th>
                                        <th>Calories</th>
                                        <th>Add</th>
                                        <th>Remove</th>
                                        <th>Quantity</th>
                                    </tr>
                                </thead>
                                <tbody>                            
                                    {                            
                                        menu.map((meal, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td>{`${meal.meal_name}`}</td>
                                                    <td>{meal.restriction_type}</td>
                                                    <td>{meal.calories}</td>
                                                    <td>
                                                        {<button className={style.add} type="button" onClick={() => addToOrder(meal.meal_id, meal.restriction_type)}>Add</button>}
                                                    </td>
                                                    <td>
                                                        {<button className={style.sub} type="button" onClick={() => removeFromOrder(meal.meal_id, meal.restriction_type)}>Remove</button>}
                                                    </td>
                                                    <td>
                                                        {   items[`${meal.meal_id}-${meal.restriction_type}`] 
                                                            ? items[`${meal.meal_id}-${meal.restriction_type}`] : 0}
                                                    </td>
                                                </tr>
                                            );
                                        })
                                    }
                                </tbody>
                            </table>
                            
                            <button type="button" onClick={
                                createOrder
                            }>Submit</button>

                        </form>
                        : <p>Loading...</p>
                }
            </div>

            <Footer />
        </div>
    );
};

export default MenuPage;