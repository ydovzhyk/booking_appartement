'use client';

import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import {
  getPaymentData,
  getCurrency,
  getExchangeRate,
} from '@/redux/technical/technical-selectors';
import {
  getAvailable,
} from '@/redux/search/search-selectors';
import { setPaymentStage } from '@/redux/technical/technical-slice';
import { getSearchConditions } from '@/redux/search/search-selectors';
import { clearAvailable } from '@/redux/search/search-slice';
import Text from '@/components/shared/text/text';
import Currencies from '@/components/currencies/currencies';
import { FaStar, FaRegStar } from 'react-icons/fa';
import { services } from '@/components/shared/services-part/services-part';
import CalendarPart from '@/components/calendar-part/calendar-part';
import Button from '@/components/shared/button/button';

const YourSelection = () => {
  const paymentData = useSelector(getPaymentData) as {
    propertyId: string;
    propertyName: string | null;
    propertyImg: string | null;
    location: {
      city: string;
    };
    ranking: number;
    usersFeedback: [] | null;
    servicesList: [] | null;
    pricePerNight: number | null;
    typePayment: string | null;
    owner: any;
  };
  const dispatch = useDispatch();
  const router = useRouter();
  const conditions = useSelector(getSearchConditions);
  const isAvailable = useSelector(getAvailable);
  const currency = useSelector(getCurrency);
  const exchangeRate = useSelector(getExchangeRate);
  const [hasMounted, setHasMounted] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [changeConditions, setChangeConditions] = useState(false);
  const [prevAvailable, setPrevAvailable] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    if (changeConditions && !prevAvailable && isAvailable === 'true') {
      setPrevAvailable(true);
      dispatch(clearAvailable());
      return;
    }
    if (changeConditions && prevAvailable && isAvailable === 'true') {
      setTimeout(() => {
        setChangeConditions(false);
        setPrevAvailable(false);
      }, 5000);
    }
    if (changeConditions && prevAvailable && isAvailable === 'false') {
      return;
    }
  }, [isAvailable, changeConditions]);

  useEffect(() => {
    const calculateNewPrice = () => {
      if (!paymentData.pricePerNight || !conditions.days || !exchangeRate) {
        setTotalPrice(0);
        return;
      }
      const basePrice =
        Number(paymentData.pricePerNight * exchangeRate * conditions.days);

      const newTotalPrice =
        paymentData.typePayment === 'Non-refundable'
          ? Math.round(basePrice)
          : Math.round(basePrice * 1.1);
      setTotalPrice(newTotalPrice);
    };

    calculateNewPrice();
  }, [currency]);

  function generateBookingText(rooms: number, nights: number): string {
    const roomText = `${rooms} ${rooms === 1 ? 'room' : 'rooms'}`;
    const nightText = `${nights} ${nights === 1 ? 'night' : 'nights'}`;
    return `${roomText} x ${nightText}`;
  }

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
  }
  function generateStayConditionsText(
    numberRooms: number,
    numberAdults: number,
    numberChildren: number,
    petsAllowed: boolean
  ): string {
    const roomText = `${numberRooms} ${numberRooms === 1 ? 'room' : 'rooms'}`;
    const adultsText = `${numberAdults} ${numberAdults === 1 ? 'adult' : 'adults'}`;
    const childrenText =
      numberChildren > 0
        ? `, ${numberChildren} ${numberChildren === 1 ? 'child' : 'children'}`
        : '';
    const petsText = petsAllowed ? ', with pet allowed' : ', no pets';

    return `Accommodation: ${roomText}, for ${adultsText}${childrenText}${petsText}`;
  }

  if (!hasMounted) return null;

  const text01 = generateBookingText(conditions.numberRooms, conditions.days);
  const text02 = generateGuestsText(
    currency,
    conditions.numberAdults,
    conditions.numberChildren,
    conditions.petsAllowed
  );
  const text03 = generateStayConditionsText(
    conditions.numberRooms,
    conditions.numberAdults,
    conditions.numberChildren,
    conditions.petsAllowed
  );

  function generateAddressText(location: {
    country?: string;
    city?: string;
    street?: string;
    building?: string;
    apartment?: string;
  }): string {
    const { country, city, street, building, apartment } = location;

    const parts = [
      country,
      city,
      street && `${street}`,
      building && `bldg. ${building}`,
      apartment && `apt. ${apartment}`,
    ].filter(Boolean);

    return parts.join(', ');
  }

  function getRandomServices(selected: string[] = [], count = 3) {
    const matched = services.filter(service => selected.includes(service.name));
    const shuffled = [...matched].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }

  const proceedToPayment = () => {
    dispatch(setPaymentStage('stage-2'));
    router.push('/payment/stage-2');
  }

  return (
    <div className="w-full flex flex-col justify-between gap-[40px] test-border">
      <Text type="regular" as="h2" fontWeight="bold" className="inline">
        Your selection:
      </Text>
      <div className="w-full flex flex-row justify-between gap-[20px] items-start">
        <div className="w-[50%] flex flex-col gap-[20px]">
          <div className="w-full flex flex-col gap-[20px] border border-gray-200 shadow rounded-lg p-[15px]">
            <div className="flex flex-row items-center justify-between p-[10px]">
              <Text as="p" type="small" fontWeight="bold">
                Your Price Summary
              </Text>
              <Currencies
                showLabelWithValue={true}
                initialCurrency={currency}
              />
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
              <div className="mr-[20px] flex flex-row items-center gap-[10px] text-[18px] font-bold">
                {currency !== 'UAH' && (
                  <div className="flex flex-row items-center">
                    <span>{currency}</span>
                  </div>
                )}
                <span>
                  {totalPrice.toFixed(2)}
                  {currency !== 'UAH' ? '*' : ''}
                </span>
                {currency === 'UAH' && <span>{currency}</span>}
              </div>
            </div>
            <div className="flex flex-row items-center justify-between bg-gray-200 p-[10px]">
              <div className="flex flex-col gap-[5px]">
                {paymentData.typePayment === 'Non-refundable' && (
                  <Text as="p" type="small" fontWeight="bold">
                    You have selected the Non-refundable option,
                  </Text>
                )}
                {paymentData.typePayment !== 'Non-refundable' && (
                  <Text as="p" type="small" fontWeight="bold">
                    You have selected the Refundable option,
                  </Text>
                )}
                <Text as="p" type="small" fontWeight="normal">
                  If you cancel, you’ll be charged:
                </Text>
              </div>
              <div className="mr-[20px] flex flex-row items-center gap-[10px] text-[18px] font-bold">
                {currency !== 'UAH' && <span>{currency}</span>}
                <span>
                  {paymentData.typePayment === 'Non-refundable'
                    ? totalPrice.toFixed(2)
                    : 0}
                </span>
                {currency === 'UAH' && <span>{currency}</span>}
              </div>
            </div>
            {currency !== 'UAH' && (
              <Text as="p" type="small" fontWeight="normal">
                *The price is converted to show you the approximate cost in UAH.
                Your card will be charged in € or ISK The exchange rate may
                change before you pay.
              </Text>
            )}
            <Text as="p" type="small" fontWeight="normal">
              Your card issuer may charge a foreign transaction fee.
            </Text>
          </div>
        </div>

        <div className="w-[50%] flex flex-col gap-[20px]">
          <div className="w-full flex flex-col gap-[20px] border border-gray-200 shadow rounded-lg p-[15px]">
            <Text as="p" type="small" fontWeight="bold">
              Your Booking Details
            </Text>
            <div className="relative flex flex-row items-center justify-between">
              <div className="flex flex-col gap-[5px]">
                <Text as="p" type="small" fontWeight="bold">
                  Your stay conditions:
                </Text>
                <Text as="p" type="small" fontWeight="normal">
                  {text03}
                </Text>
              </div>
              <button
                onClick={() => {
                  setChangeConditions(!changeConditions);
                }}
              >
                <Text as="p" type="small" fontWeight="normal">
                  Change conditions
                </Text>
              </button>
              {changeConditions && (
                <div className="w-[50%] absolute top-[50px] right-0 bg-white py-[20px] border border-gray-200 shadow rounded-lg z-10 flex flex-col gap-[20px]">
                  <CalendarPart
                    type="vertical"
                    btnText="check availability"
                    city={paymentData.location.city}
                    apartmentId={paymentData.propertyId}
                  />
                  <div
                    className="px-[20px]"
                    style={{
                      display: isAvailable === 'none' ? 'none' : 'block',
                    }}
                  >
                    {isAvailable === 'false' && (
                      <Text
                        as="span"
                        type="small"
                        lineHeight="none"
                        fontWeight="normal"
                        className="text-red-600"
                      >
                        Unfortunately, it is not possible to book an apartment
                        based on the selected criteria. Please try choosing
                        different criteria or another apartment.
                      </Text>
                    )}
                    {isAvailable === 'true' && (
                      <Text
                        as="span"
                        type="small"
                        lineHeight="none"
                        fontWeight="normal"
                        className="text-green-600"
                      >
                        This apartment can be booked and meets the selected
                        criteria for accommodation.
                      </Text>
                    )}
                  </div>
                </div>
              )}
            </div>
            <div className="flex flex-row items-stretch justify-center gap-[70px]">
              <div className="flex flex-col items-center gap-[5px]">
                <Text as="p" type="small" fontWeight="normal">
                  Check-in
                </Text>
                <Text as="p" type="small" fontWeight="normal">
                  {conditions.dateFrom}
                </Text>
                <Text as="p" type="small" fontWeight="light">
                  16:00 - 19:00
                </Text>
              </div>
              <div className="w-[1px] bg-gray-300 self-stretch" />
              <div className="flex flex-col items-center gap-[5px]">
                <Text as="p" type="small" fontWeight="normal">
                  Check-out
                </Text>
                <Text as="p" type="small" fontWeight="normal">
                  {conditions.dateTo}
                </Text>
                <Text as="p" type="small" fontWeight="light">
                  10:00 - 12-00
                </Text>
              </div>
            </div>
            <Text as="p" type="small" fontWeight="bold">
              {paymentData.propertyName}
            </Text>
            <div className="flex flex-row items-center justify-between">
              <div
                className="w-[50%] h-[180px] bg-center bg-cover bg-no-repeat bg-white rounded-lg border border-gray-200 shadow"
                style={{ backgroundImage: `url(${paymentData.propertyImg})` }}
              />
              <div className="w-[45%] flex flex-col gap-[10px]">
                <div className="w-full flex flex-row items-center gap-[10px]">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, index) =>
                      index < paymentData.ranking ? (
                        <FaStar
                          key={index}
                          size={16}
                          className="text-[var(--accent)]"
                        />
                      ) : (
                        <FaRegStar
                          key={index}
                          size={16}
                          className="text-gray-300"
                        />
                      )
                    )}
                  </div>
                  <p className="text-gray-600 mt-[4px] text-xl font-medium">
                    {paymentData.ranking}
                  </p>
                  <Text
                    type="small"
                    fontWeight="light"
                    className="text-gray-400 mt-[4px]"
                  >
                    ({paymentData.usersFeedback?.length} reviews)
                  </Text>
                </div>
                <Text as="p" type="small" fontWeight="normal">
                  {generateAddressText(paymentData.location)}
                </Text>
                <div className="flex flex-col gap-[10px]">
                  {getRandomServices(paymentData.servicesList || []).map(
                    service => (
                      <div
                        key={service.name}
                        className="flex flex-row items-center gap-[10px]"
                      >
                        <img
                          src={service.icon.src}
                          alt={service.name}
                          className="w-5 h-5"
                        />
                        <Text type="small" fontWeight="light">
                          {service.name}
                        </Text>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-span-full flex justify-center">
        <Button
          text="Proceed to Payment"
          btnClass="btnDark"
          onClick={() => proceedToPayment()}
          disabled={isAvailable !== 'true'}
        />
      </div>
    </div>
  );
};

export default YourSelection;
