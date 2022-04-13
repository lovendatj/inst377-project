import React from 'react';
import { Link } from 'react-router-dom';

import { paths } from '../../utils/paths.js';

import PageLogo from '../logos/page.logo.js';

const NavSmall = () => {
    return (
        <div className="nav-small">
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
        </div>
    );

}

export default NavSmall;