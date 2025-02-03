"use client";

import BackLink from '../../components/shared/back-link/back-link';
import Image from 'next/image';
import NotFoundLogo from "../../images/404_logo.webp"
import NotFoundIcon from "../../images/404_logo.svg";
import s from './not-found.module.scss';

const NotFound = () => {
  const width = 550;
  const height = width * 0.85;

  return (
      <div className="container">
      <div className={s.window}>
        <div className={s.iconWrapper}>
          {/* <NotFoundIcon width={400} height={340} fill="#000" /> */}
          <Image src={NotFoundLogo} alt='Not Found Logo' width={width} height={height} />
        </div>
          <h1 className={s.title}>Oh! 404 error page</h1>
          <p className={s.txt}>{"We couldn't find the page you were looking for."}</p>
            <BackLink />
        </div>
      </div>
  );
};

export default NotFound;