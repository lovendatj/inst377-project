import { Link } from 'react-router-dom';

import { paths } from '../../utils/paths.js';
import PageLogo from '../logos/page.logo.js';

import style from '../../../styles/components/nav.module.css'
import { navbar } from '../../../styles/_colors.js';

const NavLarge = () => {
    return (
        <div className={style.navLarge}>
            <div className={style.topNavBanner} style={{
                background: navbar.topBar.background,
                color: navbar.topBar.color,
            }}>
                <h3>INST377 Final Project</h3>
            </div>
            <div className={style.bottomNavBanner} style={{
                background: navbar.bottomBar.background,
                color: navbar.bottomBar.color,
            }}>
                
                <PageLogo/>
                <ul>
                    {paths.map((path, index) => {
                        return (
                            <li key={index}>
                                <Link style={{
                                    color: navbar.bottomBar.color,
                                }} to={path.path}>{path.name}</Link>
                            </li>
                        );
                    })}
                </ul>            
            </div>
            <div className={style.bottomNavImage} style={{
                background: navbar.image.background,
                color: navbar.image.color,
            }}>
                <img src="https://cdn.zenfolio.com/cdn2/pub/dskamanzybnr/0/null/m/crf9xmdsfqrpcaqzckay/s/v-10/p1054483414-4.jpg?ts=2YH&tk=zPu3ZzF0sU4Fv7suYiNsP2Tt15MKalnKAiSzGcVJMfM=&v=2&visitor=df4Im6gQuA7CgJmp2cm566xGrho0fCGxepm01dC8hG5x&auth=exp=1649980799~acl=%2Fcdn2%2Fpub%2Fdskamanzybnr%2F%2A~hmac=a79df8fbadc6d98e195ee2fe0cb110c5" alt="Landing Page Image"/>
                <div className={style.overlay}></div>
                <h1>Welcome to the <br/> Campus Dining Hall Portal</h1>
            </div>

        </div>
    );

}

export default NavLarge;