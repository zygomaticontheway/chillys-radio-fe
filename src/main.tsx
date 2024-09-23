import React from "react"
import { createRoot } from "react-dom/client"
import { Provider } from "react-redux"
import App from "../TEMP/App"
import { store } from "./redux/store"
import "./index.css"

const container = document.getElementById("root")

if (container) {
  const root = createRoot(container)

  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <img src="src/docks/design_draft/homepage.png" alt="The Chillys Radio" />

      </Provider>
    </React.StrictMode>,
  )
} else {
  throw new Error(
    "Root element with ID 'root' was not found in the document. Ensure there is a corresponding HTML element with the ID 'root' in your HTML file.",
  )
}
