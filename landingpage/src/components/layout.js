import React from "react";
import Head from "./head";
import Navbar from "./navbar";

const Layout = ({ placeholder, children }) => {
    return (
        <React.Fragment>
            <Head />
            <Navbar
                placeholder={placeholder === undefined ? true : placeholder}
            />
            <div className="wrapper">{children}</div>
        </React.Fragment>
    );
};

export default Layout;
