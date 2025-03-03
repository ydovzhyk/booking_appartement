import NavLink from '@/components/shared/navLink/navLink';
import { usePathname } from 'next/navigation';
import TranslateMe from '../../../utils/helpers/translating/translating';
import Currencies from '../../currencies/currencies';

const Navigation = () => {
  const pathname = usePathname();

  return (
    <nav className="relative w-full py-[13px]">
      <ul className="flex flex-row items-center justify-center gap-[60px] w-full">
        <li>
          <NavLink
            href="/"
            textColor="text-white"
            underlineColor="bg-white"
            isActive={pathname === '/'}
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            href="/article"
            textColor="text-white"
            underlineColor="bg-white"
            isActive={pathname === '/article'}
          >
            Article
          </NavLink>
        </li>
        <li>
          <NavLink
            href="/about"
            textColor="text-white"
            underlineColor="bg-white"
            isActive={pathname === '/about'}
          >
            About
          </NavLink>
        </li>
      </ul>
      <div className="absolute bottom-[8px] right-0 flex flex-row items-center gap-[10px]">
        <Currencies />
        <TranslateMe />
      </div>
    </nav>
  );
};

export default Navigation;
