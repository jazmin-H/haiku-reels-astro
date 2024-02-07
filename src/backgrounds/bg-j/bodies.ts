import { circle, rectangle } from "@utils/matterjs/bodies";
import type { ICanvasBounds } from "@utils/matterjs/canvas";

import {
	quinacridoneMagentaColor,
	brightPinkCrayolaColor,
	atomicTangerineColor,
} from "@utils/matterjs/colors";

export const createBodies = (bounds: ICanvasBounds): Matter.Body[] => {
	const wight = 10;
	const floor = rectangle({
		x: bounds.width / 2,
		y: bounds.height,
		width: bounds.width,
		height: wight,
		fillColor: "transparent",
		isStatic: true,
	});
	const leftWall = rectangle({
		x: 0,
		y: bounds.height / 2,
		width: wight,
		height: bounds.height,
		fillColor: "transparent",
		isStatic: true,
	});
	const rightWall = rectangle({
		x: bounds.width,
		y: bounds.height / 2,
		width: wight,
		height: bounds.height,
		fillColor: "transparent",
		isStatic: true,
	});
	const delta = 500;
	const bar = rectangle({
		x: bounds.width / 2,
		y: 0 - delta,
		width: bounds.width - wight,
		height: bounds.height * 0.1,
		fillColor: quinacridoneMagentaColor,
	});
	const disco = circle({
		x: bounds.width / 4,
		y: bounds.height / 2 - delta,
		radio: bounds.width / 4 - wight,
		fillColor: brightPinkCrayolaColor,
	});
	const column = rectangle({
		x: bounds.width * 0.75,
		y: bounds.height / 2 - delta,
		width: bounds.width / 2 - 2 * wight,
		height: bounds.height - bounds.height / 4,
		fillColor: atomicTangerineColor,
	});
	return [disco, column, bar, rightWall, leftWall, floor];
};
