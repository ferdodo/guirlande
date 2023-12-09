import { getClickCount } from "./click-count";

export function share() {
    const date = new Date();
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    const formattedDate = `${year}/${month}/${day}`;
    let text = `Guirlande ${formattedDate}`;
    text += `\n\nPuzzle réussi avec ${ getClickCount() } clicks.`;
    text += `\n\nhttps://ferdodo.github.io/guirlande`;
    navigator.clipboard.writeText(text);
}

