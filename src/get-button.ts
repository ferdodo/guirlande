import { Button } from "./button";
import { getCurrentPuzzle } from "./current-puzzle";
import { Puzzle } from "./puzzle";

export function getButton(id: string): Button {
    const currentPuzzle: Puzzle = getCurrentPuzzle();
    const button: Button | undefined = currentPuzzle.buttons.find(button => button.id === id);

    if (button === undefined) {
        throw new Error(`Button with id ${id} not found`);
    }

    return button;
}
