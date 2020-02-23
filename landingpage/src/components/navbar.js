import React from "react";
import { Link } from "gatsby";
import NavLinks from "./navlinks";
import Logo from "./logo";

import "../style/navbar.less";

class Navbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            navbarPlaceholderHeight: 100,
            sidebarOpen: false
        };

        this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
        this.menuOpen = this.menuOpen.bind(this);
    }

    onSetSidebarOpen(open) {
        this.setState({ sidebarOpen: open });
    }

    menuOpen(event) {
        event.preventDefault();
        this.onSetSidebarOpen(true);
    }

    componentDidMount() {
        this.changeNavbarPlaceholderHeight();

        let logo = this.nav.querySelector(".logo"),
            _this = this;

        logo.addEventListener("load", function() {
            _this.changeNavbarPlaceholderHeight();
        });
    }

    changeNavbarPlaceholderHeight() {
        let navBar = document.querySelector("nav");
        let navbarPlaceholderHeight = navBar.offsetHeight;
        this.setState({
            navbarPlaceholderHeight: navbarPlaceholderHeight
        });
    }

    render() {
        const placeholder = this.props.placeholder;
        return (
            <React.Fragment>
                <nav className="text-secondary" ref={c => (this.nav = c)}>
                    <Link to="/">
                        <Logo />
                    </Link>
                    <NavLinks />
                </nav>
                {placeholder && (
                    <div
                        className="navbar-placeholder"
                        style={{
                            height: this.state.navbarPlaceholderHeight + "px"
                        }}
                    ></div>
                )}
            </React.Fragment>
        );
    }
}

export default Navbar;
