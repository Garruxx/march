import "./color.bar.sass"

interface colorBar {
	className?: string
	barStyles?: React.CSSProperties
	value: number
	setValue: React.Dispatch<React.SetStateAction<number>>
}

interface HandleMove {
	x: number
	colorBarOffsetLeft: number
	colorBarWidth: number
}

type HandlePress =
	| React.MouseEvent<HTMLDivElement, MouseEvent>
	| React.TouchEvent<HTMLElement>

export default ({ className, setValue, value, barStyles }: colorBar) => {
	const handleMove = ({ x, colorBarWidth }: HandleMove) => {
		const max = colorBarWidth
		const min = 0
		const result = Math.round((x / colorBarWidth) * 100)

		if (x < min) {
			setValue(0)
		} else if (x > max) {
			setValue(100)
		} else {
			setValue(result)
		}
	}

	const clearEvents = () => {
		document.onmousemove = null
		document.ontouchmove = null
	}

	const HandlePress = (event: HandlePress) => {
		/**
		 * Color bar is a div with id="color__bar"
		 * set the colorPiker element and colorBar element
		 */
		const target = event.target as HTMLDivElement
		const isColorBar = target.id == "color__bar"
		const colorBar = isColorBar ? target : target.parentElement

		/**
		 * Set the color bar width and offset left
		 */
		const colorBarWidth = colorBar!.offsetWidth
		const colorBarOffsetLeft = colorBar!.getBoundingClientRect().left

		const handleMoveObj = {
			colorBarOffsetLeft,
			colorBarWidth,
		}

		document.onmousemove = (mouseEvent) => {
			const x = mouseEvent.clientX - colorBarOffsetLeft
			handleMove({ ...handleMoveObj, x })
		}

		document.ontouchmove = (touchEvent) => {
			const x = touchEvent.touches[0].clientX - colorBarOffsetLeft
			handleMove({ ...handleMoveObj, x })
		}

		document.onmouseup = clearEvents
		document.ontouchend = clearEvents
		document.ontouchcancel = clearEvents
		document.onmouseleave = clearEvents
	}
	return (
		<div
			className={`color__bar__container ${className || ""}`}
			style={barStyles}
		>
			<div
				className={`color__bar `}
				onMouseDown={HandlePress}
				onTouchStart={HandlePress}
				id="color__bar"
			>
				<div
					className="color__piker"
					style={{ left: `${value}%` }}
				></div>
			</div>
		</div>
	)
}
