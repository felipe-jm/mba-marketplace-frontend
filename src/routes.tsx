import { Dashboard } from "./pages/app/dashboard";

import { createBrowserRouter } from "react-router-dom";
import { SignIn } from "./pages/auth/sign-in";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
  },
  {
    path: "/sign-in",
    element: <SignIn />,
  },
]);
