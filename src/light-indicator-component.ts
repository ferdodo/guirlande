import { Ref, ref, defineComponent } from "vue";
import { render } from "./light-indicator-component.template";
import { currentPuzzle$ } from "./current-puzzle";
import { getLight } from "./get-light";
import { Light } from "./light";

export const LightIndicatorComponent = defineComponent({
	components: {
    },
    props: {
        id: {
            type: String,
            required: true
        },
        turnsOn: {
            type: Boolean,
            required: true
        }
    },
	setup(props) {
        const light: Ref<Light> = ref(getLight(props.id));
        currentPuzzle$.subscribe(() => light.value = getLight(props.id));
		return { light, turnsOn: props.turnsOn };
	},
	render
});
