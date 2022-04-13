import React from 'react';
import { Link } from 'react-router-dom';
import PageLogo from "../logos/page.logo"

import style from '../../../styles/components/footer.module.css'
import { footer } from '../../../styles/_colors.js';

const Footer = () => {

    return (
        <footer className={style.footer} style={{
            background: footer.background.primary,
            color: footer.text.primary,
        }}>
            <div className={style.footerContent} >
                <PageLogo />
                <div className={style.footerContactBlock}>
                    <h3>Contact Us</h3>
                    <p>179 Not an Address, College Park, MD 20742-5035</p>
                    <p>Phone: (301) 567-8901</p>
                    <p>Email: <a href="mailto:please-dont@umd.edu">
                        please-dont@umd.edu
                    </a></p>
                    <div className={style.footerLinksBlock}>
                        <ul>
                            <li>
                                <Link to={'/'} style={{
                                    color: footer.text.primary,
                                }}>@Some Trademark</Link>
                            </li>
                            <li>
                                <Link to={'/'} style={{
                                    color: footer.text.primary,
                                }}>Privacy Policies</Link>
                            </li>
                            <li>
                                <Link to={'/'} style={{
                                    color: footer.text.primary,
                                }}>Web Accessibility</Link>
                            </li>
                        </ul>
                    </div>
                </div>                
            </div>
            
           
        </footer>
    );        
}

export default Footer;