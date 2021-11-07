import { useContext } from 'react';
import { Route, Routes } from 'react-router-dom'

import ThemeContext from './store/theme-context';

import Layout from './components/Layout/Layout';
import Auth from './pages/Auth/Auth';
import NotFound from './pages/NotFound/NotFound';
import Landing from './pages/Landing/Landing';



function App() {

  const themeCtx = useContext(ThemeContext)

  const routes = (
    <Routes>
      <Route path="/auth" element={<Auth />} />
      <Route path="/" element={<Landing />} />
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
