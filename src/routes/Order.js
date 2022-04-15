import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getWithExpire, setWithoutExpire } from "../library/utils/localStorage.control.js";


const Order = () => {

    const params = useParams([]);
    const navigate = useNavigate();

    const [orderId, setOrderId ] = useState();
    const [user, setUser] = useState();
    const [isLoggedIn, setLoggedIn] = useState(false);
    const [orderInfo, setOrderInfo] = useState();

    const getOrder = async () => {
        console.log({
            "user_id": user.user_id,
            "token": user.token,
            "order_id": orderId,
        })
        const response = await fetch(`/api/order/${orderId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "user_id": user.user_id,
                "token": user.token,
                "order_id": orderId,
            })
        });
        try {
            const data = await response.json();
            if (response.status !== 200) {
                throw Error("No order found");
            }
            setOrderInfo(data.results);
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

    const cancelOrder = async (e) => {
        e.preventDefault();
        const response = await fetch(`/api/order/${orderId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "user_id": user.user_id,
                "token": user.token,
                "order_id": orderId,
            })
        });
        try {
            const data = await response.json();
            if (response.status !== 200) {
                throw Error("No order found");
            }
            navigate('/');
        } catch (e) {
            console.log(e);
            navigate('/');
        }
    };


    
    useEffect(() => {
        checkUser();
    }, []);
    
    useEffect(() => {
        setOrderId(params.id);
    }, [user]);

    useEffect(() => {
        if (user && orderId) {
            getOrder();
        }
    }, [orderId]);




    return (
        <div>
            {
                orderInfo &&
                <div>
                    <h1>Success!</h1>
                    <p>Your order will be ready in 5 minutes. Head to {orderInfo.hall_name} to pick up your food.</p>
                    <p>
                        <a target="_blank" href={`https://www.google.com/maps/@${orderInfo.hall_lat},${orderInfo.hall_long},25.00z`}>
                            Directions
                        </a>
                    </p>
                    <button onClick={cancelOrder}>Cancel Order</button>
                </div>                    
            }
        </div>
    );
};

export default Order;