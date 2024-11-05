import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { HashRouter, Routes, Route } from "react-router-dom";
import Homepage from "./components/homepage/Homepage";
import RickAstley from "./components/rickAstley/RickAstley";
import { store } from "./redux/store";
import { Layout } from "./components/layout/layout";
import StationPageItem from "./components/stations-page/StationPageItem";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import MyProfile from "./components/my-profile/MyProfile";
import AboutUs from "./components/aboutUs/AboutUs";


createRoot(document.getElementById('root')!).render(

  <Provider store={store}>
    <HashRouter>
      <Routes>
        <Route path='/' element={<Layout />} >
          <Route path='/?page&size' element={<Homepage />} />
          <Route path='/' element={<Homepage />} />
          <Route path='/login' element={<Login />} />
          <Route path='/my-profile' element={<MyProfile />} /> 
          <Route path='/register' element={<Register />} />
          <Route path='/:id' element={<StationPageItem />} />
          <Route path='*' element={<div className='lesson-container'><h1>ERROR 404 ☠️</h1> <RickAstley /></div>} />
          <Route path='/about' element={<AboutUs />} />
        </Route>
      </Routes>
    </HashRouter>
  </Provider>
);
