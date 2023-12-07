import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import LoginPage from './pages/login/index';
import Header from './components/Header/index';
import Footer from './components/Footer/index';
import Home from "./components/Home/index";
import RegisterPage from "./pages/register";
import { useEffect } from "react";
import { callFetchAccount } from "./services/api";
import { useDispatch, useSelector } from "react-redux";
import { doGetAccountAction } from "./redux/account/accountSlice";
import Loading from "./components/Loading";
import NotFound from "./components/NotFound";
import AdminPage from "./pages/admin";
import ProtectedRoute from "./components/ProtectedRoute";

const Layout = () => {
  return (
    <div className="layout-app">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

const LayoutAdmin = () => {
  const isAdminRoute = window.location.pathname.startsWith('/admin');
  const user = useSelector(state => state.account.user);
  const userRole = user.role;
  return (
    <div className="layout-app">
      {isAdminRoute && userRole === 'ADMIN' && <Header />}
      <Outlet />
      {isAdminRoute && userRole === 'ADMIN' && <Footer />}
    </div>
  );
};

const App = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(state => state.account.isAuthenticated)

  const getAccount = async () => {
    if (window.location.pathname === '/login' || window.location.pathname === '/register' || window.location.pathname === '/') return;
    const res = await callFetchAccount();
    if (res && res.data) {
      dispatch(doGetAccountAction(res.data.user));
    }
  }

  useEffect(() => {
    getAccount();
  }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      errorElement: <NotFound />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "contacts",
          element: <div>Contact</div>,
        },
        {
          path: "books",
          element: <div>book</div>,
        },
      ],
    },
    {
      path: "/admin",
      element: <LayoutAdmin />,
      errorElement: <NotFound />,
      children: [
        {
          index: true,
          element: <ProtectedRoute><AdminPage /> </ProtectedRoute>
        },
        {
          path: "user",
          element: <div>user</div>,
        },
        {
          path: "books",
          element: <div>book</div>,
        },
      ],
    },
    {
      path: "/login",
      element: <LoginPage />,
    },
    {
      path: "/register",
      element: <RegisterPage />,
    },
  ]);

  return (
    <div className="app-page">
      {isAuthenticated === true || window.location.pathname === '/login' || window.location.pathname === '/register' || window.location.pathname === '/' ? <RouterProvider router={router} /> : <Loading />}
    </div>
  );
}

export default App;
