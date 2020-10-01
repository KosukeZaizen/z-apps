import * as React from "react";
import { Container } from "reactstrap";
import Footer from "./Footer";
import "./Layout.css";
import NavMenu from "./NavMenu";

export default ({ children }: { children: React.ReactNode }) => (
    <div>
        <NavMenu />
        <Container className="contents-container">{children}</Container>
        <Footer />
    </div>
);
