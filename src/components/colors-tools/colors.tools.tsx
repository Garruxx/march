import { useAppContext } from "../../context/app.context"
import ColorpikerSvg from "./assets/colorpiker.svg"
import FilloutSvg from "./assets/fillout.svg"
import "./colors.tools.sass"

export default () => {
	const {
		setColorPikerHide,
		colorPikerHide,
		recentsColors,
		setEstablishedColor,
	} = useAppContext()
	
	const colors = [...recentsColors].reverse()

	const handleSetColor = (color: string) => {
		setEstablishedColor(color)
	}
	return (
		<div className={`colorsTools ${!colorPikerHide ? "hide" : ""}`}>
			<div
				className="colorsTools__item"
				onClick={() => setColorPikerHide(false)}
			>
				<ColorpikerSvg />
			</div>
			<div className="colorsTools__item">
				<FilloutSvg />
			</div>
			<div className="colorsTools__item">
				<div
					className="recentColor"
					style={{
						background: colors[0],
					}}
					onClick={() => handleSetColor(colors[0])}
				></div>
			</div>
			<div className="colorsTools__item">
				<div
					className="recentColor"
					style={{
						background: colors[1],
					}}
					onClick={() => handleSetColor(colors[1])}
				></div>
			</div>
		</div>
	)
}
