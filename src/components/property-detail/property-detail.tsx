'use client';

import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '@/utils/helpers/hooks';
import { usePathname } from 'next/navigation';
import { likeProperty } from '@/redux/property/property-operations';
import { Tooltip } from 'react-tooltip';
import Image from 'next/image';
import Text from '../shared/text/text';
import { IProperty } from '@/types/property/property';
import { FaLocationDot } from 'react-icons/fa6';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { RxShare1 } from 'react-icons/rx';
import { getUser, getLogin } from '@/redux/auth/auth-selectors';
import {
  getCurrency,
  getExchangeRate,
} from '@/redux/technical/technical-selectors';

const PropertyDetail: React.FC<IProperty> = ({
  _id,
  title,
  mainImage,
  imagesLink,
  price,
  ranking,
  location,
  description,
}) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const { likedApartments } = useSelector(getUser);
  const isLogin = useSelector(getLogin);
  const currency = useSelector(getCurrency);
  const exchangeRate = useSelector(getExchangeRate);
  const appDispatch = useAppDispatch();
  const pathname = usePathname();
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [copied, setCopied] = useState(false);

  const convertedPrice = (Number(price.value) * exchangeRate).toFixed(2);

  useEffect(() => {
    setIsLiked(likedApartments?.includes(_id) || false);
  }, [likedApartments, _id]);

  const toggleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    appDispatch(likeProperty({ propertyId: _id }));
  };

  const openModalWithImages = (imageUrl: string) => {
    setSelectedImage(imageUrl);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const handleCopyLink = () => {
    const currentURL = `${window.location.origin}${pathname}`;
    navigator.clipboard
      .writeText(currentURL)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 3000);
      })
      .catch(err => console.error('Failed to copy link: ', err)); // eslint-disable-line
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

            <div className="flex flex-row items-center gap-[10px] test-border">
              {/* Лайк */}
              {isLogin && (
                <div
                  className="flex items-center justify-center w-[45px] h-[45px] rounded-full cursor-pointer z-10 hover:scale-110 transition-transform duration-200 ease-in-out backdrop-blur-sm bg-white/20"
                  onClick={toggleLike}
                >
                  {isLiked ? (
                    <AiFillHeart size={26} color="var(--accent-background)" />
                  ) : (
                    <AiOutlineHeart
                      size={26}
                      color="var(--accent-background)"
                    />
                  )}
                </div>
              )}
              <div
                className="flex items-center justify-center w-[45px] h-[45px] rounded-full cursor-pointer z-10 hover:scale-110 transition-transform duration-200 ease-in-out backdrop-blur-sm bg-white/20"
                onClick={handleCopyLink}
              >
                <RxShare1 size={26} color="var(--accent-background)" />
                {copied && (
                  <Tooltip
                    id="copy-tooltip"
                    place="top"
                    isOpen={copied}
                    style={{
                      transform: 'translateY(-10px)',
                      backgroundColor: '#0f1d2d',
                      borderRadius: '5px',
                      padding: '6px 10px',
                      fontSize: '14px',
                    }}
                  >
                    <Text
                      type="small"
                      as="span"
                      fontWeight="light"
                      className="text-white"
                    >
                      Link copied
                    </Text>
                  </Tooltip>
                )}
              </div>
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
                <div
                  key={index}
                  className="relative"
                  style={{ width: 'calc(100%/3)' }}
                >
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
            <div className="flex items-center gap-2">
              <Text as="p" fontWeight="bold">
                {price.value} {price.currency}
              </Text>
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
