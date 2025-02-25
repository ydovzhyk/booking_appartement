'use client';
import { useState, useEffect } from 'react';
import Text from '@/components/shared/text/text';

const words = [
  'anything',
  'your apartment',
  'your hotel',
  'your holiday home',
  'your guest house',
  'your bed and breakfast',
];

const TextSlider = () => {
  const [currentWord, setCurrentWord] = useState<string>(words[0]);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    const updateWord = () => {
      setFade(false);
      setTimeout(() => {
        setCurrentWord(prevWord => {
          const currentIndex = words.indexOf(prevWord);
          const nextIndex = (currentIndex + 1) % words.length;
          return words[nextIndex];
        });
        setFade(true);
      }, 700);
    };

    interval = setInterval(updateWord, 5000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="flex flex-col gap-[5px]">
      <Text type="title" fontWeight="bold" className="text-left text-white">
        List
      </Text>
      <Text
        type="title"
        fontWeight="light"
        lineHeight='normal'
        className={`inline-block transition-opacity duration-500 text-left text-white lowercase underline fo ${
          fade ? 'opacity-100' : 'opacity-0'
        } lowercase text-left stroke-text-white text-gray-400`}
      >
        {currentWord}
      </Text>
      <div className="flex flex-row gap-[12px]">
        <Text
          type="title"
          fontWeight="bold"
          className="text-left text-white lowercase"
        >
          on
        </Text>
        <Text
          type="title"
          fontWeight="bold"
          noTranslate={true}
          className="text-left text-white"
        >
          GOHome
        </Text>
      </div>
    </div>
  );
};

export default TextSlider;
