import Link from 'next/link';
import LogoIcon from '@/images/logo_appartement.svg';

interface LogoProps {
  width?: number;
  height?: number;
}

const Logo: React.FC<LogoProps> = ({ width = 125, height = 30 }) => {
  return (
    <Link href="/" className="cursor-pointer">
      <LogoIcon width={width} height={height} viewBox="0 0 125 30" />
    </Link>
  );
};

export default Logo;
