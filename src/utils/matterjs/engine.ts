import Matter from "matter-js";

interface IEngineProps {
	canvas: HTMLCanvasElement;
	bodies: Matter.Body[];
	render: Matter.Render;
	engine: Matter.Engine;
	runner: Matter.Runner;
}

interface IEngineConstructorProps {
	canvas: HTMLCanvasElement;
	bodies: Matter.Body[];
	engine?: Matter.Engine;
	runner?: Matter.Runner;
}

export class Engine {
	private props: IEngineProps;

	constructor({
		canvas,
		bodies,
		engine = Matter.Engine.create(),
		runner = Matter.Runner.create(),
	}: IEngineConstructorProps) {
		const render = Matter.Render.create({
			canvas,
			engine,
			options: {
				width: canvas.width,
				height: canvas.height,
				background: "transparent",
				wireframes: false,
			},
		});
		Matter.World.add(engine.world, bodies);
		this.props = {
			canvas,
			bodies,
			engine,
			runner,
			render,
		};
	}

	run(): void {
		Matter.Render.run(this.props.render);
		Matter.Runner.run(this.props.runner, this.props.engine);
	}
}
