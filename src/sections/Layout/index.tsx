import { observer } from "mobx-react-lite";
import { FC, useCallback, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Loader } from "../../components";
import { routes } from "../../config";
import useStore from "../../store";
import { Header } from "../Header";
import s from "./styles.module.css";

const Layout: FC = observer(() => {
  const navigator = useNavigate();
  const { user, authService } = useStore("userStore");

  const getInitialData = useCallback(async () => {
    await authService
      .verifyToken().then(() => navigator(`${routes.main}/${routes.newFile}`))
      .catch(() => navigator(routes.auth));
  }, [authService, navigator]);

  useEffect(() => {
    getInitialData();
  }, [getInitialData]);

  if (user.isLoading && !user.isAuthorized) {
    return (
      <div className={s.loaderWrapper}>
        <Loader />
      </div>
    );
  }

  return (
    <div className={s.wrapper}>
      <Header />
      <main className={s.body}>
        <Outlet />
      </main>
    </div>
  );
});

export default Layout;
