import './App.css';
import { BrowserRouter as Router, Routes, Route,useLocation } from 'react-router-dom';
import Blog from './Components/Blog';
import Login from './Components/Login';
import Registration from './Components/Registration';
import Navbar from './Components/Navbar';
import Addpost from './Components/Addpost';
import Updatepost from './Components/Updatepost';
import PrivateRoute from './Components/PrivateRoute';
import { AuthProvider} from './Context/AuthContext';
import Layout from './Components/Layout';



const App = () => {
  return (
    <div className="App bg-slate-950 text-white min-h-screen" style={{ overflowX: 'hidden' }}>
      <AuthProvider>
      <Router>

        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Registration />} />
          <Route element={<Layout />}>
          <Route path="/blog" element={<PrivateRoute><Blog /></PrivateRoute>} />
          <Route path="/add-post" element={<PrivateRoute><Addpost /></PrivateRoute>} />
          <Route path="/update-post/:id" element={<PrivateRoute><Updatepost /></PrivateRoute>} />
          </Route>
        </Routes>
      </Router>
      </AuthProvider>
    </div>
  );
};

export default App;
