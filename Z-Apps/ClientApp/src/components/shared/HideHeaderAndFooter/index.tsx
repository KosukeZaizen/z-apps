import { useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as baseStore from "../../../store/BaseStore";

export const HideHeaderAndFooter = connect(null, dispatch =>
    bindActionCreators(baseStore.actionCreators, dispatch)
)((props: baseStore.ActionCreators) => {
    const { hideHeaderAndFooter, showHeaderAndFooter } = props;
    useEffect(() => {
        hideHeaderAndFooter();

        return () => {
            showHeaderAndFooter();
        };
    }, []);
    return null;
});
