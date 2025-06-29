import ForgottenPassword from "./pages/ForgottenPassword";
import Login from "./pages/Login";
import Registration from "./pages/Registration"
import { createBrowserRouter, RouterProvider } from "react-router";

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
  }
])
function App() {
  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  )
}

export default App
