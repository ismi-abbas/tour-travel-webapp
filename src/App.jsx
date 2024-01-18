import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/Home/home";
import LandingPage from "./pages/Home/landing";
import SignIn from "./pages/Auth/signin/tmpl_signin";
import SignUp from "./pages/Auth/signup/tmpl_signup";
import { AuthProvider } from "./contexts/AuthContext";
import Protected from "./pages/Auth/protection/protected";
import { Toaster } from "react-hot-toast";
import CatalogPage from "./pages/Catalog/catalog";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <LandingPage />,
    },
    {
      path: "/home",
      element: (
        <Protected>
          <HomePage />
        </Protected>
      ),
    },
    {
      path: "/tour-catalog",
      element: (
        <Protected>
          <CatalogPage />
        </Protected>
      ),
    },
    {
      path: "/signin",
      element: <SignIn />,
    },
    {
      path: "/signup",
      element: <SignUp />,
    },
  ]);

  return (
    <div className="">
      <Toaster />
      <AuthProvider>
        <RouterProvider router={router}></RouterProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
