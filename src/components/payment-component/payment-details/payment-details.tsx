'use client';
import { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../../utils/helpers/hooks';
import TextField from '@/components/shared/text-field/text-field';
import { fields } from '@/components/shared/text-field/fields';
import Button from '@/components/shared/button/button';
import FormInputFile from '@/components/shared/form-input-file/form-input-file';
import SelectField from '@/components/shared/select-field/select-field';
import Text from '@/components/shared/text/text';
import { IOrder } from '../../../types/order/order';
import { getSearchConditions } from '@/redux/search/search-selectors';

const PaymentDetails = () => {
  const dispatch = useAppDispatch();
  const searchConditions = useSelector(getSearchConditions);


   const { control, register, handleSubmit, reset, watch } =
     useForm<IOrder>({
       defaultValues: {
         clientData: {
           clientId: '',
           firstName: '',
           lastName: '',
           email: '',
           phone: '',
           address: '',
           city: '',
           country: '',
           postalCode: '',
           specialRequests: '',
         },
         paymentData: {
           paymentComment: '',
           paymentMethod: {
             creditCard: {
               cardNumber: '',
               cardHolder: '',
               expirationDate: '',
               cvv: '',
             },
             payPalExpress: {
               email: '',
             },
             bankTransfer: {
               accountName: '',
               accountNumber: '',
               iban: '',
               swiftCode: '',
               paymentReference: '',
             },
           },
         },
       },
     });

  return (
    <div className="w-full flex flex-col justify-between gap-[40px] test-border">
      <Text type="regular" as="h2" fontWeight="bold" className="inline">
        Payment details:
      </Text>
      <div className="w-full flex flex-row justify-between gap-[20px] items-start">
        <div className="w-[50%] flex flex-col gap-[20px]">
          <div className="w-full flex flex-col gap-[20px] bg-gray-200 border border-gray-200 shadow rounded-lg p-[15px]">
            <Text as="p" type="small" fontWeight="bold">
              Enter Your Details
            </Text>
          </div>
        </div>

        <div className="w-[50%] flex flex-col gap-[20px]">
          <div className="w-full flex flex-col gap-[20px] border border-gray-200 shadow rounded-lg p-[15px]">
            <Text as="p" type="small" fontWeight="bold">
              Your Booking Details
            </Text>
            <div className="relative flex flex-row items-center justify-between"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentDetails;