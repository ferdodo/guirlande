import { Light } from "./light";
import { Button } from "./button";

export interface Puzzle {
    lights: Light[];
    buttons: Button[];
}
