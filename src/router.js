import { createBrowserRouter } from "react-router-dom";
import LandingPage from "./pages/home/landing";
import Error404 from "./pages/404";
import Protected from "./pages/auth/protection/protected";
import HomePage from "./pages/home/home";
import ContactPage from "./pages/contact";
import AboutPage from "./pages/about";
import CatalogPage from "./pages/catalog/catalog";
import DetailPage from "./pages/details/detail-page";
import DetailPageLogout from "./pages/details/detail-page-logout";
import SearchResult from "./pages/home/search_result";
import PlanTour from "./pages/plantour/plan-tour";
import SignIn from "./pages/auth/signin/sign-template";
import SignUp from "./pages/auth/signup/signup-template";

export const router = createBrowserRouter([
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
    path: "/plan",
    element: (
      <Protected>
        <PlanTour />
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
