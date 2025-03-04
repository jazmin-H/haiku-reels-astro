import { Bodies, Common } from "matter-js";
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
	const KOI_NUMBER = 30;
	const koiFishes = [];
	for (let i = 0; i < KOI_NUMBER; i++) {
		koiFishes.push(
			createKoiFish({
				x: Common.random(0, bounds.width),
				y: Common.random(-bounds.height, 0),
				size: Math.min(bounds.width, bounds.height) * 0.18,
			}),
		);
	}
	return koiFishes;
};

document.addEventListener("DOMContentLoaded", () => {
	const containers = document.querySelectorAll(`[container-bg-pez-koi]`);
	containers.forEach((container) => {
		if (container instanceof HTMLElement) {
			container.style.backgroundImage = `url('${SITE_URL}/imgs/pez-koi.png')`;
			container.style.backgroundSize = "cover";
			container.style.backgroundPosition = "center";
		}
	});
});
