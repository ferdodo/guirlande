import { Observable, map } from "rxjs";
import { currentPuzzle$ } from "./current-puzzle";

export const win$: Observable<boolean> = currentPuzzle$.pipe(
	map(function(puzzle) {
		return puzzle.lights.every(light => light.isOn);
	})
);
