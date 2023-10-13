import { useAppContext } from "../../../../context/app.context"
import "./close.button.sass"
import { recentsColors as _recentsColors } from "./utilities/recents.colors.array"

export default () => {
	const {
		setColorPikerHide,
		currentColor,
		setRecentsColors,
		recentsColors,
		setEstablishedColor,
	} = useAppContext()
	const colors = [...recentsColors, currentColor]
	const colorsFormatted = _recentsColors(colors)

	return (
		<div
			className="close__button"
			onClick={() => {
				setRecentsColors(colorsFormatted)
				setColorPikerHide(true)
				setEstablishedColor(currentColor)
			}}
		>
			<div className="circle">
				<div className="back__arrow"></div>
				<div className="mask"></div>
			</div>
		</div>
	)
}
