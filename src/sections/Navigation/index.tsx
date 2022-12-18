import clsx from "clsx";
import { NavLink } from "react-router-dom";
import { routes } from "../../config";
import s from './styles.module.css';

const renderRoutes = [
  { route: `${routes.main}/${routes.newFile}`, label: "Новая инветаризация" },
  { route: `${routes.main}/${routes.saved}`, label: "Сохраненные инветаризации" },
  { route: `${routes.main}/${routes.help}`, label: "Справка" },
];

export const Navigation = () => {
  return (
    <nav className={s.wrapper}>
      <ul className={s.container}>
        {renderRoutes.map(({ route, label }) => (
          <li key={route} className={s.linkWrapper}>
            <NavLink className={({ isActive }) => clsx(s.linkContent, {[s.active]: isActive})} to={route}>{label}</NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};
