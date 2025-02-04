'use client';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import Text from '../text/text';

const BackLink = () => {
  const searchParams = useSearchParams();
  const backLinkHref = searchParams.get('from') || '/';

  return (
    <Link href={backLinkHref} passHref className="cursor-pointer group">
      <button
        type="button"
        className="w-full h-full flex flex-row justify-center items-center"
      >
        <Text
          type="small"
          as="span"
          fontWeight="normal"
          className="group-hover:text-[var(--accent)] hover-transition"
        >
          Go Back
        </Text>
      </button>
    </Link>
  );
};

export default BackLink;
