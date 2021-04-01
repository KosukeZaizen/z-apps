export interface GameState {
    menu: { isMenuOpen: boolean };
}

export const gameState: GameState = {
    menu: { isMenuOpen: false },
};
