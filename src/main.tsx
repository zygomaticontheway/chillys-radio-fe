import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { HashRouter, Routes, Route } from "react-router-dom";
import Homepage from "./components/homepage/Homepage";
import RickAstley from "./components/rickAstley/RickAstley";
import { store } from "./redux/store";


createRoot(document.getElementById('root')!).render(

  <Provider store={store}>
    <HashRouter>
      <Routes>
          <Route path='/' element={<Homepage />} />
          <Route path='*' element={<div className='lesson-container'><h1>ERROR 404 ☠️</h1> <RickAstley /></div>} />
      </Routes>
    </HashRouter>
  </Provider>
);