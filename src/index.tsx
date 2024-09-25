import ReactDOM from 'react-dom/client';
import './index.css';
import { HashRouter, Route, Routes } from 'react-router-dom';
import RickAstley from './components/rickAstley/RickAstley';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import Homepage from './components/homepage/Homepage';
import Layout from './components/layout/Layout';


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
          {/* <Route path='/login' element={<Login/>} /> */}
          <Route path='/' element={<Homepage/>}/>
          <Route path='/stations:' element={<Homepage/>}/>
          <Route path='*' element={<div className='lesson-container'><h1>ERROR 404 ☠️</h1> <RickAstley /></div>} />
        </Route>
      </Routes>
    </HashRouter>
  </Provider>
);