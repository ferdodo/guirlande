import { Puzzle } from './puzzle';
import { Light } from './light';
import { randomPick, randomInteger } from 'daily-prng';
import { Button } from "./button";
import { uid } from "uid";

export function generatePuzzle(): Puzzle {
	let puzzle = null;

	while(puzzle === null) {
		puzzle = tryGeneratePuzzle();
	}

	if (puzzle === null) {
		throw new Error("Puzzle is null !");
	}

	return puzzle;
}


export function tryGeneratePuzzle(): Puzzle | null {
	let puzzle: Puzzle = {
	    lights: [{
	        color: "red",
	        id: uid(),
	        isOn: true
	    },{
	        color: "green",
	        id: uid(),
	        isOn: true
	    },{
	        color: "blue",
	        id: uid(),
	        isOn: true
	    },{
	        color: "yellow",
	        id: uid(),
	        isOn: true
	    },{
	        color: "magenta",
	        id: uid(),
	        isOn: true
	    }],
	    buttons: []
	};

	const button1 = generateButton(puzzle);
	const button2 = generateButton(puzzle);
	const button3 = generateButton(puzzle);
	const button4 = generateButton(puzzle);
	const button5 = generateButton(puzzle);
	puzzle.buttons.push(button1);
	puzzle.buttons.push(button2);
	puzzle.buttons.push(button3);
	puzzle.buttons.push(button4);
	puzzle.buttons.push(button5);

	const lightsTurnedOff = new Set<string>()
	let countIter = 0;

	while (true) {
		countIter++;
		puzzle = applyRandomButton(puzzle);

		for (const light of puzzle.lights) {
			if (!light.isOn) {
				lightsTurnedOff.add(light.id);
			}
		}

		if (lightsTurnedOff.size === puzzle.lights.length) {
			break;
		}

		if (countIter > 20) {
			return null;
		}
	}

	countIter = 0;

	while (true) {
		countIter++;
		puzzle = applyRandomButton(puzzle);

		if (puzzle.lights.every(l => l.isOn)) {
			break;
		}

		if (countIter > 10000) {
			return null;
		}
	}

	for (let i = 0; i < 50; i++) {
		puzzle = applyRandomButton(puzzle);
	}

	if (puzzle.lights.every(l => l.isOn)) {
		return null;
	}
	
	return puzzle;
}

function generateButton(puzzle: Puzzle): Button {
	const button: Button = {
		id: uid(),
		turnsOnLights: [],
		turnsOffLights: []
	};

	const switchOnQuantity = randomInteger(1, 4);
	const switchOffQuantity = randomInteger(0, 4);

	for(let i = 0; i < switchOnQuantity; i++) {
		const leftLights = puzzle.lights.filter(function(light) {
			return !button.turnsOnLights.includes(light.id);
		});
	
		const light: Light = randomPick(leftLights);
		button.turnsOnLights.push(light.id);		
	}

	for(let i = 0; i < switchOffQuantity; i++) {
		const leftLights = puzzle.lights.filter(function(light) {
			return !button.turnsOnLights.includes(light.id);
		})
			.filter(function(light) {
				return !button.turnsOffLights.includes(light.id);
			});

		if (!leftLights.length) {
			break;
		}
	
		const light: Light = randomPick(leftLights);
		button.turnsOffLights.push(light.id);		
	}

	return button;	
}


function applyRandomButton(puzzle: Puzzle): Puzzle {
	const button: Button = randomPick(puzzle.buttons);

	puzzle.lights = puzzle.lights.map(function(light) {
		const turnOn: boolean = button.turnsOnLights.includes(light.id);
		const turnOff: boolean = button.turnsOffLights.includes(light.id);
		const isOn: boolean = (turnOn || turnOff) ? turnOn : light.isOn;
		return { ...light, isOn };	
	});
	
	return puzzle;	
}
