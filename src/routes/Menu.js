import React, { useEffect, useState} from 'react';
import { Link, useParams, Route } from 'react-router-dom';

const MenuPage = () => {
    const params = useParams();
    
    const [menu, setMenu] = useState([]);

    const getMenu = async () => {
        const response = await fetch(`/api/meals/${params.id}`, {
            method: "GET"
        });
        try {
            const data = await response.json();
            console.log(data);
        } catch (e) {
            return <Route to="/404" />;
        }
    };

    useEffect(() => {
        getMenu();
    }, []);


    return (
        <div>
            <h1>MenuPage</h1>
            {
                menu && 
                <p>{menu}</p>
            }
        </div>
    );
}

export default MenuPage;