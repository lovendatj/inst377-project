import React from 'react';
import { Link } from 'react-router-dom';

import { paths } from '../../utils/paths.js';
import PageLogo from '../logos/page.logo.js';

import style from '../../../styles/components/nav.module.css'
import { colors } from '../../../styles/_colors.js';

const NavSmall = () => {
    return (
        <div className={style.navSmall}>
            <div className={style.topNavBanner} style={{
                background: colors.navbar.topBar.background,
                color: colors.navbar.topBar.color,
            }}>
                <h3>INST377 Final Project</h3>
            </div>
            <div className={style.bottomNavBanner} style={{
                background: colors.navbar.bottomBar.background,
                color: colors.navbar.bottomBar.color,
            }}>
                <PageLogo />
                <ul>
                    {paths.map((path, index) => {
                        return (
                            <li key={index}>
                                <Link style={{
                                    color: colors.navbar.bottomBar.color,
                                }} to={path.path}>{path.name}</Link>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );

}

export default NavSmall;