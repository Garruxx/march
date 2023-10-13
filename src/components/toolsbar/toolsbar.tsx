import "./toolsbar.sass"
import eraser from "./assets/eraser.svg"
import pen from "./assets/pen.svg"
import rectangle from "./assets/rectangle.svg"
import text from "./assets/text.svg"

export default () => {
	return (
		<div className="footerContainer">
			<div className="tools">
				<div className="tools__item">
					<img src={pen} alt="pen icon" />
					<span>Pen</span>
				</div>
				<div className="tools__item">
					<img src={eraser} alt="eraser icon" />
					<span>Eraser</span>
				</div>
				<div className="tools__item">
					<img src={rectangle} alt="rectangle icon" />
					<span>Figure</span>
				</div>
				<div className="tools__item">
					<img src={text} alt="text icon" />
					<span>Text</span>
				</div>
			</div>
		</div>
	)
}
