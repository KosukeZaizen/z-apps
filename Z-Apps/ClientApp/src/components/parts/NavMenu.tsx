import "bootstrap/dist/css/bootstrap.css";
import * as React from "react";
import { Link } from "react-router-dom";
import {
    Collapse,
    Container,
    Navbar,
    NavbarBrand,
    NavbarToggler,
    NavLink,
} from "reactstrap";
import "./NavMenu.css";

function NavigationItems(props: { closeToggle: () => void }) {
    let objLinks = {
        "Japanese Folktales": "/folktales",
        "Hiragana / Katakana": "/hiragana-katakana",
        "Vocabulary Quiz": "/vocabulary-quiz",
        "Kanji Quiz": "/kanji-quiz",
        "Action Games": "/ninja",
    };
    let linkList = [];
    for (let key in objLinks) {
        linkList.push(
            <NavLink
                key={key}
                tag={Link}
                className="text-light dropdown"
                to={objLinks[key]}
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

export default class NavMenu extends React.Component {
    state: {
        isOpen: boolean;
    };

    constructor(props) {
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
