import { createCircle, createRectangle } from "@utils/matterjs/bodies";
import type { ICanvasBounds } from "@utils/matterjs/canvas";

import {
	quinacridoneMagentaColor,
	brightPinkCrayolaColor,
	atomicTangerineColor,
} from "@utils/matterjs/colors";

export const createBodies = (bounds: ICanvasBounds): Matter.Body[] => {
	const wight = 15;
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

	const DELTA = 750;
	const bar = createRectangle({
		x: bounds.width / 2,
		y: 0 - DELTA,
		width: bounds.width - wight,
		height: bounds.height * 0.1,
		fillColor: atomicTangerineColor,
	});
	const column1 = createRectangle({
		x: bounds.width * 0.41,
		y: bounds.height / 2 - DELTA,
		width: bounds.width / 6 - 2 * wight,
		height: bounds.height - bounds.height / 2,
		fillColor: atomicTangerineColor,
	});
	const column = createRectangle({
		x: bounds.width * 0.75,
		y: bounds.height / 2 - DELTA,
		width: bounds.width / 4 - 2 * wight,
		height: bounds.height - bounds.height / 3,
		fillColor: atomicTangerineColor,
	});

	const bar2 = createRectangle({
		x: bounds.width / 2,
		y: 0 - DELTA,
		width: bounds.width - 220,
		height: bounds.height * 0.05,
		fillColor: atomicTangerineColor,
	});
	const column2 = createRectangle({
		x: bounds.width * 0.25,
		y: bounds.height / 2 - DELTA,
		width: bounds.width / 4 - 2 * wight,
		height: bounds.height - bounds.height / 3,
		fillColor: atomicTangerineColor,
	});
	const column3 = createRectangle({
		x: bounds.width * 0.60,
		y: bounds.height / 2 - DELTA,
		width: bounds.width / 6 - 2 * wight,
		height: bounds.height - bounds.height / 2,
		fillColor: atomicTangerineColor,
	});
	return [column1, column, bar, rightWall, leftWall, floor, bar2, column2, column3];
};