'use client';

import { useState } from 'react';
import Image from 'next/image';
import Text from '../shared/text/text';
import { IProperty } from '@/types/property/property';
import { FaLocationDot } from 'react-icons/fa6';

const PropertyDetail: React.FC<IProperty> = ({
  title,
  mainImage,
  imagesLink,
  price,
  ranking,
  location,
  description,
}) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const openModalWithImages = (imageUrl: string) => {
    setSelectedImage(imageUrl);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const remainingImagesCount = imagesLink.length - 5;
  const formattedAddress = `${location.city}, ${location.street}, ${location.building}`;

  return (
    <div className="w-full my-[40px] mx-auto test-border">
      <div className="w-full flex flex-row items-center justify-between">
        <div className="w-[65%]">
          {/* Заголовок */}
          <div className="flex justify-between items-center mb-4">
            <Text as="h1" fontWeight="bold">
              {title}
            </Text>
            <div className="flex items-center gap-2">
              <Text as="p" fontWeight="bold">
                {price.value} {price.currency}
              </Text>
            </div>
          </div>

          {/* Адреса */}
          <div className="flex items-center gap-2">
            <FaLocationDot size={22} />
            <Text type="regular" className="text-gray-600">
              {formattedAddress}
            </Text>
          </div>

          {/* Фото */}
          <div className="mt-4 flex flex-col gap-4">
            <div className="flex gap-4">
              {/* Головне фото */}
              <div className="flex-1">
                <Image
                  src={mainImage}
                  alt="Основне фото"
                  width={555}
                  height={395}
                  className="w-full h-[395px] object-cover cursor-pointer rounded-lg"
                  onClick={() => openModalWithImages(mainImage)}
                />
              </div>

              {/* Два додаткових фото праворуч */}
              <div className="flex flex-col gap-4 w-[266px]">
                {imagesLink.slice(0, 2).map((image, index) => (
                  <Image
                    key={index}
                    src={image}
                    alt={`Додаткове фото ${index + 1}`}
                    width={266}
                    height={188}
                    className="w-[266px] h-[188px] object-cover cursor-pointer rounded-lg"
                    onClick={() => openModalWithImages(image)}
                  />
                ))}
              </div>
            </div>

            {/* Три фото знизу */}
            <div className="w-full flex gap-4 relative">
              {imagesLink.slice(2, 5).map((image, index) => (
                <div key={index} className="relative"
                style={{width: 'calc(100%/3)'}}>
                  <Image
                    src={image}
                    alt={`Додаткове фото ${index + 3}`}
                    width={300}
                    height={188}
                    className="w-full h-[188px] object-cover cursor-pointer rounded-lg"
                    onClick={() => openModalWithImages(image)}
                  />
                  {/* Лічильник, якщо є ще фото */}
                  {index === 2 && remainingImagesCount > 0 && (
                    <div className="absolute bottom-4 right-4 bg-black/60 text-white px-3 py-1 rounded-md text-sm">
                      +{remainingImagesCount} фото
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Права панаель */}
        <div className="w-[32%] flex flex-col gap-[40px]"></div>
      </div>

      {/* Опис */}
      <div className="mt-6">
        <Text as="h2" fontWeight="bold">
          Опис
        </Text>
        <Text type="small" className="text-gray-700 mt-2">
          {description}
        </Text>
      </div>

      {/* Модальне вікно для фото */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="relative p-4">
            <button
              className="absolute top-2 right-2 bg-gray-100 text-black px-2 py-1 rounded"
              onClick={closeModal}
            >
              ✕
            </button>
            <Image
              src={selectedImage}
              alt="Перегляд фото"
              width={800}
              height={600}
              className="max-w-[90vw] max-h-[90vh] object-contain rounded-lg"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyDetail;


