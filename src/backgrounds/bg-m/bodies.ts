import { createCircle, createRectangle, createTrapezoid } from "@utils/matterjs/bodies";
import type { ICanvasBounds } from "@utils/matterjs/canvas";

import { quinacridoneMagentaColor, brightPinkCrayolaColor } from "@utils/matterjs/colors";
import Matter, { Body } from "matter-js";

export const createBodies = (bounds: ICanvasBounds): Matter.Body[] => {
	const DELTA = 0.25 * bounds.height;

	const sun = createCircle({
		x: bounds.width,
		y: DELTA,
		radio: 0.25 * bounds.width,
		fillColor: brightPinkCrayolaColor,
	});

	const HEIGHT_FLOOR = 0.3 * bounds.width;

	const temple = Body.create({
		parts: [
			createRectangle({
				x: 0,
				y: bounds.height,
				width: bounds.width,
				height: HEIGHT_FLOOR,
				fillColor: quinacridoneMagentaColor,
			}),
			createTrapezoid({
				x: 0,
				y: bounds.height - HEIGHT_FLOOR,
				width: 1.5 * bounds.width,
				height: 0.25 * bounds.width,
				slope: 0.5,
				fillColor: brightPinkCrayolaColor,
			}),
			createRectangle({
				x: 0,
				y: bounds.height - 2 * HEIGHT_FLOOR,
				width: 0.5 * bounds.width,
				height: HEIGHT_FLOOR,
				fillColor: quinacridoneMagentaColor,
			}),
			createTrapezoid({
				x: 0,
				y: bounds.height - 3 * HEIGHT_FLOOR,
				width: 1 * bounds.width,
				height: 0.25 * bounds.width,
				slope: 0.5,
				fillColor: brightPinkCrayolaColor,
			}),
			createRectangle({
				x: 0,
				y: bounds.height - 4 * HEIGHT_FLOOR,
				width: 0.25 * bounds.width,
				height: HEIGHT_FLOOR,
				fillColor: quinacridoneMagentaColor,
			}),
			createTrapezoid({
				x: 0,
				y: bounds.height - 4.9 * HEIGHT_FLOOR,
				width: 0.5 * bounds.width,
				height: 0.25 * bounds.width,
				slope: 1,
				fillColor: brightPinkCrayolaColor,
			}),
		],
	});

	return [sun, temple];
};
