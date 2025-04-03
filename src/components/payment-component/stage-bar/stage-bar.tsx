'use client';

import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getPaymentStage } from '@/redux/technical/technical-selectors';

const StageBar = () => {
  const paymentStage = useSelector(getPaymentStage);
  const [stage, setStage] = useState(1);

  useEffect(() => {
    if (paymentStage === 'stage-1') {
      setStage(1);
    } else if (paymentStage === 'stage-2') {
      setStage(2);
    } else if (paymentStage === 'stage-3') {
      setStage(3);
    }
  }, [paymentStage]);

  const stages = [
    { stage: 1, label: 'Your selection' },
    { stage: 2, label: 'Payment details' },
    { stage: 3, label: 'Confirmation' },
  ];

  return (
    <div className="flex items-center justify-between relative w-full px-5 sm:px-10 max-w-[500px] mx-auto">
      {stages.map((item, index) => (
        <React.Fragment key={item.stage}>
          <div className="relative flex flex-col items-center">
            <div
              className={`flex items-center justify-center w-[45px] h-[45px] rounded-full border text-[19px] font-bold transition-colors z-10
              ${stage >= item.stage ? 'bg-[var(--accent-background)] text-white' : 'bg-white text-black border-black'}`}
            >
              <span
                className={`mt-[3px] text-center text-[20px]
                  ${stage >= item.stage ? 'font-bold' : 'font-normal'}`}
              >
                {item.stage}
              </span>
            </div>
            <span
              className={`absolute top-[50px] text-center whitespace-nowrap  text-black text-[14px] sm:text-[16px]
              ${stage >= item.stage ? 'font-bold' : 'font-normal'}`}
            >
              {item.label}
            </span>
          </div>
          {index < stages.length - 1 && (
            <div
              className={`flex-grow h-px mx-[-10px] transition-colors
              ${stage > item.stage ? 'bg-[var(--accent-background)]' : 'bg-black'}`}
            ></div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default StageBar;
