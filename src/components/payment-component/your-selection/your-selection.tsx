'use client';

import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  getPaymentData,
  getCurrency,
} from '@/redux/technical/technical-selectors';
import { getSearchConditions } from '@/redux/search/search-selectors';
import { getPaymentStage } from '@/redux/technical/technical-selectors';
import Text from '@/components/shared/text/text';
import TranslateMe from '@/utils/helpers/translating/translating';
import Currencies from '@/components/currencies/currencies';

const YourSelection = () => {
  const paymentData = useSelector(getPaymentData);
  const conditions = useSelector(getSearchConditions);
  const currency = useSelector(getCurrency);

  function generateBookingText(rooms: number, nights: number): string {
  const roomText = `${rooms} ${rooms === 1 ? 'room' : 'rooms'}`;
  const nightText = `${nights} ${nights === 1 ? 'night' : 'nights'}`;
  return `${roomText} x ${nightText}`;
  };
  function generateGuestsText(
    currency: string,
    numberAdults: number,
    numberChildren: number,
    petsAllowed: boolean
  ): string {
    const adultsText = `${numberAdults} ${numberAdults === 1 ? 'adult' : 'adults'}`;
    const childrenText =
      numberChildren > 0
        ? ` and ${numberChildren} ${numberChildren === 1 ? 'child' : 'children'}`
        : '';
    const petsText = petsAllowed ? ' with pet' : '';

    return `(in ${currency} for ${adultsText}${childrenText}${petsText})`;
  };

  const text01 = generateBookingText(conditions.numberRooms, conditions.days);
  const text02 = generateGuestsText(
    currency,
    conditions.numberAdults,
    conditions.numberChildren,
    conditions.petsAllowed
  );

  return (
    <div className="w-full flex flex-col justify-between gap-[40px] test-border">
      <Text type="regular" as="h2" fontWeight="bold" className="inline">
        Your selection:
      </Text>
      <div className="w-full flex flex-row justify-between gap-[20px] items-center">
        <div className="w-[50%] flex flex-col gap-[20px]">
          <div className="w-full flex flex-col gap-[10px] border border-gray-200 shadow rounded-lg p-[15px]">
            <div className="flex flex-row items-center justify-between p-[10px]">
              <Text as="p" type="small" fontWeight="bold">
                Your Price Summary
              </Text>
              <Currencies showLabelWithValue={true} />
            </div>
            <div className="flex flex-row items-center justify-between p-[10px]">
              <Text as="p" type="small" fontWeight="bold">
                Description
              </Text>
              <Text as="p" type="small" fontWeight="bold" className="mr-[45px]">
                Price
              </Text>
            </div>
            <div className="flex flex-row items-center justify-between bg-gray-200 p-[10px]">
              <div className="flex flex-col gap-[5px]">
                <Text as="p" type="small" fontWeight="bold">
                  {text01}
                </Text>
                <Text as="p" type="small" fontWeight="normal">
                  {text02}
                </Text>
              </div>
              <Text as="p" type="small" fontWeight="bold" className="mr-[45px]">
                Price
              </Text>
            </div>
          </div>
        </div>

        <div className="w-[50%] flex flex-col gap-[20px]">
          <div className="w-full flex flex-col gap-[20px] border border-gray-200 shadow rounded-lg p-[15px]"></div>
        </div>
      </div>
    </div>
  );
};

export default YourSelection;
