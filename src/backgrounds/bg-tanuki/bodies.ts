import { Bodies, Common } from "matter-js";
import { createRectangle } from "@utils/matterjs/bodies";
import type { ICanvasBounds } from "@utils/matterjs/canvas";
import { SITE_URL } from "@config/consts";
import { Interface } from "readline";

interface ITanuki {
	x: number;
	y: number;
	size: number;
}

const DIM_TANUKI_PNG = 256;
const createTanuki = ({ x, y, size }: ITanuki): Matter.Body => {
	return Bodies.circle(x, y, size / 2, {
		render: {
			sprite: {
				texture: `${SITE_URL}/imgs/tanuki.png`,
				xScale: size / DIM_TANUKI_PNG,
				yScale: size / DIM_TANUKI_PNG,
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
	const TANUKI_NUMBER = 30;
	const tanuki = [];
	for (let i = 0; i < TANUKI_NUMBER; i++) {
		tanuki.push(
			createTanuki({
				x: Common.random(0, bounds.width),
				y: Common.random(0, bounds.height),
				size: Math.min(bounds.width, bounds.height) * 0.18,
			}),
		);
	}
	return [rightWall, leftWall, floor, ...tanuki];
};
