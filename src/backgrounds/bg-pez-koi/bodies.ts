import { Bodies, Body } from "matter-js";
import type { ICanvasBounds } from "@utils/matterjs/canvas";
import { SITE_URL } from "@config/consts";

interface IKoiFish {
	x: number;
	y: number;
	size: number;
}

const DIM_KOI_PNG = 256;
const createKoiFish = ({ x, y, size }: IKoiFish): Matter.Body => {
	return Bodies.circle(x, y, size / 2, {
		frictionAir: 0,
		friction: 0,
		inertia: Infinity,
		render: {
			sprite: {
				texture: `${SITE_URL}/imgs/pez-koi.png`,
				xScale: size / DIM_KOI_PNG,
				yScale: size / DIM_KOI_PNG,
			},
		},
	});
};

export const createBodies = (bounds: ICanvasBounds): Matter.Body[] => {
	const koi = createKoiFish({ x: -bounds.width / 4, y: bounds.height / 2, size: bounds.width / 4 });
	Body.rotate(koi, (3 * Math.PI) / 4);
	Body.setAngularVelocity(koi, -0.002);
	return [koi];
};
