import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import { useAuth } from '../Context/AuthContext';

const Layout = () => {
  const location = useLocation();
  const { user } = useAuth();

  const hideNavbar = location.pathname === '/' || location.pathname === '/register';

  return (
    <>
      {!hideNavbar && user && <Navbar />}
      <Outlet />
    </>
  );
};

export default Layout;
