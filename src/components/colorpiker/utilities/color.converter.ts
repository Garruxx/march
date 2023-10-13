const hueToRgb = (t1: number, t2: number, hue: number) => {
	if (hue < 0) hue += 6
	if (hue >= 6) hue -= 6
	if (hue < 1) return (t2 - t1) * hue + t1
	else if (hue < 3) return t2
	else if (hue < 4) return (t2 - t1) * (4 - hue) + t1
	else return t1
}

export const hslToRgb = (hue: number, sat: number, light: number) => {
	hue = hue / 60
	const t2 = light <= 0.5 ? light * (sat + 1) : light + sat - light * sat
	const t1 = light * 2 - t2
	const r = hueToRgb(t1, t2, hue + 2) * 255
	const g = hueToRgb(t1, t2, hue) * 255
	const b = hueToRgb(t1, t2, hue - 2) * 255
	return { r, g, b }
}

/**
 *
 * @param hue
 * @param white
 * @param black
 * @param alpha
 * @returns
 */
export const hwbaToRgba = (
	hue: number,
	white: number,
	black: number,
	alpha?: number
) => {
	const rgbArray = []
	const rgb = hslToRgb(hue, 1, 0.5)
	rgbArray[0] = rgb.r / 255
	rgbArray[1] = rgb.g / 255
	rgbArray[2] = rgb.b / 255
	const tot = white + black

	if (tot > 1) {
		white = Number((white / tot).toFixed(2))
		black = Number((black / tot).toFixed(2))
	}

	for (let i = 0; i < 3; i++) {
		rgbArray[i] *= 1 - white - black
		rgbArray[i] += white
		rgbArray[i] = Number(rgbArray[i] * 255)
	}
	const a = typeof alpha == "number" ? Math.round(alpha * 255) : 255
	const [r, g, b] = rgbArray.map((color) => Math.round(color))
	return { r, g, b, a }
}

/**
 * @param n Number to convert to hex
 * @returns Hex string
 * @example toHex(0) // "00"
 */
const toHex = (n: number) => {
	let hex = n.toString(16)
	while (hex.length < 2) {
		hex = "0" + hex
	}
	return hex
}

/**
 * @param r Red 0-255
 * @param g Green 0-255
 * @param b Blue 0-255
 * @param a Alpha 0-255
 * @returns Hex color
 * @example rgbaToHex(0,0,0,0) // #00000000
 */
export const rgbaToHex = (r: number, g: number, b: number, a: number) => {
	return `#${toHex(r)}${toHex(g)}${toHex(b)}${
		typeof a == "number" ? toHex(a) : ""
	}`
}

/**
 *
 * @param hue hue 0-360
 * @param white whiteness 0-1
 * @param black blackness 0-1
 * @param alpha alpha 0-1
 * @returns hex color
 * @example hwbaToHex(0,0,0,0) // #00000000
 */
export const hwbaToHex = (
	hue: number,
	white: number,
	black: number,
	alpha?: number
) => {
	const { r, g, b, a } = hwbaToRgba(hue, white, black, alpha)
	return rgbaToHex(r, g, b, a)
}

/**
 * @param r Red 0-255
 * @param g Green 0-255
 * @param b Blue 0-255
 * @returns hwb color object
 * @example rgbToHwb(0,0,0) // { hue: 0, whiteness: 1, blackness: 1 }
 */
export const rgbToHwb = (r: number, g: number, b: number) => {
	// Normalizar los valores de rojo, verde y azul a un rango de 0 a 1
	const red = r / 255
	const green = g / 255
	const blue = b / 255

	// Calcular los valores de máximo, mínimo y croma
	const max = Math.max(red, green, blue)
	const min = Math.min(red, green, blue)
	const chroma = max - min

	// Calcular el valor de la componente de hue
	let hue
	if (chroma === 0) hue = 0
	else if (max === red) hue = ((green - blue) / chroma) % 6
	else if (max === green) hue = ((blue - red) / chroma + 2) % 6
	else hue = ((red - green) / chroma + 4) % 6
	hue *= 60 // Convertir a grados

	// Calcular los valores de blancura y negrura
	const whiteness = min
	const blackness = 1 - max

	// Redondear los valores y devolverlos como objeto
	return {
		hue: Math.round(hue),
		whiteness: Math.round(whiteness * 100),
		blackness: Math.round(blackness * 100),
	}
}

export const hexToRgb = (hex: string) => {
	hex = hex.replace("#", "")
	const matchs = hex.match(/.{1,2}/g)
	if (!matchs) return { r: 0, g: 0, b: 0, a: 0 }
	const [r, g, b, a] = matchs.map((color) => parseInt(color, 16))
	return { r, g, b, a }
}

export const hex2rgb = (hex: string) => {
	return parseInt(hex, 16)
}
export const hexToHwb = (hex: string) => {
	const { r, g, b } = hexToRgb(hex)
	const { hue, whiteness, blackness } = rgbToHwb(r, g, b)
	return { hue, whiteness, blackness }
}

export const hexToHwbPercent = (hex: string) => {
	const { hue: _hue, whiteness, blackness } = hexToHwb(hex)
	let hue = (_hue + 360) % 360

	return {
		hue: Math.round((hue / 360) * 100),
		whiteness: Math.round(Math.abs(whiteness)),
		blackness: Math.round(Math.abs(blackness)),
	}
}

/**
 * @description Convert HWBA to RGBA
 * @param h Hue 0-100 (0-360)
 * @param w Whiteness 0-100 (0-1)
 * @param b Blackness 0-100 (0-1)
 * @param a Alpha 0-100 (0-1)
 * @returns [hue, whiteness, blackness, alpha]
 * @example hwbaformatter(0, 0, 0, 0) // [0, 1, 1, 0]
 */
export const hwbaformatter = (h: number, w: number, b: number, a: number) => {
	const alpha = a / 100
	const hue = Math.round((h / 100) * 360)
	const whiteness = (100 - w) / 100
	const blackness = (100 - b) / 100
	return [hue, whiteness, blackness, alpha]
}
