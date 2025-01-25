import {RouterProvider, createBrowserRouter} from 'react-router-dom';
import Registration from './page/Registration';
import Login from './page/Login';
import Welcome from './page/Welcome';

const router = createBrowserRouter([
  {path: "/register", element: <Registration />},
  {path: "/login", element: <Login />},
  {path: "/welcome", element: <Welcome />}
])

function App() {
  return <RouterProvider router={router} />;
}

export default App;
