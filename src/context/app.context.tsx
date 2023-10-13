import { createContext, useContext, useEffect, useState } from "react"
import {
	hex2rgb,
	hexToHwbPercent,
} from "../components/colorpiker/utilities/color.converter"

interface AppContextProps {
	children: React.ReactNode
}

interface AppContext {
	colorPikerHide: boolean
	setColorPikerHide: React.Dispatch<React.SetStateAction<boolean>>
	recentsColors: string[]
	setRecentsColors: React.Dispatch<React.SetStateAction<string[]>>
	currentColor: string
	setCurrentColor: React.Dispatch<React.SetStateAction<string>>
	hue: number
	setHue: React.Dispatch<React.SetStateAction<number>>
	lightness: number
	setLightness: React.Dispatch<React.SetStateAction<number>>
	darkness: number
	setDarkness: React.Dispatch<React.SetStateAction<number>>
	opacity: number
	setOpacity: React.Dispatch<React.SetStateAction<number>>
	setEstablishedColor: React.Dispatch<React.SetStateAction<string>>
	establishedColor: string
}

export const ColorPikerContext = createContext({} as AppContext)
export const AppProvider = ({ children }: AppContextProps) => {
	const [colorPikerHide, setColorPikerHide] = useState(true)
	const [recentsColors, setRecentsColors] = useState<string[]>([])
	const [currentColor, setCurrentColor] = useState<string>("#5544ff44")
	const [establishedColor, setEstablishedColor] =
		useState<string>("#5544ff44")
	const [hue, setHue] = useState(98)
	const [lightness, setLightness] = useState(0)
	const [darkness, setDarkness] = useState(38)
	const [opacity, setOpacity] = useState(100)

	useEffect(() => {
		const { hue, whiteness, blackness } = hexToHwbPercent(currentColor)
		const opacity = (hex2rgb(currentColor.slice(7)) / 255) * 100
		setHue(hue)
		setLightness(blackness)
		setDarkness(whiteness)
		setOpacity(Math.round(opacity))
	}, [establishedColor])

	return (
		<ColorPikerContext.Provider
			value={{
				colorPikerHide,
				setColorPikerHide,
				recentsColors,
				setRecentsColors,
				currentColor,
				setCurrentColor,
				hue,
				setHue,
				lightness,
				setLightness,
				darkness,
				setDarkness,
				opacity,
				setOpacity,
				setEstablishedColor,
				establishedColor,
			}}
		>
			{children}
		</ColorPikerContext.Provider>
	)
}

export const useAppContext = () => {
	const context = useContext(ColorPikerContext)
	if (!context) {
		throw new Error(
			"useColorPikerContext must be used within ColorPikerProvider"
		)
	}
	return context
}
