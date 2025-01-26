import {RouterProvider, createBrowserRouter} from 'react-router-dom';
import Registration from './page/Registration';
import Login from './page/Login';
import Welcome from './page/Welcome';
import Home from './page/Home';
import Blood from './page/Blood';

const router = createBrowserRouter([
  {path: "/register", element: <Registration />},
  {path: "/login", element: <Login />},
  {path: "/welcome", element: <Welcome />},
  {path: "/home", element: <Home />},
  {path: "/blood", element: <Blood value={false}/>},
  {path: "/blood/all", element: <Blood value={true}/>}
])

function App() {
  return <RouterProvider router={router} />;
}

export default App;
