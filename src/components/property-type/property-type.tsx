'use client';

import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Text from '../shared/text/text';
import PropertyCard from '../shared/property-card/property-card';
import Image from 'next/image';
import left from '@/images/left_inactive.png';
import right from '@/images/right_inactive.png';
import { getSearchConditions } from '@/redux/search/search-selectors';
import { searchProperty } from '@/redux/search/search-operations';
import { useAppDispatch } from '@/utils/helpers/hooks';
import { propertyTypesArray } from '@/redux/property/property-operations';
import { getPropertyTypes } from '@/redux/property/property-selectors';

const ITEMS_PER_PAGE = 4;

const PropertySlider = () => {
  const [startIndex, setStartIndex] = useState(0);
  const dispatch = useAppDispatch();
  const property = useSelector(getSearchConditions);
  const properties = useSelector(getPropertyTypes) || [];

  useEffect(() => {
    dispatch(propertyTypesArray());
  }, [dispatch]);

  const getVisibleProperties = () => {
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return properties
      .slice(startIndex, endIndex)
      .concat(properties.slice(0, Math.max(0, endIndex - properties.length)));
  };

  const handleNext = () => {
    setStartIndex(prevIndex => (prevIndex + 1) % properties.length);
  };

  const handlePrev = () => {
    setStartIndex(
      prevIndex => (prevIndex - 1 + properties.length) % properties.length
    );
  };

  const handleSearch = data => {
    dispatch(
      searchProperty({ searchConditions: { ...property, propertyType: data } })
    );
  };

  if (properties && properties.length > 0) {
    return (
      <section className="flex flex-col gap-[20px]">
        <Text as="h2" fontWeight="bold">
          Browse by property type
        </Text>

        <div className="relative flex items-center">
          {/* Кнопка "Prev" */}
          <button
            type="button"
            className="absolute left-[20px] z-10 flex items-center justify-center w-[45px] h-[45px] rounded-full shadow-md disabled:opacity-50 hover:scale-110 transition-transform duration-200 ease-in-out"
            onClick={handlePrev}
          >
            <Image
              src={left}
              alt={'Arrow left'}
              className="w-[45px] h-[45px]"
            />
          </button>

          {/* Карточки */}
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mx-auto">
            {getVisibleProperties().map(property => (
              <div key={property._id} className="flex flex-col gap-[10px]">
                <button
                  type="button"
                  onClick={() => handleSearch(property.category)}
                  className="flex flex-row items-center justify-start hover:scale-110 transition-transform duration-200 ease-in-out origin-left"
                >
                  <Text as="p" type="small" fontWeight="bold">
                    {property.category}
                  </Text>
                </button>
                <PropertyCard {...property} />
              </div>
            ))}
          </div>

          {/* Кнопка "Next" */}
          <button
            type="button"
            className="absolute right-[20px] z-10 flex items-center justify-center w-[45px] h-[45px] bg-[#D1D5DB] rounded-full shadow-md disabled:opacity-50 hover:scale-110 transition-transform duration-200 ease-in-out"
            onClick={handleNext}
          >
            <Image
              src={right}
              alt={'Arrow left'}
              className="w-[45px] h-[45px]"
            />
          </button>
        </div>
      </section>
    );
  } else {
    return null;
  }
};

export default PropertySlider;
