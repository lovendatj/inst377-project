import PageLogo from "../logos/page.logo"

const Footer = () => {

    return (
        <footer className="footer">
            <div className="footer-content">
                <PageLogo src="https://i.imgur.com/XqQZQZL.png" text="Campus Dining Hall" />
                <div className="footer-contact-block">
                    <h3>Contact Us</h3>
                    <p>179 Not an Address, College Park, MD 20742-5035</p>
                    <p>Phone: (301) 567-8901</p>
                    <p>Email: <a href="mailto:please-dont@umd.edu">
                        please-dont@umd.edu
                    </a></p>
                </div>
                <div className="footer-links-block">
                    <a href="/">@Some Trademark</a>
                    <a href="/">Privacy Policies</a>
                    <a href="/">Web Accessibility</a>
                </div>
                
            </div>
        </footer>
    );        
}

export default Footer;