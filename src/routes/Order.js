import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

import NavSmall from '../library/components/anchorPanels/nav.small.js';
import Footer from '../library/components/anchorPanels/footer.reg.js';

const Order = () =>{

  const [data, useData] = useState([]);
  
  
  useEffect(() => {    
    const getData = async () => {
      const response = await fetch('/api/hours');
      const body = await response.json();
      useData(body.results);
    };
    getData();
    }, []);
  

  return (
      <div>
        < NavSmall />
        <h1>Select a location to get started...</h1>
        {
          data?.length > 0 && data?.map((item) => (
            <div key={item.hall_id}>
              <img src={'path/to/img'} alt={item.hall_name + ' image'}/>
              <h2>{item.hall_name}</h2>
              <p>{              
                String(item.hours).substring(1, String(item.hours).length - 1)              
              }</p>
            </div>
          )) 
        }
        < Footer />
      </div>
  );
}

export default Order;