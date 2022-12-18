import clsx from "clsx";
import { observer } from "mobx-react-lite";
import { FormEventHandler, useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Input from "../../components/Input";
import { routes } from "../../config";
import useStore from "../../store";
import backroundSrc from "../../assets/images/authBackground.png";
import s from "./styles.module.css";

const AuthPage = observer(() => {
  const { userStore } = useStore();
  const navigator = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin: FormEventHandler = useCallback(
    async (e) => {
      e.preventDefault();
      try {
        await userStore.authService.login({ username, password });
        toast.success(`Вы вошли в систему как ${username}`);
        navigator(routes.main);
      } catch (err: any) {
        toast.error(err.data.detail || "Ошибка входа");
      }
    },
    [navigator, password, userStore.authService, username]
  );
  return (
    <section className={clsx("container center")}>
      <div className={s.content}>
        <img src={backroundSrc} alt="background" aria-hidden />
        <form className={s.wrapper} onSubmit={handleLogin}>
          <h1>Вход</h1>
          <Input value={username} setValue={setUsername} />
          <Input type="password" value={password} setValue={setPassword} />
          <button
            disabled={!username || !password}
            className="button-red button rounded"
            type="submit"
          >
            Войти
          </button>
        </form>
      </div>
    </section>
  );
});

export default AuthPage;
