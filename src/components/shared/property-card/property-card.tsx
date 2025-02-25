'use client';

import { useState } from 'react';
import Text from '../text/text';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { FaStar, FaRegStar } from 'react-icons/fa';

// Типи для пропсів
interface Location {
  city: string;
  street: string;
  building: string;
}

interface PropertyCardProps {
  id: string;
  title: string;
  mainPhoto: string;
  ranking: number;
  liked: boolean;
  location: Location;
  description: string;
  price: number;
}

const PropertyCard: React.FC<PropertyCardProps> = ({
  id,
  title,
  mainPhoto,
  ranking,
  liked,
  location,
  description,
  price,
}) => {
  const [isLiked, setIsLiked] = useState<boolean>(liked);
  const [showInfo, setShowInfo] = useState<boolean>(false);

  const toggleLike = () => {
    setIsLiked(prev => !prev);
    console.log(`Property ${id} liked:`, !isLiked);
  };

  return (
    <div
      className="relative flex flex-col bg-white shadow-lg overflow-hidden transition-transform"
      style={{ borderRadius: '5px' }}
    >
      {/* Лайк */}
      <div
        className="absolute top-2 right-2 flex items-center justify-center w-[45px] h-[45px] rounded-full cursor-pointer z-10 hover:scale-110 transition-transform duration-200 ease-in-out backdrop-blur-sm bg-white/20"
        onClick={toggleLike}
      >
        {isLiked ? (
          <AiFillHeart size={26} color="var(--accent)" />
        ) : (
          <AiOutlineHeart size={26} color="#D1D5DB" />
        )}
      </div>

      {/* Фото */}
      <div
        className="relative w-full h-[220px] bg-cover bg-center transition-all duration-300"
        style={{ backgroundImage: `url(${mainPhoto})` }}
        onMouseEnter={() => setShowInfo(true)}
        onMouseLeave={() => setShowInfo(false)}
      >
        {/* Оверлей опису */}
        {showInfo && (
          <div className="absolute inset-0 bg-black/60 flex flex-col justify-center items-center p-4 text-white transition-opacity duration-300">
            <Text type="tiny" className="text-center">
              {description.slice(0, 300)}...
            </Text>
            <Text type="normal" fontWeight="bold" className="mt-2">
              Price: ${price}
            </Text>
          </div>
        )}
      </div>

      {/* Деталі */}
      <div className="flex flex-col gap-2 p-4">
        <Text as="h2" fontWeight="bold">
          {title}
        </Text>
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
