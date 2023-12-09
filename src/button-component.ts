import { Ref, ref, defineComponent } from "vue";
import { render } from "./button-component.template";
import { currentPuzzle$, switchOn, switchOff } from "./current-puzzle";
import { Button } from "./button";
import { getButton } from "./get-button";
import { LightIndicatorComponent } from "./light-indicator-component";
import { getLight } from "./get-light";
import { mutateClickCount } from "./click-count";

export const ButtonComponent = defineComponent({
    components: {
        LightIndicatorComponent
    },
    props: {
        id: {
            type: String,
            required: true
        }
    },
	setup(props) {
		const button: Ref<Button> = ref(getButton(props.id));
        currentPuzzle$.subscribe(() => button.value = getButton(props.id));

		function handleClick() {
			mutateClickCount();

			button.value.turnsOnLights.map(getLight)
				.map(light => light.color)
				.forEach(switchOn);

			button.value.turnsOffLights.map(getLight)
				.map(light => light.color)
				.forEach(switchOff);
		}
        
        return { button, handleClick };
	},
	render
});
