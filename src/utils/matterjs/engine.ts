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

	stop(): void {
		Matter.Render.stop(this.props.render);
		Matter.Runner.stop(this.props.runner);
	}

	start(): void {
		const options: IntersectionObserverInit = {
			root: document.getElementById("haikus-container"),
			rootMargin: "0px",
			threshold: 1.0,
		};
		const checkEntries = (entries: IntersectionObserverEntry[]): void => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					this.run();
				} else {
					this.stop();
				}
			});
		};
		// this.props.observer = new IntersectionObserver(checkEntries, options);
		// this.props.observer.observe(this.props.canvas);
    const observer = new IntersectionObserver(checkEntries, options)
    observer.observe(this.props.canvas)
	}
}
