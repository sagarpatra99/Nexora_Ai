import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";

import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";
import AdminDashboard from "./pages/AdminDashboard";
import Login from "./pages/Login";
import Signup from "./pages/Singup";
import { NotFound } from "./pages/NotFound";
import Products from "./pages/Products";

export const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound />,
    children: [
      // ✅ MAIN LAYOUT (WITH NAVBAR)
      {
        element: <MainLayout />,
        children: [
          { path: "/", element: <Home /> },
          { path: "/products", element: <Products /> },
          { path: "/product/:id", element: <ProductDetail /> },
          { path: "/cart", element: <Cart /> },
          { path: "/profile", element: <Profile /> },
          { path: "/admin", element: <AdminDashboard /> },
        ],
      },

      // ❌ AUTH LAYOUT (NO NAVBAR)
      {
        element: <AuthLayout />,
        children: [
          { path: "/login", element: <Login /> },
          { path: "/register", element: <Signup /> },
        ],
      },
    ],
  },
]);
