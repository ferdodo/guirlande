import { Ref, ref, defineComponent } from "vue";
import { render } from "./puzzle-component.template";
import { Puzzle } from "./puzzle";
import { getCurrentPuzzle, currentPuzzle$ } from "./current-puzzle";
import { LightComponent } from "./light-component";
import { ButtonComponent } from "./button-component";

export const PuzzleComponent = defineComponent({
	components: {
		LightComponent,
		ButtonComponent
    },
	setup() {
		const puzzle: Ref<Puzzle> = ref(getCurrentPuzzle());
		currentPuzzle$.subscribe(value => puzzle.value = value);
		return { puzzle };
	},
	render
});