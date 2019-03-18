import React from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './NavMenu.css';

class NavigationItems extends React.Component {


    render() {
        let objLinks = {
            "Kanji Converter": "/kanji-converter",
            "Romaji Converter": "/romaji-converter",
            "Hiragana Quiz": "/hiragana-quiz",
            "Katakana Quiz": "/katakana-quiz",
        };
        let linkList = [];
        for (let key in objLinks) {
            linkList.push(
                    <NavLink key={key} tag={Link} className="text-light dropdown" to={objLinks[key]}>{key}</NavLink>
            );
        }

        return (
            <ul className="navbar-nav flex-grow">
                {linkList}
            </ul>
        );

    }
}


export default class NavMenu extends React.Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false
        };
    }
    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
    render() {
        return (
            <header>
                <Navbar variant="pills" className="navbar-inverse navbar-expand-md navbar-toggleable-md border-bottom box-shadow mb-3">
                    <Container>
                        <NavbarBrand tag={Link} to="/"><b className="z-apps-title text-light">Z-Apps</b></NavbarBrand>
                        <NavbarToggler onClick={this.toggle} className="mr-2" />
                        <Collapse className="d-md-inline-flex flex-md-row-reverse" isOpen={this.state.isOpen} navbar>
                            <NavigationItems />
                        </Collapse>
                    </Container>
                </Navbar>
            </header>
        );
    }
}
