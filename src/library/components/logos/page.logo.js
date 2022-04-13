import { useState, useEffect } from 'react';

import style from '../../../styles/components/logo.module.css';

const PageLogo = ( props ) => {
    const [image, setImage] = useState();

    useEffect(() => {        
        import(`../../../images/logo/logo512.png`).then(module => {
            setImage(module.default);
        });
    }, []);

    return (
        <div className={style.pageLogoContainer}>
            {image && <img src={image} alt="Page Logo"/>}
            <h2>Campus <br/>Dining Hall</h2>
        </div>
    );
}

export default PageLogo;