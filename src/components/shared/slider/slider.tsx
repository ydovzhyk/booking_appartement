'use client';
import { useState } from 'react';
import Image from 'next/image';
import left from '@/images/left.png';
import right from '@/images/right.png';

interface SliderProps {
  images: string[];
}

const Slider: React.FC<SliderProps> = ({ images }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const imagesPerSlide = 2;

  const isPrevButtonActive = currentSlide > 0;
  const isNextButtonActive =
    (currentSlide + 1) * imagesPerSlide < images.length;

  const prevSlide = () => {
    if (isPrevButtonActive) setCurrentSlide(prev => prev - 1);
  };

  const nextSlide = () => {
    if (isNextButtonActive) setCurrentSlide(prev => prev + 1);
  };

  const displayedImages = images.slice(
    currentSlide * imagesPerSlide,
    (currentSlide + 1) * imagesPerSlide
  );

  return (
    <div className="relative w-full flex items-center justify-center">
      {/* Кнопка назад */}
      <button
        type="button"
        className="absolute left-[20px] z-10 flex items-center justify-center w-[50px] h-[50px] rounded-full shadow-md disabled:opacity-50"
        onClick={prevSlide}
        disabled={!isPrevButtonActive}
      >
        <Image src={left} alt={'Arrow left'} className="w-[50px] h-[50px]" />
      </button>

      {/* Слайдер */}
      <div className="w-full flex flex-row items-center justify-between gap-[40px]">
        {displayedImages.map((image, index) => (
          <div
            key={index}
            className="bg-cover bg-center bg-no-repeat shadow-md h-[420px]"
            style={{
              backgroundImage: `url(${image})`,
              width: 'calc(50% - 20px)',
              borderRadius: '5px',
            }}
          />
        ))}
      </div>

      {/* Кнопка вперед */}
      <button
        type="button"
        className="absolute right-[20px] z-10 flex items-center justify-center w-[50px] h-[50px] rounded-full shadow-md disabled:opacity-50"
        onClick={nextSlide}
        disabled={!isNextButtonActive}
      >
        <Image src={right} alt={'Arrow right'} className="w-[50px] h-[50px]" />
      </button>
    </div>
  );
};

export default Slider;
