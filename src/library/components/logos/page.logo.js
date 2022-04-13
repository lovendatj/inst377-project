
const PageLogo = ( props ) => {
    return (
        <div className="page-logo">
                <img src={props?.src} alt="Page Logo" />
                <h1>{props?.text}</h1>
        </div>
    );
}

export default PageLogo;