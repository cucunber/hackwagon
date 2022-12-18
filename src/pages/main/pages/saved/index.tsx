import { observer } from "mobx-react-lite";
import { useCallback, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Loader } from "../../../../components";
import { routes } from "../../../../config";
import useStore from "../../../../store";
import s from './styles.module.css';

export const Saved = observer(() => {
  const userStore = useStore("userStore");
  const { inventory } = userStore;

  const [isFetching, setIsFetching] = useState(true);

  const initialFetch = useCallback(async () => {
    await userStore.getSaved();
    setIsFetching(false);
  }, [userStore]);

  useEffect(() => {
    initialFetch();
  }, [initialFetch]);

  if (isFetching) {
    return (
      <div className="full-loader">
        <Loader />
      </div>
    );
  }

  return (
    <section className={s.wrapper}>
      {inventory.length ? (
        <table className={s.table}>
          <thead>
            <tr>
              <th>№</th>
              <th>Имя</th>
              <th>Статус</th>
              <th>Время</th>
            </tr>
          </thead>
          <tbody>
            {inventory.map((item, id) => (
              <tr key={id}>
                <td>{++id}</td>
                {Object.values(
                  item.getObj(["fileName", "status", "insertDate"])
                ).map((value) => (
                  <td key={value}>{value}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div>
          <p>Нет записей</p>
          <NavLink to={`${routes.auth}/${routes.newFile}`}>
            Добавить запись
          </NavLink>
        </div>
      )}
    </section>
  );
});
