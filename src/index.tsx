import ReactDOM from 'react-dom/client';
import './index.css';
import { HashRouter, Route, Routes } from 'react-router-dom';
import Layout from './components/layout/layout';
import StarWarsGallery from './components/starWarsGallery/StarWarsGallery';
import FormGender from './components/formGender/FormGender';
import RobotForm from './components/robotForm/robotForm';
import MyForm from './components/myForm/MyForm';
import HomePage from './components/homePage/HomePage';
import Feedback from './components/feedback/Feedback';
import Counter from './components/counter/Counter';
import RickAstley from './components/rickAstley/RickAstley';
import Shop from './components/shop/Shop';
import ProductPage from './components/productPage/ProductPage';
import ToDoList from './components/toDoList/ToDoList';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import Login from './components/login/Login';
import ProtectedRoute from './components/protectedRoute/ProtectedRoute';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>
  {/* обертка router над всеми эл-ми */}
    <HashRouter>
      {/* обертка для описания маршрутов */}
      <Routes>
        {/* маршрут родитель в кот мы будем отображать остальные эл-ты */}
        <Route path='/' element={<Layout />} >
          <Route path='/login' element={<Login/>} />
          <Route path='/' element={<ProtectedRoute outlet={ <HomePage />} /> }/>
          <Route path='/star-wars-gallery' element={<ProtectedRoute outlet={<StarWarsGallery />} /> } />
          <Route path='/shop/:id' element={<ProtectedRoute outlet={<ProductPage />} /> }/> {/* импортируем компонент, указываем в path параметр id через : */}
          <Route path='*' element={<div className='lesson-container'><h1>ERROR 404 ☠️</h1> <RickAstley /></div>} />
        </Route>
      </Routes>
    </HashRouter>
  </Provider>
);