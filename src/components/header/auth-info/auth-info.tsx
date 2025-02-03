import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch } from '../../../redux/store';
import Link from 'next/link';
import { PiLineVertical } from 'react-icons/pi';
import { getScreenType } from '../../../redux/technical/technical-selectors';
import { getLogin, getUser } from '../../../redux/auth/auth-selectors';
import { logout } from '../../../redux/auth/auth-operations';
import Text from '@/components/shared/text/text';
import { TranslatedText } from '../../../utils/helpers/translating/translating';

import s from './auth-info.module.scss';

const AuthInfo = () => {
  const dispatch: AppDispatch = useDispatch();
  const isUserLogin = useSelector(getLogin);
  const screenType = useSelector(getScreenType);
  const user = useSelector(getUser);

  const onLogout = () => {
    dispatch(logout());
  };

  return (
    <>
      {!isUserLogin && (
        <div className="flex justify-between items-center">
          <div className="flex justify-between items-center gap-[5px]">
            <Link href="/login" className="w-full group cursor-pointer">
              <Text
                type="small"
                as="p"
                fontWeight="normal"
                className="text-white group-hover:text-[var(--accent)] hover-transition"
              >
                Login
              </Text>
            </Link>
            <div>
              <PiLineVertical size={24} color="white" />
            </div>
            <Link href="/registration" className="w-full group cursor-pointer">
              <Text
                type="small"
                as="p"
                fontWeight="normal"
                className="text-white group-hover:text-[var(--accent)] hover-transition"
              >
                Registration
              </Text>
            </Link>
          </div>
        </div>
      )}
      {isUserLogin && screenType !== 'isMobile' && (
        <div className={s.userInfoSide}>
          <div className={s.userBlock}>
            {user.userAvatar !== null && (
              <img
                src={user.userAvatar}
                alt="Userphoto"
                className="w-[40px] h-[40px] rounded-full border-solid border-wite-600 border-2"
              />
            )}
          </div>
          <span className={s.text}>Hi, {user.username}</span>
          <PiLineVertical
            size={24}
            color="var(--text-color)"
            style={{ marginLeft: '-10px', marginRight: '-10px' }}
          />
          <div className={s.btnWrapper}>
            <button type="button" onClick={onLogout} className={s.btnExit}>
              <TranslatedText text="exit" />
            </button>
          </div>
        </div>
      )}
      {isUserLogin && screenType === 'isMobile' && (
        <div className={s.userInfoSide}>
          <button type="button" onClick={onLogout} className={s.btnExit}>
            <TranslatedText text="exit" />
          </button>
        </div>
      )}
    </>
  );
};

export default AuthInfo;
