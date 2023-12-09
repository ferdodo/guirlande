let clickCount = 0;

export function getClickCount(): number {
	return clickCount;	
}

export function mutateClickCount() {
	clickCount++;
}
