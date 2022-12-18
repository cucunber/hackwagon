import clsx from "clsx";
import { Outlet } from "react-router-dom";
import { Navigation } from "../../sections/Navigation";
import s from "./styles.module.css";

const Main = () => {
  return (
    <section className={clsx("container", s.wrapper)}>
      <div className={s.navigation}>
        <Navigation />
      </div>
      <div className={s.content}>
        <Outlet />
      </div>
    </section>
  );
};

export default Main;
