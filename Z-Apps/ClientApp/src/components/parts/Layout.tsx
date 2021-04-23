import * as React from "react";
import { connect } from "react-redux";
import Container from "reactstrap/lib/Container";
import { compose } from "recompose";
import * as baseStore from "../../store/BaseStore";
import { ApplicationState } from "../../store/configureStore";
import Footer from "./Footer";
import "./Layout.css";
import NavMenu from "./NavMenu";

interface OuterProps {
    children: React.ReactNode;
}

type InnerProps = OuterProps & baseStore.BaseState;

function Layout({ children, isHeaderShown, isFooterShown }: InnerProps) {
    return (
        <div>
            {isHeaderShown && <NavMenu />}
            <Container className="contents-container">{children}</Container>
            {isFooterShown && <Footer />}
        </div>
    );
}

export default compose<InnerProps, OuterProps>(
    connect((state: ApplicationState) => state.base)
)(Layout);
