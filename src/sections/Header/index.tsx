import clsx from 'clsx';
import { observer } from "mobx-react-lite";
import nullAvatarSrc from '../../assets/images/nullAvatar.jpg';
import useStore from '../../store';
import s from './styles.module.css';

export const Header = observer(() => {

    const { user } = useStore('userStore');

    return (
        <header className={clsx("container", s.wrapper)}>
            <h1 className={s.title}>Сервис аудиоинветаризации</h1>
            {user.isAuthorized && <button className={s.user} type="button"><img src={nullAvatarSrc} alt="аватар" /></button>}
        </header>
    )
})