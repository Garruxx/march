class Draw {
	startX: number
	startY: number
	context: CanvasRenderingContext2D

	constructor(
		startX: number,
		startY: number,
		context: CanvasRenderingContext2D
	) {
		this.startX = startX
		this.startY = startY
		this.context = context
	}
	drawLine(x: number, y: number) {

    }
}

export const draw = () => {}
