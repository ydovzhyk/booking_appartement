'use client';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { TranslatedText } from '../../../utils/helpers/translating/translating';
import Text from '../text/text';

import s from './back-link.module.scss';

const BackLink = () => {
  const searchParams = useSearchParams();
  const backLinkHref = searchParams.get('from') || '/';

  return (
    <Link
      href={backLinkHref}
      passHref
      className="cursor-pointer
                regular-border group
                w-[150px] h-[40px] md:w-[170px]"
    >
      <button
        type="button"
        className="w-full h-full flex flex-row justify-center items-center"
      >
        <Text
          type="small"
          as="span"
          fontWeight="normal"
          className="group-hover:font-bold hover-transition"
        >
          Go Back
        </Text>
      </button>
    </Link>
  );
};

export default BackLink;
