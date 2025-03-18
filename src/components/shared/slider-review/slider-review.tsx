'use client';

import React, { useState } from 'react';
import { CiFaceFrown, CiFaceMeh, CiFaceSmile } from 'react-icons/ci';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { countries } from '@/data/countries';
import { Review, reviews } from '@/data/reviews';
import Text from '../text/text';

const ReviewCard: React.FC<{ review: Review }> = ({ review }) => {
  const {
    reviewOwnerName,
    reviewOwnerCountry,
    reviewData,
    reviewDate,
    reviewOwnerPhoto,
    ranking,
  } = review;

  const countryInfo = countries.find(c => c.value === reviewOwnerCountry);

  const getRankingIcon = () => {
    if (parseFloat(ranking) >= 4.5)
      return <CiFaceSmile size={24} className="text-green-500" />;
    if (parseFloat(ranking) >= 3)
      return <CiFaceMeh size={24} className="text-yellow-500" />;
    return <CiFaceFrown size={24} className="text-red-500" />;
  };

  return (
    <div className="w-[427px] h-[170px] border rounded-lg p-[10px] shadow-md bg-white flex flex-col justify-between">
      <div className="flex flex-row items-center gap-[15px]">
        <img
          src={reviewOwnerPhoto}
          alt={reviewOwnerName}
          className="w-[40px] h-[40px] rounded-full"
        />
        <div className="flex flex-row items-center gap-[15px]">
          <Text type="regular" as="p" fontWeight="bold" className="mt-[3px]">
            {reviewOwnerName}
          </Text>
          <div className="flex items-center gap-2">
            {countryInfo ? (
              <img
                src={countryInfo.flag}
                alt={reviewOwnerCountry}
                className="w-[35px] h-[25px] rounded-sm border border-gray-300"
              />
            ) : (
              <Text type="small" as="p" className="text-gray-500">
                {reviewOwnerCountry}
              </Text>
            )}
          </div>
        </div>
      </div>
      <Text
        type="small"
        as="p"
        fontWeight="light"
        className="text-gray-700 px-[35px]"
      >
        {reviewData}
      </Text>
      <div className="flex flex-row items-center justify-between">
        <Text type="tiny" as="p" className="text-gray-400">
          {reviewDate.length > 120
            ? `${reviewDate.slice(0, 120)}...`
            : reviewDate}
        </Text>
        <div className="flex items-center gap-2">
          {getRankingIcon()}
          <Text type="small" as="p" fontWeight="normal">
            {ranking}/5
          </Text>
        </div>
      </div>
    </div>
  );
};

const SliderReview: React.FC<{ reviews: Review[] }> = ({ reviews }) => {
  const [index, setIndex] = useState(0);

  const nextReview = () => {
    setIndex(prevIndex => (prevIndex + 1) % reviews.length);
  };

  const prevReview = () => {
    setIndex(prevIndex => (prevIndex - 1 + reviews.length) % reviews.length);
  };

  return (
    <div className="w-full flex flex-col items-left gap-[10px]">
      <Text type="small" as="p" fontWeight="light">
        Guests who stayed here loved:
      </Text>

      <div className="relative flex items-center justify-center w-full">
        <button
          onClick={prevReview}
          className="absolute left-[5px] top-1/2 transform -translate-y-1/2 flex items-center justify-center w-[30px] h-[30px] rounded-full regular-border hover:bg-gray-300 hover:border-gray-300 transition"
        >
          <IoIosArrowBack />
        </button>
        <ReviewCard review={reviews[index]} />
        <button
          onClick={nextReview}
          className="absolute right-[5px] top-1/2 transform -translate-y-1/2 flex items-center justify-center w-[30px] h-[30px] rounded-full regular-border hover:bg-gray-300 hover:border-gray-300 transition"
        >
          <IoIosArrowForward />
        </button>
      </div>
    </div>
  );
};

export default function ReviewsSection() {
  return <SliderReview reviews={reviews} />;
}
