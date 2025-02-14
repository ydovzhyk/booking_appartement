'use client';
import { PuffLoader } from 'react-spinners';

const LoaderSpinner = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-[100] bg-white/10 backdrop-blur-sm">
      <PuffLoader color="#ff662d" size={100} />
    </div>
  );
};

export default LoaderSpinner;
