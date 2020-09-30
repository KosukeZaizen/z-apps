import * as React from "react";
import { Container } from "reactstrap";
import Footer from "./Footer";
import "./Layout.css";
import NavMenu from "./NavMenu";

export default props => (
    <div>
        <NavMenu />
        <Container className="contents-container">{props.children}</Container>
        <Footer />
    </div>
);
