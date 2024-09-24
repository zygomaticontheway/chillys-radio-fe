import React from "react"
import { createRoot } from "react-dom/client"
import { Provider } from "react-redux"
import App from "./TEMP/App"
import { store } from "./src/redux/store"
import "./index.css"
import { HashRouter, Route, Routes } from "react-router-dom"
import Layout from "./src/components/layout/Layout"
import StationContainer from "./src/components/stations-contatiner/StationsContainer"

const container = document.getElementById("root")

if (container) {
  const root = createRoot(container)

  root.render(

    <React.StrictMode>
      <Provider store={store}>
        <HashRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route path="/" element={<StationContainer />} />
            </Route>
          </Routes>
        </HashRouter>
      </Provider>
    </React.StrictMode>,
  )
} else {
  throw new Error(
    "Root element with ID 'root' was not found in the document. Ensure there is a corresponding HTML element with the ID 'root' in your HTML file.",
  )
}
