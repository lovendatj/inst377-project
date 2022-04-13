import React from 'react';

import Footer from '../library/components/anchorPanels/footer.reg.js';
import ImageDescriptionLarge from '../library/components/panels/image.description.large.js';
import NavLarge from '../library/components/anchorPanels/nav.large.js';

import style from '../styles/pages/app.module.css';
import { standard } from '../styles/_colors.js';

const App = () => {
    return (
        <div className={style.main} style={{
            background: standard.primary,
            color: standard.colorPrimary,
        }}>
            < NavLarge 
            
            />
            < ImageDescriptionLarge />
            < Footer />
        </div>
    );
}

export default App;