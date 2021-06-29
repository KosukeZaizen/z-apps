import "bootstrap/dist/css/bootstrap.css";
import * as React from "react";
import { Link } from "react-router-dom";
import Collapse from "reactstrap/lib/Collapse";
import Container from "reactstrap/lib/Container";
import Navbar from "reactstrap/lib/Navbar";
import NavbarBrand from "reactstrap/lib/NavbarBrand";
import NavbarToggler from "reactstrap/lib/NavbarToggler";
import NavLink from "reactstrap/lib/NavLink";
import "./NavMenu.css";

function NavigationItems(props: { closeToggle: () => void }) {
    let objLinks = {
        // "Japanese Folktales": "/folktales",
        // "Hiragana / Katakana": "/hiragana-katakana",
        // Vocabulary: "/vocabulary-list",
        // Articles: "/articles",
        // "Action Games": "/ninja",
    } as const;
    let linkList = [];
    for (let key in objLinks) {
        linkList.push(
            <NavLink
                key={key}
                tag={Link}
                className="text-light dropdown"
                to={objLinks[key as keyof typeof objLinks]}
            >
                {key}
            </NavLink>
        );
    }
    return (
        <ul className="navbar-nav flex-grow" onClick={props.closeToggle}>
            {linkList}
        </ul>
    );
}

interface OuterProps {}

type InnerProps = OuterProps;

class NavMenu extends React.Component<
    InnerProps,
    {
        isOpen: boolean;
    }
> {
    constructor(props: InnerProps) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.closeToggle = this.closeToggle.bind(this);
        this.state = {
            isOpen: false,
        };
    }
    toggle() {
        this.setState({
            isOpen: !this.state.isOpen,
        });
    }
    closeToggle() {
        this.setState({
            isOpen: false,
        });
    }
    render() {
        return (
            <header>
                <Navbar
                    variant="pills"
                    className="navbar-inverse navbar-expand-md navbar-toggleable-md border-bottom box-shadow mb-3"
                    style={{ backgroundColor: "#222222" }}
                >
                    <Container>
                        <NavbarBrand tag={Link} to="/">
                            <b
                                onClick={this.closeToggle}
                                className="z-apps-title text-light"
                            >
                                <span style={{ whiteSpace: "nowrap" }}>
                                    Lingual Ninja
                                </span>
                            </b>
                        </NavbarBrand>
                        <NavbarToggler onClick={this.toggle} className="mr-2" />
                        <Collapse
                            className="d-md-inline-flex flex-md-row-reverse"
                            isOpen={this.state.isOpen}
                            navbar
                        >
                            <NavigationItems closeToggle={this.closeToggle} />
                        </Collapse>
                    </Container>
                </Navbar>
            </header>
        );
    }
}

export default NavMenu;
