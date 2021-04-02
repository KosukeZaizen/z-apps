export interface GameState {
    menu: { isMenuOpen: boolean };
    controller: {
        isLeftButtonClicked: boolean;
        isRightButtonClicked: boolean;
        isJumpButtonClicked: boolean;
    };
}

export const gameState: GameState = {
    menu: { isMenuOpen: false },
    controller: {
        isLeftButtonClicked: false,
        isRightButtonClicked: false,
        isJumpButtonClicked: false,
    },
};
