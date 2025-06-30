import Chat from "./pages/Chat";
import ForgottenPassword from "./pages/ForgottenPassword";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Registration from "./pages/Registration"
import { createBrowserRouter, RouterProvider } from "react-router";
import Root from "./pages/Root";
import Settings from "./pages/Settings";

const router = createBrowserRouter([
  {
    path: '/registration',
    element: <Registration></Registration>
  },
  {
    path: '/login',
    element: <Login></Login>
  },
  {
    path: '/forgottenpassword',
    element: <ForgottenPassword></ForgottenPassword>
  },
  {
    path: '/',
    element: <Root></Root>,
    children: [
      {
        path: '/home',
        element: <Home></Home>
      },
      {
        path: '/chat',
        element: <Chat></Chat>
      },
      {
        path: '/settings',
        element: <Settings></Settings>
      }
    ]
  }
])
function App() {
  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  )
}

export default App;