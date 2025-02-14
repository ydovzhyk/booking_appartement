'use client';
import { PuffLoader } from 'react-spinners';

const LoaderSpinner = () => {
  return (
    <div
      style={{ backdropFilter: 'blur(2px)'}}
      className="fixed inset-0 flex items-center justify-center z-[100] bg-[#0f1d2d]/5 "
    >
      <PuffLoader color="#ff662d" size={100} />
    </div>
  );
};

export default LoaderSpinner;
