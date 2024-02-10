export interface ICanvasBounds {
	width: number;
	height: number;
}

export const createCanvasByContainer = (container: Element): HTMLCanvasElement => {
	const size = container.getBoundingClientRect();
	const canvas = document.createElement("canvas");
	canvas.width = size.width;
	canvas.height = size.height;
	container.appendChild(canvas);
	return canvas;
};

interface ICallbackOnCanvas {
	canvas: HTMLCanvasElement;
	callback: () => void;
}

export const whenCanvasIsVisible = ({ canvas, callback }: ICallbackOnCanvas): void => {
	document.addEventListener("DOMContentLoaded", () => {
		const bottomCanvas = canvas.getBoundingClientRect().bottom;
		const bottomWindow = window.innerHeight;
		if (bottomWindow > bottomCanvas) {
			callback();
		}
	});

	const container = document.getElementById("haikus-container");
	container?.addEventListener("scrollend", () => {
		const rectCanvas = canvas.getBoundingClientRect();
		const bottomCanvas = rectCanvas.bottom;
		const positionView = container.scrollTop;
		if (positionView > bottomCanvas) {
			callback();
		}
	});
};
