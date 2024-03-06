// Create a public Router

import HomePage from "../page/HomePage";
import LoginPage from "../page/LoginPage";
import NotFoundPage from "../page/NotFoundPage";
import ProfilePage from "../page/ProfilePage";
import RegistrationPage from "../page/RegistrationPage";
import PrivateRouter from "./PrivateRouter";

const publicRouter = [
  {
    element: <PrivateRouter />,
    children: [
      {
        path: "/me",
        element: <ProfilePage />,
      },
      {
        path: "/",
        element: <HomePage />,
      },
    ],
  },

  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegistrationPage />,
  },

  {
    path: "*",
    element: <NotFoundPage />,
  },
];

export default publicRouter;
