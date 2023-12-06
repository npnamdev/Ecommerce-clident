import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import LoginPage from './pages/login/index';
import Header from './components/Header/index';
import Footer from './components/Footer/index';
import Home from "./components/Home/index";

const Layout = () => {
  return (
    <div className="layout-app">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      errorElement: <div>404 NotFound</div>,
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
      path: "/login",
      element: <LoginPage />,
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
