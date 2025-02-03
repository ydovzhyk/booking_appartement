import Link from 'next/link';
import Text from '../text/text';
import clsx from 'clsx';

interface NavLinkProps {
  href: string;
  isActive?: boolean;
  children: string;
}

const NavLink: React.FC<NavLinkProps> = ({
  href,
  isActive = false,
  children,
}) => {
  return (
    <Link
      href={href}
      className={clsx('relative inline-block text-base group cursor-pointer')}
    >
      <Text
        type="regular"
        as="span"
        fontWeight={isActive ? 'normal' : 'medium'}
      >
        {children}
      </Text>
      <span
        className={clsx(
          'absolute left-0 block h-[1px] bg-[var(--accent-background)] transition-all duration-300 ease-in-out origin-left',
          isActive ? 'w-full' : 'w-0 group-hover:w-full'
        )}
      ></span>
    </Link>
  );
};

export default NavLink;
