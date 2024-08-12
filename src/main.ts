import { createApp, ref, Ref } from "vue";
import { render } from "./template";
import { PuzzleComponent } from "./puzzle-component";
import { win$ } from "./win";
import { share } from "./share";
import "cookies-ds";

export const app = createApp({
	components: {
		PuzzleComponent
	},
	setup() {
		const win: Ref<boolean> = ref(false);

		win$.subscribe(value => {
			win.value = value

			//@ts-ignore
			if (value && window.opener?.registerScore) {
				//@ts-ignore
				window.opener.registerScore("guirlande", matchCount);
				window.close();
			}
		});

		return { win, share };
	},
	render
});

app.mount("body");
