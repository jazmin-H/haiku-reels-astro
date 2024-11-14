import { Bodies, Body, Composites, Vector } from "matter-js";


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
	angle?: number;
}

export const createRectangle = ({
	x,
	y,
	width,
	height,
	fillColor,
	isStatic = false,
	angle = 0,
}: IRectangle): Matter.Body =>
	Bodies.rectangle(x, y, width, height, {
		isStatic,
		render: { fillStyle: fillColor },
		angle,
	});

interface ITrapezoid {
	x: number;
	y: number;
	width: number;
	height: number;
	slope: number;
	fillColor: string;
	isStatic?: boolean;
}

export const createTrapezoid = ({
	x,
	y,
	width,
	height,
	slope,
	fillColor,
	isStatic,
}: ITrapezoid): Matter.Body =>
	Bodies.trapezoid(x, y, width, height, slope, { isStatic, render: { fillStyle: fillColor } });

interface IBodiesStacks {
	x: number;
	y: number;
	rows?: number;
	columns?: number;
	columnGap?: number;
	rowGap?: number;
	create: (x: number, y: number) => Matter.Body;
}

export const createBodiesStacks = ({
	x,
	y,
	rows = 1,
	columns = 1,
	columnGap = 0,
	rowGap = 0,
	create,
}: IBodiesStacks): Composites => Composites.stack(x, y, columns, rows, columnGap, rowGap, create);
