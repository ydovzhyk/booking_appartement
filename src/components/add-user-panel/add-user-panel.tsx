'use client';

// import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getUser } from '@/redux/auth/auth-selectors';
import { CiMail, CiHeart } from 'react-icons/ci';

const AddUserPanel: React.FC = () => {
  const user = useSelector(getUser);
  const numberNewMessages = user?.newMessages?.length || 0;
  const numberNewLikes = user?.likedApartments?.length || 0;

  return (
    <div className="flex flex-row items-center gap-[15px] mr-[20px]">
      <div className="relative flex flex-row items-center justify-center cursor-pointer">
        {numberNewMessages > 0 && (
          <div className="absolute top-[-5px] right-[-5px] flex items-center justify-center w-[20px] h-[20px] bg-white border-white border-[1px] rounded-full">
            <span className="text-[14px] font-normal text-black mt-[2px]">
              {numberNewMessages}
            </span>
          </div>
        )}
        <CiMail size={30} color="white" className="hover:scale-110" />
      </div>
      <div className="relative flex flex-row items-center justify-center cursor-pointer">
        {numberNewLikes > 0 && (
          <div className="absolute top-[-5px] right-[-5px] flex items-center justify-center w-[20px] h-[20px] bg-white border-white border-[1px] rounded-full">
            <span className="text-[14px] font-normal text-black mt-[2px]">
              {numberNewLikes}
            </span>
          </div>
        )}
        <CiHeart size={31} color="white" className="hover:scale-110" />
      </div>
    </div>
  );
};

export default AddUserPanel;
