import { createCircle, createRectangle, createTrapezoid } from "@utils/matterjs/bodies";
import type { ICanvasBounds } from "@utils/matterjs/canvas";

import {
	atomicTangerineColor,
	quinacridoneMagentaColor,
	brightPinkCrayolaColor,
} from "@utils/matterjs/colors";
import Matter, { Body } from "matter-js";

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
	return [
		createLamp({
			x: bounds.width * 0.5,
			y: bounds.height * 0.5,
			width: 0.1 * bounds.width,
		}),
	];
};
