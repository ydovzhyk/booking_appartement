'use client';

import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import Text from '../text/text';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { FaStar, FaRegStar } from 'react-icons/fa';
import { likeProperty } from '@/redux/property/property-operations';
import { useAppDispatch } from '@/utils/helpers/hooks';
import { getUser, getLogin } from '@/redux/auth/auth-selectors';
import {
  getCurrency,
  getExchangeRate,
} from '@/redux/technical/technical-selectors';
import { IProperty } from '@/types/property/property';

const PropertyCard: React.FC<IProperty> = ({
  _id,
  title,
  mainImage,
  ranking,
  location,
  description,
  price,
}) => {
  const { likedApartments } = useSelector(getUser);
  const isLogin = useSelector(getLogin);
  const currency = useSelector(getCurrency);
  const exchangeRate = useSelector(getExchangeRate);
  const appDispatch = useAppDispatch();
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [showInfo, setShowInfo] = useState<boolean>(false);
  const router = useRouter();

  const convertedPrice = (Number(price.value) * exchangeRate).toFixed(2);

  useEffect(() => {
    setIsLiked(likedApartments?.includes(_id) || false);
  }, [likedApartments, _id]);

  const toggleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation(); // ❗ Зупиняємо подію, щоб не викликався handleNavigate
    appDispatch(likeProperty({ propertyId: _id }));
  };

  const formattedTitle = title
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-');

  const handleNavigate = () => {
    router.push(`/property/${formattedTitle}/${_id}`);
  };

  return (
    <div
      className="relative flex flex-col h-full bg-white shadow-lg overflow-hidden transition-transform cursor-pointer"
      style={{ borderRadius: '5px' }}
      onClick={handleNavigate}
    >
      {/* Лайк */}
      {isLogin && (
        <div
          className="absolute top-2 right-2 flex items-center justify-center w-[45px] h-[45px] rounded-full cursor-pointer z-10 hover:scale-110 transition-transform duration-200 ease-in-out backdrop-blur-sm bg-white/20"
          onClick={toggleLike}
        >
          {isLiked ? (
            <AiFillHeart size={26} color="white" />
          ) : (
            <AiOutlineHeart size={26} color="#D1D5DB" />
          )}
        </div>
      )}

      {/* Фото */}
      <div
        className="relative w-full h-[220px] bg-cover bg-center transition-all duration-300"
        style={{ backgroundImage: `url(${mainImage})` }}
        onMouseEnter={() => setShowInfo(true)}
        onMouseLeave={() => setShowInfo(false)}
      >
        {/* Оверлей опису */}
        {showInfo && (
          <div className="absolute inset-0 bg-black/60 flex flex-col justify-center items-center gap-[20px] p-4 text-white transition-opacity duration-300">
            <Text type="tiny" className="text-center">
              {description.slice(0, 300)}...
            </Text>

            <div className="flex flex-row items-center gap-2">
              <Text type="small" fontWeight="bold" className="mt-2">
                Price per night:
              </Text>
              <Text type="small" fontWeight="normal" className="mt-2">
                {convertedPrice} {currency}
              </Text>
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-2 p-4">
        <div className="min-h-[58px]">
          <Text as="h2" fontWeight="bold">
            {title.slice(0, 60)}
          </Text>
        </div>
        <Text type="small" className="text-gray-600">
          {location.city}, {location.street}, {location.building}
        </Text>

        {/* Рейтинг */}
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, index) =>
            index < ranking ? (
              <FaStar key={index} size={16} className="text-[var(--accent)]" />
            ) : (
              <FaRegStar key={index} size={16} className="text-gray-300" />
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
