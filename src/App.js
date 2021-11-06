import { useContext } from 'react';
import { Route, Routes } from 'react-router-dom'

import ThemeContext from './store/theme-context';

import Layout from './components/Layout/Layout';
import Salons from './pages/Salons/Salons';
import NotFound from './pages/NotFound/NotFound';



function App() {

  const themeCtx = useContext(ThemeContext)

  const routes = (
    <Routes>
      <Route path="/salons" element={<Salons />} />
      <Route path='*' element={<NotFound />} />
    </Routes>
  )

  return (
    <Layout dir={themeCtx.direction}>
      {routes}
    </Layout>
  );
}

export default App;
