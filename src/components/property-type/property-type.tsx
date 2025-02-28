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

// const properties = [
//   {
//     id: '67b73246288bd2cf8542b5c8',
//     title: 'Seaside Villa',
//     mainPhoto:
//       'https://q-xx.bstatic.com/xdata/images/hotel/263x210/595550862.jpeg?k=3514aa4abb76a6d19df104cb307b78b841ac0676967f24f4b860d289d55d3964&o=',
//     description: `Set in the centre of Lviv, 400 metres from Peter and Paul Church of the Jesuit Order and 300 metres from The Ivan Franko National University of Lviv, VULYK - Sauna - offers free WiFi and air conditioning. Located in the Lviv City Center district, the property provides guests with access to a sauna. The property is non-smoking and is located 500 metres from Lviv State Academic Opera and Ballet Theater. This apartment includes 1 bedroom, a living room and a flat-screen TV, an equipped kitchen with a dining area, and 1 bathroom with a shower and a washing machine. The property offers quiet street views. Popular points of interest near the apartment include Lviv Latin Cathedral, Rynok Square and Volodymyr Ivasyuk Monument.`,
//     ranking: 5,
//     price: 4778,
//     location: {
//       city: 'Odesa',
//       street: 'Khreshchatyk St',
//       building: '19',
//     },
//     liked: true,
//     propertiesType: 'Hotels',
//   },
//   {
//     id: '67b73246288bd2cf8542b5c7',
//     title: 'Cozy Apartment',
//     mainPhoto:
//       'https://r-xx.bstatic.com/xdata/images/hotel/263x210/595548591.jpeg?k=01741bc3aef1a5233dd33794dda397083092c0215b153915f27ea489468e57a2&o=',
//     description: `Set in the centre of Lviv, 400 metres from Peter and Paul Church of the Jesuit Order and 300 metres from The Ivan Franko National University of Lviv, VULYK - Sauna - offers free WiFi and air conditioning. Located in the Lviv City Center district, the property provides guests with access to a sauna. The property is non-smoking and is located 500 metres from Lviv State Academic Opera and Ballet Theater. This apartment includes 1 bedroom, a living room and a flat-screen TV, an equipped kitchen with a dining area, and 1 bathroom with a shower and a washing machine. The property offers quiet street views. Popular points of interest near the apartment include Lviv Latin Cathedral, Rynok Square and Volodymyr Ivasyuk Monument.`,
//     ranking: 3,
//     price: 4435,
//     location: {
//       city: 'Kyiv',
//       street: 'Franko Ave',
//       building: '12',
//     },
//     liked: true,
//     propertiesType: 'Cottages',
//   },
//   {
//     id: '67b73246288bd2cf8542b5c6',
//     title: 'Seaside Villa',
//     mainPhoto:
//       'https://r-xx.bstatic.com/xdata/images/hotel/263x210/595551044.jpeg?k=262826efe8e21a0868105c01bf7113ed94de28492ee370f4225f00d1de0c6c44&o=',
//     description: `Set in the centre of Lviv, 400 metres from Peter and Paul Church of the Jesuit Order and 300 metres from The Ivan Franko National University of Lviv, VULYK - Sauna - offers free WiFi and air conditioning. Located in the Lviv City Center district, the property provides guests with access to a sauna. The property is non-smoking and is located 500 metres from Lviv State Academic Opera and Ballet Theater. This apartment includes 1 bedroom, a living room and a flat-screen TV, an equipped kitchen with a dining area, and 1 bathroom with a shower and a washing machine. The property offers quiet street views. Popular points of interest near the apartment include Lviv Latin Cathedral, Rynok Square and Volodymyr Ivasyuk Monument.`,
//     ranking: 4,
//     price: 3519,
//     location: {
//       city: 'Lviv',
//       street: 'Shevchenka St',
//       building: '2',
//     },
//     liked: true,
//     propertiesType: 'Apartments',
//   },
//   {
//     id: '67b73246288bd2cf8542b5c5',
//     title: 'Luxury Suite',
//     mainPhoto:
//       'https://q-xx.bstatic.com/xdata/images/hotel/263x210/620168315.jpeg?k=300d8d8059c8c5426ea81f65a30a7f93af09d377d4d8570bda1bd1f0c8f0767f&o=',
//     description: `Set in the centre of Lviv, 400 metres from Peter and Paul Church of the Jesuit Order and 300 metres from The Ivan Franko National University of Lviv, VULYK - Sauna - offers free WiFi and air conditioning. Located in the Lviv City Center district, the property provides guests with access to a sauna. The property is non-smoking and is located 500 metres from Lviv State Academic Opera and Ballet Theater. This apartment includes 1 bedroom, a living room and a flat-screen TV, an equipped kitchen with a dining area, and 1 bathroom with a shower and a washing machine. The property offers quiet street views. Popular points of interest near the apartment include Lviv Latin Cathedral, Rynok Square and Volodymyr Ivasyuk Monument.`,
//     ranking: 2,
//     price: 1389,
//     location: {
//       city: 'Dnipro',
//       street: 'Shevchenka St',
//       building: '3',
//     },
//     liked: true,
//     propertiesType: 'Resorts',
//   },
//   {
//     id: '67b73246288bd2cf8542b5c4',
//     title: 'Luxury Suite',
//     mainPhoto:
//       'https://cf.bstatic.com/xdata/images/hotel/square600/270744067.webp?k=c4acaac696af11324baf8426ad3170ebf0a8138aebc1bb7fdd2e95cd6613d183&o=',
//     description: `Set in the centre of Lviv, 400 metres from Peter and Paul Church of the Jesuit Order and 300 metres from The Ivan Franko National University of Lviv, VULYK - Sauna - offers free WiFi and air conditioning. Located in the Lviv City Center district, the property provides guests with access to a sauna. The property is non-smoking and is located 500 metres from Lviv State Academic Opera and Ballet Theater. This apartment includes 1 bedroom, a living room and a flat-screen TV, an equipped kitchen with a dining area, and 1 bathroom with a shower and a washing machine. The property offers quiet street views. Popular points of interest near the apartment include Lviv Latin Cathedral, Rynok Square and Volodymyr Ivasyuk Monument.`,
//     ranking: 3,
//     price: 1267,
//     location: {
//       city: 'Odesa',
//       street: 'Sichovykh Striltsiv St',
//       building: '7',
//     },
//     liked: true,
//     propertiesType: 'Villas',
//   },
//   {
//     id: '67b73246288bd2cf8542b5c3',
//     title: 'Mountain Retreat',
//     mainPhoto:
//       'https://r-xx.bstatic.com/xdata/images/hotel/263x210/595550000.jpeg?k=71eeb3e0996d7f734e57a6fa426c718749a36df768ca5d2fb1dc65fcd7483c1d&o=',
//     description: `Located in the heart of the Carpathian Mountains, this peaceful retreat offers stunning views, fresh air, and modern amenities. Guests can enjoy hiking trails, a cozy fireplace, and easy access to the nearby ski resort.`,
//     ranking: 4,
//     price: 3120,
//     location: {
//       city: 'Yaremche',
//       street: 'Goverla St',
//       building: '10',
//     },
//     liked: false,
//     propertiesType: 'Cottages',
//   },
//   {
//     id: '67b73246288bd2cf8542b5c2',
//     title: 'Modern Downtown Loft',
//     mainPhoto:
//       'https://r-xx.bstatic.com/xdata/images/hotel/263x210/595550229.jpeg?k=2ae1f5975fa1f846ac707d3334eb604a7e8f817f640cbd790185b2691532476b&o=',
//     description: `This stylish and fully equipped loft is situated in the heart of Kyiv. Guests can enjoy panoramic city views, high-end furniture, and easy access to restaurants, cultural attractions, and business centers.`,
//     ranking: 5,
//     price: 5100,
//     location: {
//       city: 'Kyiv',
//       street: 'Khreschatyk St',
//       building: '21',
//     },
//     liked: true,
//     propertiesType: 'Holiday Homes',
//   },
// ];

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
