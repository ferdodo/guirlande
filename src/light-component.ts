import { Ref, ref, defineComponent } from "vue";
import { render } from "./light-component.template";
import { currentPuzzle$ } from "./current-puzzle";
import { getLight } from "./get-light";
import { Light } from "./light";

export const LightComponent = defineComponent({
	components: {
    },
    props: {
        id: {
            type: String,
            required: true
        }
    },
	setup(props) {
        const light: Ref<Light> = ref(getLight(props.id));
        currentPuzzle$.subscribe(() => light.value = getLight(props.id));
		return { light };
	},
	render
});
