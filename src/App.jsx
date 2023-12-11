import { RouterProvider } from "react-router-dom";
import { useEffect } from "react";
import { callFetchAccount } from "./services/api";
import { useDispatch, useSelector } from "react-redux";
import { doGetAccountAction } from "./redux/account/accountSlice";
import Loading from "./components/Loading";
import Routes from "./routes/index";


const App = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(state => state.account.isLoading);

  const getAccount = async () => {
    if (window.location.pathname === '/login' || window.location.pathname === '/register') return;
    const res = await callFetchAccount();
    if (res && res.data) {
      dispatch(doGetAccountAction(res.data.user));
    }
  }

  useEffect(() => {
    getAccount();
  }, []);

  return (
    <div className="app-page">
      {isLoading === false || window.location.pathname === '/login' || window.location.pathname === '/register' || window.location.pathname === '/' ? <RouterProvider router={Routes()} /> : <Loading />}
    </div>
  );
}

export default App;
