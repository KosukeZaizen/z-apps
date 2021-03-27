import React from "react";
import * as baseStore from "../../../store/BaseStore";
import { HideHeaderAndFooter } from "../../parts/Layout";

interface OuterProps {}

interface InnerProps extends OuterProps, baseStore.ActionCreators {}

export default function GameToLearn(props: InnerProps) {
    return (
        <div>
            <HideHeaderAndFooter />
            hello
        </div>
    );
}
