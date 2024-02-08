import { Bodies, Common } from "matter-js";
import { createRectangle } from "@utils/matterjs/bodies";
import type { ICanvasBounds } from "@utils/matterjs/canvas";
import { SITE_URL } from "@config/consts";

interface IOrigami {
	x: number;
	y: number;
	size: number;
}

const DIM_ORIGAMI_PNG = 256;
const createOrigami = ({ x, y, size }: IOrigami): Matter.Body => {
	return Bodies.circle(x, y, size / 2, {
		render: {
			sprite: {
				texture: `${SITE_URL}/imgs/origami.png`,
				xScale: size / DIM_ORIGAMI_PNG,
				yScale: size / DIM_ORIGAMI_PNG,
			},
		},
	});
};

export const createBodies = (bounds: ICanvasBounds): Matter.Body[] => {
	const wight = 10;
	const floor = createRectangle({
		x: bounds.width / 2,
		y: bounds.height,
		width: bounds.width,
		height: wight,
		fillColor: "transparent",
		isStatic: true,
	});
	const leftWall = createRectangle({
		x: 0,
		y: bounds.height / 2,
		width: wight,
		height: bounds.height,
		fillColor: "transparent",
		isStatic: true,
	});
	const rightWall = createRectangle({
		x: bounds.width,
		y: bounds.height / 2,
		width: wight,
		height: bounds.height,
		fillColor: "transparent",
		isStatic: true,
	});
	const delta = -500;
	const origamisToCreate = 30;
	const origamis = [];
	for (let i = 0; i < origamisToCreate; i++) {
		origamis.push(
			createOrigami({
				x: Common.random(0, bounds.width),
				y: Common.random(delta, 0),
				size: bounds.width * 0.2,
			}),
		);
	}
	return [rightWall, leftWall, floor, ...origamis];
};
