import { useState } from "react"
import "./app.sass"
import Board from "./components/board/board"
import Colorpiker from "./components/colorpiker/colorpiker"
import ColorsTools from "./components/colors-tools/colors.tools"
import Header from "./components/header/header"
import Toolsbar from "./components/toolsbar/toolsbar"
import { AppProvider } from "./context/app.context"
import "./fonts/fonts.sass"

function App() {
	return (
		<AppProvider>
			<div className="App">
				<Header />
				<Board />
				<Toolsbar />
				<ColorsTools />
				<Colorpiker />
			</div>
		</AppProvider>
	)
}

export default App
