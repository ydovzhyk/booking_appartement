'use client';
import { useState } from 'react';
import Button from '@/components/shared/button/button';
import SelectField from '@/components/shared/select-field/select-field';
import Image from 'next/image';
import { fields } from '@/components/shared/text-field/fields';
import TextField from '@/components/shared/text-field/text-field';
import Text from '@/components/shared/text/text';
import { getUser } from '@/redux/auth/auth-selectors';
import { getSearchConditions } from '@/redux/search/search-selectors';
import { Controller, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { IOrder } from '../../../types/order/order';
import { useAppDispatch } from '../../../utils/helpers/hooks';
import { countries } from '@/data/countries';
import { BsBank } from 'react-icons/bs';
import { SlPaypal } from 'react-icons/sl';
import { BsCreditCard2BackFill } from 'react-icons/bs';

const PaymentDetails = () => {
  const dispatch = useAppDispatch();
  const searchConditions = useSelector(getSearchConditions);
  const client = useSelector(getUser);
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);

  const { control, register, handleSubmit, reset, watch } = useForm<IOrder>({
    defaultValues: {
      clientData: {
        clientId: String(client._id || ''),
        firstName: String(client.username || ''),
        lastName: String(client.surname || ''),
        email: String(client.email || ''),
        phone: String(client.phone || ''),
        address: String(client.address || ''),
        city: String(client.city || ''),
        country: String(client.country || ''),
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

  const onSubmit = (data: IOrder) => {
    console.log('Form submitted:', data);
  };

  return (
    <div className="w-full flex flex-col justify-between gap-[40px]">
      <Text type="regular" as="h2" fontWeight="bold" className="inline">
        Payment details:
      </Text>
      <form
        className="w-full flex flex-row justify-between gap-[20px] items-start"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="w-[50%] flex flex-col gap-[20px]">
          <div className="w-full flex flex-col gap-[20px] bg-gray-200 border border-gray-200 shadow rounded-lg p-[15px]">
            <Text as="p" type="small" fontWeight="bold">
              Enter Your Details
            </Text>
            <div className="w-full grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-x-20 gap-y-0 justify-center py-[40px] px-[35px] regular-border">
              {/* Username */}
              <Controller
                control={control}
                name="clientData.firstName"
                rules={{
                  required: 'User name is required',
                  minLength: {
                    value: 2,
                    message: 'Name must have at least 2 characters',
                  },
                  maxLength: {
                    value: 15,
                    message: 'Name must have no more than 15 characters',
                  },
                }}
                render={({ field: { onChange, value }, fieldState }) => (
                  <TextField
                    value={value}
                    handleChange={onChange}
                    error={fieldState.error}
                    autoComplete="off"
                    {...fields.username}
                  />
                )}
              />

              {/* Surname */}
              <Controller
                control={control}
                name="clientData.lastName"
                rules={{
                  required: 'Surname is required',
                  minLength: {
                    value: 2,
                    message: 'Surname must have at least 2 characters',
                  },
                  maxLength: {
                    value: 50,
                    message: 'Surname must have no more than 50 characters',
                  },
                }}
                render={({ field: { onChange, value }, fieldState }) => (
                  <TextField
                    value={value}
                    handleChange={onChange}
                    error={fieldState.error}
                    autoComplete="surname"
                    {...fields.surname}
                  />
                )}
              />

              {/* Phone */}
              <Controller
                control={control}
                name="clientData.phone"
                rules={{
                  required: 'Phone number is required',
                  pattern: {
                    value: /^\+?[1-9]\d{1,14}$/,
                    message: 'Invalid phone number format',
                  },
                }}
                render={({ field: { onChange, value }, fieldState }) => (
                  <TextField
                    value={value}
                    handleChange={onChange}
                    error={fieldState.error}
                    autoComplete="phone"
                    {...fields.phone}
                  />
                )}
              />

              {/* Country */}
              <Controller
                control={control}
                name="clientData.country"
                render={({ field: { onChange, value } }) => {
                  const selectedCountry =
                    countries.find(c => c.value === value) || null;
                  return (
                    <SelectField
                      name="country"
                      value={selectedCountry}
                      topPlaceholder={false}
                      width="100%"
                      textAlign="left"
                      handleChange={selectedOption =>
                        onChange(selectedOption ? selectedOption.value : '')
                      }
                      placeholder="Select Country"
                      required
                      options={countries}
                    />
                  );
                }}
              />

              {/* City */}
              <Controller
                control={control}
                name="clientData.city"
                rules={{
                  required: 'City is required',
                  minLength: {
                    value: 2,
                    message: 'City must have at least 2 characters',
                  },
                  maxLength: {
                    value: 50,
                    message: 'City must have no more than 50 characters',
                  },
                }}
                render={({ field: { onChange, value }, fieldState }) => (
                  <TextField
                    value={value}
                    handleChange={onChange}
                    error={fieldState.error}
                    autoComplete="city"
                    {...fields.city}
                  />
                )}
              />

              {/* Address */}
              <Controller
                control={control}
                name="clientData.address"
                rules={{
                  required: 'Address is required',
                  minLength: {
                    value: 2,
                    message: 'Address must have at least 2 characters',
                  },
                  maxLength: {
                    value: 50,
                    message: 'Address must have no more than 50 characters',
                  },
                }}
                render={({ field: { onChange, value }, fieldState }) => (
                  <TextField
                    value={value}
                    handleChange={onChange}
                    error={fieldState.error}
                    autoComplete="address"
                    {...fields.address}
                  />
                )}
              />

              {/* Special Requests */}
              <Controller
                control={control}
                name="clientData.specialRequests"
                rules={{
                  maxLength: {
                    value: 500,
                    message: 'Maximum 500 characters allowed',
                  },
                }}
                render={({ field: { onChange, value }, fieldState }) => (
                  <div className="flex flex-col gap-[10px] col-span-full mt-[10px] mb-[30px]">
                    <label
                      htmlFor="specialRequests"
                      className="flex flex-col gap-[20px]"
                    >
                      <Text as="p" type="small" fontWeight="bold">
                        Special Reguests
                      </Text>
                      <Text type="regular" as="span" fontWeight="normal">
                        Special requests cannot be guaranteed – but the property
                        will do its best to meet your needs. You can always make
                        a special request after your booking is complete!
                      </Text>
                      <Text type="regular" as="span" fontWeight="light">
                        Please write your request in English.
                      </Text>
                    </label>
                    <div className="relative">
                      <textarea
                        id="specialRequests"
                        value={value}
                        onChange={onChange}
                        rows={3}
                        className="w-full regular-border outline-none p-[10px]"
                      />
                      {fieldState.error && (
                        <div className="absolute top-[78px] left-0 w-full">
                          <Text
                            type="extraSmall"
                            as="span"
                            fontWeight="normal"
                            className="absolute top-10 text-red-500"
                          >
                            {`*${fieldState.error.message}`}
                          </Text>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              />

              {/* Submit Button */}
              <div className="col-span-full flex justify-center">
                <Button text="Update" btnClass="btnDark" />
              </div>
            </div>
          </div>
        </div>

        <div className="w-[50%] flex flex-col gap-[20px]">
          <div className="w-full flex flex-col gap-[20px] bg-gray-200 border border-gray-200 shadow rounded-lg p-[15px]">
            <Text as="p" type="small" fontWeight="bold">
              Payment Method
            </Text>
            <div className="w-full gap-x-20 gap-y-0 justify-center py-[40px] px-[35px] regular-border">
              <div className="w-full flex flex-col gap-[40px]">
                {['Credit / Debit Card', 'PayPal Express', 'Bank Transfer'].map(
                  method => (
                    <button
                      key={method}
                      type="button"
                      onClick={() =>
                        setSelectedMethod(prev =>
                          prev === method ? null : method
                        )
                      }
                      className={`flex items-center justify-between px-[20px] py-[10px] rounded-lg border transition ${
                        selectedMethod === method
                          ? 'border-[var(--accent-background)] bg-white'
                          : 'border-gray-300 bg-gray-100'
                      }`}
                    >
                      <div className="flex flex-row items-center gap-[20px]">
                        <div className="flex items-center justify-center">
                          {method === 'Bank Transfer' && <BsBank size={20} />}
                          {method === 'PayPal Express' && (
                            <SlPaypal size={20} />
                          )}
                          {method === 'Credit / Debit Card' && (
                            <BsCreditCard2BackFill size={20} />
                          )}
                        </div>
                        <div className="flex flex-row items-center justify-center">
                          <Text
                            type="small"
                            as="p"
                            fontWeight="normal"
                            className="text-left mt-[5px]"
                          >
                            {method}
                          </Text>
                        </div>
                      </div>

                      {selectedMethod === method && (
                        <span className="text-[var(--accent-background)] font-bold">
                          ✓
                        </span>
                      )}
                    </button>
                  )
                )}

                {selectedMethod === 'Credit / Debit Card' && (
                  <div className="flex flex-col gap-[5px] mt-[20px] mb-[-40px]">
                    <Controller
                      control={control}
                      name="paymentData.paymentMethod.creditCard.cardNumber"
                      render={({ field, fieldState }) => (
                        <TextField
                          value={field.value}
                          handleChange={field.onChange}
                          error={fieldState.error}
                          placeholder="Card Number"
                        />
                      )}
                    />
                    <div className="flex flex-col md:flex-row gap-[5px]">
                      <Controller
                        control={control}
                        name="paymentData.paymentMethod.creditCard.expirationDate"
                        render={({ field, fieldState }) => (
                          <TextField
                            value={field.value}
                            handleChange={field.onChange}
                            error={fieldState.error}
                            placeholder="Expiry Date (MM/YY)"
                          />
                        )}
                      />
                      <Controller
                        control={control}
                        name="paymentData.paymentMethod.creditCard.cvv"
                        render={({ field, fieldState }) => (
                          <TextField
                            value={field.value}
                            handleChange={field.onChange}
                            error={fieldState.error}
                            placeholder="CVV"
                          />
                        )}
                      />
                    </div>
                    <Controller
                      control={control}
                      name="paymentData.paymentMethod.creditCard.cardHolder"
                      render={({ field, fieldState }) => (
                        <TextField
                          value={field.value}
                          handleChange={field.onChange}
                          error={fieldState.error}
                          placeholder="Name on Card"
                        />
                      )}
                    />
                  </div>
                )}

                {selectedMethod === 'PayPal Express' && (
                  <div className="mt-[20px] mb-[-40px]">
                    <Controller
                      control={control}
                      name="paymentData.paymentMethod.payPalExpress.email"
                      render={({ field, fieldState }) => (
                        <TextField
                          value={field.value}
                          handleChange={field.onChange}
                          error={fieldState.error}
                          placeholder="PayPal Email"
                        />
                      )}
                    />
                  </div>
                )}

                {selectedMethod === 'Bank Transfer' && (
                  <div className="flex flex-col gap-[5px] mt-[20px] mb-[-40px]">
                    <Controller
                      control={control}
                      name="paymentData.paymentMethod.bankTransfer.accountName"
                      render={({ field, fieldState }) => (
                        <TextField
                          value={field.value}
                          handleChange={field.onChange}
                          error={fieldState.error}
                          placeholder="Account Name"
                        />
                      )}
                    />
                    <Controller
                      control={control}
                      name="paymentData.paymentMethod.bankTransfer.iban"
                      render={({ field, fieldState }) => (
                        <TextField
                          value={field.value}
                          handleChange={field.onChange}
                          error={fieldState.error}
                          placeholder="IBAN"
                        />
                      )}
                    />
                    <Controller
                      control={control}
                      name="paymentData.paymentMethod.bankTransfer.swiftCode"
                      render={({ field, fieldState }) => (
                        <TextField
                          value={field.value}
                          handleChange={field.onChange}
                          error={fieldState.error}
                          placeholder="SWIFT/BIC"
                        />
                      )}
                    />
                    <Controller
                      control={control}
                      name="paymentData.paymentMethod.bankTransfer.paymentReference"
                      render={({ field, fieldState }) => (
                        <TextField
                          value={field.value}
                          handleChange={field.onChange}
                          error={fieldState.error}
                          placeholder="Payment Reference"
                        />
                      )}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PaymentDetails;
