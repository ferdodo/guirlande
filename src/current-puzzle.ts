import { Observable, Subject } from 'rxjs';
import { Puzzle } from './puzzle';
import { generatePuzzle } from './generate-puzzle';

let currentPuzzle: Puzzle = generatePuzzle();
const _puzzle$: Subject<Puzzle> = new Subject();

export const currentPuzzle$: Observable<Puzzle> = _puzzle$.asObservable();

export function getCurrentPuzzle(): Puzzle {
    return currentPuzzle;
}

export function switchOn(color: string): void {
	currentPuzzle.lights = currentPuzzle.lights.map(function(light) {
		const isOn = light.color === color ? true : light.isOn;
		return { ...light, isOn };
	});

	_puzzle$.next(currentPuzzle);
}

export function switchOff(color: string): void {
	currentPuzzle.lights = currentPuzzle.lights.map(function(light) {
		const isOn = light.color === color ? false : light.isOn;
		return { ...light, isOn };
	});

	_puzzle$.next(currentPuzzle);
}
