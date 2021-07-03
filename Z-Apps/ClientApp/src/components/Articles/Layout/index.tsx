import * as React from "react";
import Container from "reactstrap/lib/Container";
import "./Layout.css";
import NavMenu from "./NavMenu";

interface Props {
    children: React.ReactNode;
}

function Layout({ children }: Props) {
    return (
        <div>
            <NavMenu />
            <Container className="contents-container">{children}</Container>
        </div>
    );
}

export default Layout;
