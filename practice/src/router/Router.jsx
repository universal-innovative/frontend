import SearchPage from "../Pages/Search";
import { useRoutes } from "./useRoutes";
import MainLayoutH from "../Layout/MainLayout";
import MainLayoutV from "../LayoutV/MainLayout";
import { Routes } from "./routes";
import { OutletContext } from "./Outlet";

const Router = ({ layoutState }) => {
  const element = useRoutes(Routes);

  return (
    <OutletContext.Provider value={element}>
      {layoutState === "V" ? (
        <MainLayoutV isFullView={Boolean(layoutState)} />
      ) : (
        <MainLayoutH isFullView={Boolean(layoutState)} />
      )}
    </OutletContext.Provider>
  );
};

export default Router;
