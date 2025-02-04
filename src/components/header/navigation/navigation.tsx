import { usePathname } from 'next/navigation';
import TranslateMe from '../../../utils/helpers/translating/translating';
import NavLink from '@/components/shared/navLink/navLink';

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
      <div className="absolute top-[7px] right-0">
        <TranslateMe />
      </div>
    </nav>
  );
};

export default Navigation;
