import { Bodies } from "matter-js";

interface ICircle {
	x: number;
	y: number;
	radio: number;
	fillColor: string;
}

export const createCircle = ({ x, y, radio, fillColor }: ICircle): Matter.Body =>
	Bodies.circle(x, y, radio, { render: { fillStyle: fillColor } });

interface IRectangle {
	x: number;
	y: number;
	width: number;
	height: number;
	fillColor: string;
	isStatic?: boolean;
}

export const createRectangle = ({
	x,
	y,
	width,
	height,
	fillColor,
	isStatic = false,
}: IRectangle): Matter.Body =>
	Bodies.rectangle(x, y, width, height, {
		isStatic,
		render: { fillStyle: fillColor },
	});
