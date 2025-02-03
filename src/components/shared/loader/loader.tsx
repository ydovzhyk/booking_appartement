"use client";
import { Oval } from 'react-loader-spinner';

import s from './loader.module.scss';

const LoaderSpinner = () => {
  return (
    <div className={s.loader}>
      <Oval
        height="130"
        width="130"
        color="var(--text-color)"
        secondaryColor="var(--main-color)"
      />
    </div>
  );
};

export default LoaderSpinner;