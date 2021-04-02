import { SubMenu } from "./Items/FixedItems/Menu";
import { StageName } from "./Stages";

export interface GameState {
    menu: { isMenuOpen: boolean; subMenu: SubMenu };
    controller: {
        isLeftButtonClicked: boolean;
        isRightButtonClicked: boolean;
        isJumpButtonClicked: boolean;
    };
    currentStage: StageName;
}

export const gameState: GameState = {
    menu: { isMenuOpen: false, subMenu: "game" },
    controller: {
        isLeftButtonClicked: false,
        isRightButtonClicked: false,
        isJumpButtonClicked: false,
    },
    currentStage: "firstStage1",
};
