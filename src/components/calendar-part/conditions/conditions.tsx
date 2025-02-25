'use client';

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Text from '@/components/shared/text/text';
import { getSearchConditions } from '@/redux/search/search-selectors';
import { setSearchConditions } from '@/redux/search/search-slice';
import Button from '@/components/shared/button/button';
import { CiCircleMinus, CiCirclePlus } from 'react-icons/ci';

const Conditions = ({ onClose }: { onClose: () => void }) => {
  const dispatch = useDispatch();
  const conditions = useSelector(getSearchConditions);
  const [numberAdults, setNumberAdults] = useState(conditions.numberAdults);
  const [numberChildren, setNumberChildren] = useState(
    conditions.numberChildren
  );
  const [numberRooms, setNumberRooms] = useState(conditions.numberRooms);
  const [petsAllowed, setPetsAllowed] = useState(conditions.petsAllowed);

  const handleUpdate = () => {
    dispatch(
      setSearchConditions({
        numberAdults,
        numberChildren,
        numberRooms,
        petsAllowed,
      })
    );
    onClose();
  };

  return (
    <div
      className="w-full p-[10px] flex flex-col items-center gap-[10px] regular-border bg-white"
      style={{ borderRadius: '5px' }}
    >
      <ul className="w-full flex flex-col gap-[10px]">
        {/* 🏡 Adults */}
        <li className="w-full flex flex-row items-center justify-between">
          <Text
            type="tiny"
            fontWeight="normal"
            className="text-left text-[#0f1d2d]"
          >
            Adults
          </Text>
          <div
            className="w-[110px] p-[5px] flex flex-row items-center justify-between regular-border"
            style={{ borderRadius: '5px' }}
          >
            <button
              type="button"
              className="hover:scale-110 transition-transform duration-200 ease-in-out"
              onClick={() => setNumberAdults(prev => Math.max(0, prev - 1))}
            >
              <CiCircleMinus size={28} />
            </button>
            <span className="text-left text-[#0f1d2d]">{numberAdults}</span>
            <button
              type="button"
              className="hover:scale-110 transition-transform duration-200 ease-in-out"
              onClick={() => setNumberAdults(prev => prev + 1)}
            >
              <CiCirclePlus size={28} />
            </button>
          </div>
        </li>

        {/* 👶 Children */}
        <li className="w-full flex flex-row items-center justify-between">
          <Text
            type="tiny"
            fontWeight="normal"
            className="text-left text-[#0f1d2d]"
          >
            Children
          </Text>
          <div
            className="w-[110px] p-[5px] flex flex-row items-center justify-between regular-border"
            style={{ borderRadius: '5px' }}
          >
            <button
              type="button"
              className="hover:scale-110 transition-transform duration-200 ease-in-out"
              onClick={() => setNumberChildren(prev => Math.max(0, prev - 1))}
            >
              <CiCircleMinus size={28} />
            </button>
            <span className="text-left text-[#0f1d2d]">{numberChildren}</span>
            <button
              type="button"
              className="hover:scale-110 transition-transform duration-200 ease-in-out"
              onClick={() => setNumberChildren(prev => prev + 1)}
            >
              <CiCirclePlus size={28} />
            </button>
          </div>
        </li>

        {/* 🚪 Rooms */}
        <li className="w-full flex flex-row items-center justify-between">
          <Text
            type="tiny"
            fontWeight="normal"
            className="text-left text-[#0f1d2d]"
          >
            Rooms
          </Text>
          <div
            className="w-[110px] p-[5px] flex flex-row items-center justify-between regular-border"
            style={{ borderRadius: '5px' }}
          >
            <button
              type="button"
              className="hover:scale-110 transition-transform duration-200 ease-in-out"
              onClick={() => setNumberRooms(prev => Math.max(0, prev - 1))}
            >
              <CiCircleMinus size={28} />
            </button>
            <span className="text-left text-[#0f1d2d]">{numberRooms}</span>
            <button
              type="button"
              className="hover:scale-110 transition-transform duration-200 ease-in-out"
              onClick={() => setNumberRooms(prev => prev + 1)}
            >
              <CiCirclePlus size={28} />
            </button>
          </div>
        </li>
      </ul>

      {/* 🔹 Лінія розділення */}
      <div className="w-full border-t border-[#0f1d2d4f]"></div>

      {/* 🐶 Чекбокс "Travelling with pets?" */}
      <div className="w-full flex items-center justify-between">
        <Text type="tiny" fontWeight="normal" className="text-left text-dark">
          Travelling with pets?
        </Text>

        {/* Контейнер чекбокса */}
        <button
          type="button"
          onClick={() => setPetsAllowed(prev => !prev)}
          className={`w-5 h-5 border border-gray-400 flex items-center justify-center transition-all rounded 
          ${petsAllowed ? 'bg-[#0f1d2d] border-[#0f1d2d]' : 'bg-white'}`}
        >
          {petsAllowed && (
            <span className="text-white text-sm font-bold">✓</span>
          )}
        </button>
      </div>
      <Button
        type="button"
        text="Update"
        btnClass="btnDark"
        onClick={handleUpdate}
      />
    </div>
  );
};

export default Conditions;
