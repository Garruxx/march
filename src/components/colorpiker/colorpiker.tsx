import { useEffect, useState } from "react"
import { useAppContext } from "../../context/app.context"
import nobackground from "./assets/nobackgound.png"
import "./colorpiker.sass"
import CloseButton from "./components/close-button/close.button"
import ColorBar from "./components/color-bar/color.bar"
import RecentsColors from "./components/recents-colors/recents.colors"
import { hwbaToHex, hwbaformatter } from "./utilities/color.converter"

export default () => {

	const {colorPikerHide} = useAppContext()
	const {setCurrentColor, currentColor} = useAppContext()
	const {hue, lightness, darkness, opacity} = useAppContext()
	const {setHue, setLightness, setDarkness, setOpacity} = useAppContext()
	const [background, setBackground] = useState("#fff")

	useEffect(() => {
		const [h, w, b, a] = hwbaformatter(hue, lightness, darkness, opacity)
		const color = hwbaToHex(h, w, b, a)
		setCurrentColor(color)
		setBackground(color.slice(0, 7))

		if (100 - lightness + 100 - darkness >= 100) {
			setDarkness(100 - lightness)
			setLightness(100 - darkness)
		}
	}, [hue, lightness, darkness, opacity])

	return (
		<div className={`colorpiker ${colorPikerHide ? "hide" : ""}`}>
			<div
				className="colorpreview"
				style={{
					background: `linear-gradient(0deg, ${currentColor}, ${currentColor}), url(${nobackground}) 100% 100% repeat`,
				}}
			>
				<div className="opacity">
					<span>Transparency: {100-opacity}%</span>
				</div>
			</div>
			<div className="hexcode">HEX: {background}</div>
			<ColorBar
				{...{ value: hue, setValue: setHue }}
				className="color__pallete"
			/>
			<ColorBar
				{...{ value: lightness, setValue: setLightness }}
				barStyles={{
					background: `linear-gradient(to right, #fff, ${background})`,
				}}
			/>
			<ColorBar
				value={darkness}
				setValue={setDarkness}
				barStyles={{
					background: `linear-gradient(to right, #000, ${background})`,
				}}
			/>
			<ColorBar
				value={opacity}
				setValue={setOpacity}
				barStyles={{
					background: `linear-gradient(270deg, ${background} 0%, rgba(255, 0, 0, 0) 100%), url(${nobackground}) 100% 100% repeat`,
				}}
			/>
			<RecentsColors/>
			<CloseButton />
		</div>
	)
}
