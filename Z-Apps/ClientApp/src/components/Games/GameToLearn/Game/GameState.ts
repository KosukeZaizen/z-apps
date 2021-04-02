import { StageName } from "./Stages";

export interface GameState {
    menu: { isMenuOpen: boolean };
    controller: {
        isLeftButtonClicked: boolean;
        isRightButtonClicked: boolean;
        isJumpButtonClicked: boolean;
    };
    currentStage: StageName;
}

export const gameState: GameState = {
    menu: { isMenuOpen: false },
    controller: {
        isLeftButtonClicked: false,
        isRightButtonClicked: false,
        isJumpButtonClicked: false,
    },
    currentStage: "firstStage1",
};
