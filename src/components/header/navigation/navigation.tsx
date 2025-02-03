import { usePathname } from 'next/navigation';
import Link from 'next/link';
import TranslateMe from "../../../utils/helpers/translating/translating";
import { TranslatedText } from "../../../utils/helpers/translating/translating";

import s from './navigation.module.scss';

const Navigation = () => {
  const pathname = usePathname(); 

  const isActive = (path: string) => {
    return pathname === path ? `${s.link} ${s.active}` : s.link;
  };

    return (
      <div className={s.navigation}>
        <nav className={s.navigation__content}>
          <ul className={s.navigation__wrapper}>
            <li>
              <Link href="/" passHref className={isActive('/')}>
                <TranslatedText text="Home" />
              </Link>
            </li>
            <li>
              <Link href="/article" passHref className={isActive('/article')}>
                <TranslatedText text="Article" />
              </Link>
            </li>
            <li>
              <Link href="/about" passHref className={isActive('/about')}>
                <TranslatedText text="About" />
              </Link>
            </li>
          </ul>
        </nav>
        <div className={s.navigation__translating}>
          <TranslateMe />
        </div>
    </div>
  );
};

export default Navigation;