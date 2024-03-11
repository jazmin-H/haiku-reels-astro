import { createRectangle } from "@utils/matterjs/bodies";
import type { ICanvasBounds } from "@utils/matterjs/canvas";

import { atomicTangerineColor, brightPinkCrayolaColor } from "@utils/matterjs/colors";
import Matter, { Body, Common } from "matter-js";

interface ILamp {
	x: number;
	y: number;
	width: number;
}

const createLamp = ({ x, y, width }: ILamp): Matter.Body =>
	Body.create({
		parts: [
			createRectangle({
				x,
				y,
				width,
				height: width * 2,
				fillColor: brightPinkCrayolaColor,
			}),
			createRectangle({
				x,
				y,
				height: width * 0.5,
				width: width * 0.5,
				fillColor: atomicTangerineColor,
				angle: 0.25 * Math.PI,
			}),
		],
	});

export const createBodies = (bounds: ICanvasBounds): Matter.Body[] => {
	const LAMPS_NUMBER = 16;
	const lamps = [];

	for (let i = 0; i < LAMPS_NUMBER; i++) {
		const lamp = createLamp({
			x: Common.random(-bounds.width, 0),
			y: Common.random(0, bounds.height),
			width: 0.05 * bounds.width,
		});
		lamps.push(lamp);
	}

	return lamps;
};
