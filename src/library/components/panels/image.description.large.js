import React from 'react';
import style from '../../../styles/components/image.description.module.css';
import image from '../../../images/filler/dining_hall.jpg';

const ImageDescriptionLarge = () => {
    return (
        <div className={style.imageDescriptionLarge}>
            <h1>About Us!</h1>
            <img src={image} alt="Landing Page Image" />
            <p>Quisque luctus lorem a efficitur luctus. Aenean nec orci suscipit magna sollicitudin venenatis 
                at ultrices lorem. Nulla ut nulla tristique, fringilla nisl non, semper metus. Suspendisse 
                bibendum urna vitae lobortis fringilla. Vestibulum varius purus scelerisque diam malesuada, 
                non varius lacus auctor. Etiam nibh metus, vulputate quis pulvinar ac, bibendum vel nunc. 
                Vestibulum eget iaculis elit. Vestibulum auctor convallis urna sed tempus. Ut at diam ex. 
                Morbi lobortis, neque pellentesque fermentum mollis, leo leo varius massa, sit amet ultricies
                sapien massa id justo. Sed sed mauris eget erat ornare tempor. </p>
        </div>
    );
}

export default ImageDescriptionLarge;