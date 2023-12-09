import { getCurrentPuzzle } from "./current-puzzle";
import { Light } from "./light";
import { Puzzle } from "./puzzle";

export function getLight(id: string): Light {
    const puzzle: Puzzle = getCurrentPuzzle();
    const light: Light | undefined = puzzle.lights.find(light => light.id === id);

    if (light === undefined) {
        throw new Error(`Light with id ${id} not found`);
    }

    return light;
}
