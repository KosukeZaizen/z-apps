import * as React from 'react';
import { Container } from 'reactstrap';
import NavMenu from './NavMenu';
import Footer from './Footer';
import './Layout.css';

export default props => (
    <div>
        <NavMenu />
        <Container className="contents-container">
            {props.children}
        </Container>
        <Footer />
    </div>
);
