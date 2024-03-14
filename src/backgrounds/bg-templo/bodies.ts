import { createCircle, createRectangle, createTrapezoid } from "@utils/matterjs/bodies";
import type { ICanvasBounds } from "@utils/matterjs/canvas";

import { quinacridoneMagentaColor, brightPinkCrayolaColor } from "@utils/matterjs/colors";
import Matter, { Body } from "matter-js";

interface ITemple {
	x: number;
	y: number;
	bounds: ICanvasBounds;
}

const createTemple = ({ x, y, bounds }: ITemple): Matter.Body => {
	const HEIGHT_FLOOR = 0.2 * Math.min(bounds.width, bounds.height);

	return Body.create({
		parts: [
			createRectangle({
				x,
				y,
				width: bounds.width,
				height: HEIGHT_FLOOR,
				fillColor: quinacridoneMagentaColor,
			}),
			createTrapezoid({
				x,
				y: y - HEIGHT_FLOOR,
				width: 1.5 * bounds.width,
				height: 0.25 * bounds.width,
				slope: 0.5,
				fillColor: brightPinkCrayolaColor,
			}),
			createRectangle({
				x,
				y: y - 2 * HEIGHT_FLOOR,
				width: 0.5 * bounds.width,
				height: HEIGHT_FLOOR,
				fillColor: quinacridoneMagentaColor,
			}),
			createTrapezoid({
				x,
				y: y - 3 * HEIGHT_FLOOR,
				width: 1 * bounds.width,
				height: 0.25 * bounds.width,
				slope: 0.5,
				fillColor: brightPinkCrayolaColor,
			}),
			createRectangle({
				x,
				y: y - 4 * HEIGHT_FLOOR,
				width: 0.25 * bounds.width,
				height: HEIGHT_FLOOR,
				fillColor: quinacridoneMagentaColor,
			}),
			createTrapezoid({
				x,
				y: y - 4.9 * HEIGHT_FLOOR,
				width: 0.5 * bounds.width,
				height: 0.25 * bounds.width,
				slope: 1,
				fillColor: brightPinkCrayolaColor,
			}),
		],
	});
};

export const createBodies = (bounds: ICanvasBounds): Matter.Body[] => {
	const DELTA = 0.25 * bounds.height;
	const IN_FORMAT_PORTRAIT = bounds.width > 430;

	const sun = createCircle({
		x: IN_FORMAT_PORTRAIT ? bounds.width * 0.75 : bounds.width,
		y: DELTA,
		radio: 0.25 * Math.min(bounds.width, bounds.height),
		fillColor: brightPinkCrayolaColor,
	});

	const temple = createTemple({
		x: IN_FORMAT_PORTRAIT ? bounds.width * 0.5 : 0,
		y: IN_FORMAT_PORTRAIT ? bounds.height * 1.5 : bounds.height,
		bounds: {
			height: bounds.height,
			width: IN_FORMAT_PORTRAIT ? bounds.width * 0.33 : bounds.width,
		},
	});

	return [sun, temple];
};
