export const recentsColors = (array: string[]): string[] => {
	if (array.length > 6) array.shift()
	const unique = [...new Set(array)]
    return unique
}
