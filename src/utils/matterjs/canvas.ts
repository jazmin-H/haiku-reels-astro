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
