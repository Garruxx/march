import { useAppContext } from "../../../../context/app.context"
import "./recents.colors.sass"

interface RecentsColorsProps {
	colors?: string[]
}

export default () => {
	const { recentsColors, setEstablishedColor, setCurrentColor } =
		useAppContext()
	const colors = recentsColors

	return (
		<div className="recents__colors">
			<p>Recents</p>
			<div className="colors__container">
				{colors?.map((color, index) => {
					return (
						<div
							key={index}
							className="color__item"
							style={{ backgroundColor: color }}
							onClick={() => {
								setEstablishedColor(color)
								setCurrentColor(color)
							}}
						></div>
					)
				})}
			</div>
		</div>
	)
}
