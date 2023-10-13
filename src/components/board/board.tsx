import { useEffect, useRef } from "react"
import { useAppContext } from "../../context/app.context"
import "./board.sass"

type HandleMove = {
	x: number
	y: number
}

export default () => {
	const { establishedColor } = useAppContext()
	const Svg = useRef<SVGSVGElement>(null)
	const trace = useRef<SVGPathElement | null>(null)
	let isDrawing = false

	useEffect(() => {}, [])

	const handleMove = (event: HandleMove) => {
		if (!Svg.current || !isDrawing || !trace.current) return
		const { x: offsetX, y: offsetY } = event
		if (trace.current.getAttribute("d") === "") {
			trace.current.setAttribute("d", `M ${offsetX} ${offsetY}`)
		} else {
			trace.current.setAttribute(
				"d",
				`${trace.current.getAttribute("d")} L ${offsetX} ${offsetY}`
			)
		}
	}

	const handleOnPress = ({ nativeEvent }: any) => {
		if (!Svg.current) return
		const { offsetX, offsetY } = nativeEvent

		isDrawing = true
		trace.current = document.createElementNS(
			"http://www.w3.org/2000/svg",
			"path"
		)
		trace.current.setAttribute("stroke", establishedColor)
		trace.current.setAttribute("stroke-width", "10")
		trace.current.setAttribute("fill", "none")
		trace.current.setAttribute("stroke-linecap", "round")
		trace.current.setAttribute("stroke-linejoin", "round")
		trace.current.setAttribute("stroke-miterlimit", "0")
		trace.current.setAttribute("stroke-dasharray", "5 3")

		trace.current.setAttribute("d", `M ${offsetX} ${offsetY}`)
		Svg.current.appendChild(trace.current)
	}

	const handleOnMenu = (event: any) => {
		event.preventDefault()
		console.log(event.target.tagName)
		if (event.target.tagName == "path") event.target.remove()
	}

	const handleMouseUp = () => {
		isDrawing = false
	}

	return (
		<div className="canvasContainer">
			<svg
				id="svg"
				ref={Svg}
				onMouseDown={handleOnPress}
				onTouchStart={(event) => {
					const { left, top } = Svg.current!.getBoundingClientRect()
					handleOnPress({
						nativeEvent: {
							offsetX: event.touches[0].clientX - left,
							offsetY: event.touches[0].clientY - top,
						},
					})
				}}
				onContextMenu={handleOnMenu}
				onTouchMove={(event) => {
					const { left, top } = Svg.current!.getBoundingClientRect()
					if (!isDrawing) return
					handleMove({
						x: event.touches[0].clientX - left,
						y: event.touches[0].clientY - top,
					})
				}}
				onTouchEnd={handleMouseUp}
				onMouseMove={(event) => {
					if (!isDrawing) return
					handleMove({
						x: event.nativeEvent.offsetX,
						y: event.nativeEvent.offsetY,
					})
				}}
				onMouseLeave={handleMouseUp}
				onMouseUp={handleMouseUp}
			></svg>
		</div>
	)
}
