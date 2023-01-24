import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext';

import Layout from './components/Layout';

import Index from './pages/Index';
import Login from './pages/Login';
import Signup from './pages/Signup';

function App() {
  
  const { user } = useAuthContext();

  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route 
          path="/login"
          element={ !user ? <Login /> : <Navigate to="/" />}
          />
      
          <Route 
          path="/signup"
          element={ !user ? <Signup /> : <Navigate to="/" />}
          />
        
          <Route 
            path="/"
            element={<Index />}
          />
       </Routes>
      </Layout>
    </BrowserRouter>
  )
}

export default App
