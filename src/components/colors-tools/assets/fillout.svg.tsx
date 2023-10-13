import { useAppContext } from "../../../context/app.context"

export default () => {
	const { establishedColor } = useAppContext()
	return (
		<svg
			width="22"
			height="30"
			viewBox="0 0 16 19"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M11.648 6.90105L4.496 0L3.368 1.08842L5.272 2.92561L1.152 6.90105C0.68 7.35649 0.68 8.08983 1.152 8.53754L5.552 12.7832C5.784 13.007 6.096 13.1228 6.4 13.1228C6.704 13.1228 7.016 13.007 7.248 12.7832L11.648 8.53754C12.12 8.08983 12.12 7.35649 11.648 6.90105ZM2.568 7.7193L6.4 4.02175L10.232 7.7193H2.568ZM13.6 8.87719C13.6 8.87719 12 10.5523 12 11.5789C12 12.4281 12.72 13.1228 13.6 13.1228C14.48 13.1228 15.2 12.4281 15.2 11.5789C15.2 10.5523 13.6 8.87719 13.6 8.87719ZM0 15.4386H16V18.5263H0V15.4386Z"
				fill={establishedColor}
				stroke="#00000044"
			/>
		</svg>
	)
}