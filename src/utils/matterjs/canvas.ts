export interface ICanvasBounds {
	width: number;
	height: number;
}

interface IProps {
	container: Element;
}

export const createCanvas = ({ container }: IProps): HTMLCanvasElement => {
	const size = container.getBoundingClientRect();
	const canvas = document.createElement("canvas");
	canvas.width = size.width;
	canvas.height = size.height;
	container.appendChild(canvas);
	return canvas;
};
