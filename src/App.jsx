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
import DetailPage from "./pages/Details/detail_page";
import Error404 from "./pages/404";
import DetailPageLogout from "./pages/Details/detail_page_logout";
import SearchResult from "./pages/Home/search_result";
import ContactPage from "./pages/contact";
import AboutPage from "./pages/about";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <LandingPage />,
      errorElement: <Error404 />,
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
      path: "/contact",
      element: <ContactPage />,
    },
    {
      path: "/about",
      element: <AboutPage />,
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
      path: "/tour-catalog/details/:type/:placeId",
      element: (
        <Protected>
          <DetailPage />
        </Protected>
      ),
    },
    {
      path: "/details/:type/:placeId",
      element: <DetailPageLogout />,
    },
    {
      path: "/search",
      element: <SearchResult />,
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
        <RouterProvider router={router} />
      </AuthProvider>
    </div>
  );
}

export default App;
