import { Link } from 'react-router-dom';

import { paths } from '../../utils/paths.js';
import PageLogo from '../logos/page.logo.js';

const NavLarge = () => {
    return (
        <div className="nav-large">
            <div className="top-nav-banner">
                <h3>INST377 Final Project</h3>
            </div>
            <div className="bottom-nav-banner">
                <PageLogo src="https://i.imgur.com/XqQZQZL.png" text="Campus Dining Hall" />
                <ul>
                    {paths.map((path, index) => {
                        return (
                            <li key={index}>
                                <Link to={path.path}>{path.name}</Link>
                            </li>
                        );
                    })}
                </ul>            
            </div>
            <div className="bottom-nav-image">
                <img src="https://cdn.zenfolio.com/cdn2/pub/dskamanzybnr/0/null/m/crf9xmdsfqrpcaqzckay/s/v-10/p1054483414-4.jpg?ts=2YH&tk=zPu3ZzF0sU4Fv7suYiNsP2Tt15MKalnKAiSzGcVJMfM=&v=2&visitor=df4Im6gQuA7CgJmp2cm566xGrho0fCGxepm01dC8hG5x&auth=exp=1649980799~acl=%2Fcdn2%2Fpub%2Fdskamanzybnr%2F%2A~hmac=a79df8fbadc6d98e195ee2fe0cb110c5" alt="Landing Page Image" />
                <h1>Welcome to the <br/> Campus Dining Hall Portal!</h1>
            </div>

        </div>
    );

}

export default NavLarge;