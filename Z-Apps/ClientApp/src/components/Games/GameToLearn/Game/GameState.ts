import { SubMenu } from "./Items/FixedItems/Menu";
import { StageItem } from "./Items/StageItems";
import { stages } from "./Stages";

export interface GameState {
    menu: { isMenuOpen: boolean; subMenu: SubMenu };
    controller: {
        isLeftButtonClicked: boolean;
        isRightButtonClicked: boolean;
        isJumpButtonClicked: boolean;
    };
    stageItems: StageItem[];
}

export const gameState: GameState = {
    menu: { isMenuOpen: false, subMenu: "game" },
    controller: {
        isLeftButtonClicked: false,
        isRightButtonClicked: false,
        isJumpButtonClicked: false,
    },
    stageItems: stages[1](),
};
