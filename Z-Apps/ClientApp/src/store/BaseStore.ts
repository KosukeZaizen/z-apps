import { AppThunkAction, AsMapObject } from "./configureStore";

interface initializeType {
    type: "BASE_INITIALIZE";
}
interface hideHeader {
    type: "BASE_HIDE_HEADER";
}
interface showHeader {
    type: "BASE_SHOW_HEADER";
}
interface hideFooter {
    type: "BASE_HIDE_FOOTER";
}
interface showFooter {
    type: "BASE_SHOW_FOOTER";
}

const initialState = {
    isHeaderShown: true,
    isFooterShown: true,
};

export interface BaseState {
    isHeaderShown: boolean;
    isFooterShown: boolean;
}

type KnownAction =
    | initializeType
    | hideHeader
    | showHeader
    | hideFooter
    | showFooter;

interface IActionCreators {
    showHeaderAndFooter: () => AppThunkAction<KnownAction>;
    hideHeaderAndFooter: () => AppThunkAction<KnownAction>;
    showFooter: () => AppThunkAction<KnownAction>;
    hideFooter: () => AppThunkAction<KnownAction>;
}

export type ActionCreators = AsMapObject<IActionCreators>;

export const actionCreators: ActionCreators = {
    showHeaderAndFooter: () => dispatch => {
        dispatch({ type: "BASE_SHOW_HEADER" });
        dispatch({ type: "BASE_SHOW_FOOTER" });
    },
    hideHeaderAndFooter: () => dispatch => {
        dispatch({ type: "BASE_HIDE_HEADER" });
        dispatch({ type: "BASE_HIDE_FOOTER" });
    },
    hideFooter: () => dispatch => {
        dispatch({ type: "BASE_HIDE_FOOTER" });
    },
    showFooter: () => dispatch => {
        dispatch({ type: "BASE_SHOW_FOOTER" });
    },
};

export const reducer = (
    state: BaseState = initialState,
    action: KnownAction
) => {
    if (action.type === "BASE_INITIALIZE") {
        return initialState;
    }

    if (action.type === "BASE_HIDE_HEADER") {
        return {
            ...state,
            isHeaderShown: false,
        };
    }

    if (action.type === "BASE_SHOW_HEADER") {
        return {
            ...state,
            isHeaderShown: true,
        };
    }

    if (action.type === "BASE_HIDE_FOOTER") {
        return {
            ...state,
            isFooterShown: false,
        };
    }

    if (action.type === "BASE_SHOW_FOOTER") {
        return {
            ...state,
            isFooterShown: true,
        };
    }

    return state;
};
