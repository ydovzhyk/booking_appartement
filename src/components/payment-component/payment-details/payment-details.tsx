'use client';
import { useState } from 'react';
import useSocket from '@/hooks/useSocket';
import { useRouter } from 'next/navigation';
import Button from '@/components/shared/button/button';
import SelectField from '@/components/shared/select-field/select-field';
import { fields } from '@/components/shared/text-field/fields';
import TextField from '@/components/shared/text-field/text-field';
import Text from '@/components/shared/text/text';
import { getUser } from '@/redux/auth/auth-selectors';
import { getSearchConditions } from '@/redux/search/search-selectors';
import { setPaymentStage } from '@/redux/technical/technical-slice';
import { getInfoUserId, getPaymentData } from '@/redux/technical/technical-selectors';
import { Controller, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { IOrder } from '../../../types/order/order';
import { useAppDispatch } from '../../../utils/helpers/hooks';
import { countries } from '@/data/countries';
import { BsBank } from 'react-icons/bs';
import { SlPaypal } from 'react-icons/sl';
import { BsCreditCard2BackFill } from 'react-icons/bs';
import { arrivalTimes } from './arrivalTimes';
import { setTechnicalError } from '@/redux/technical/technical-slice';
import { SiVisa } from 'react-icons/si';
import { FaCcMastercard } from 'react-icons/fa';

const PaymentDetails = () => {
  const dispatch = useAppDispatch();
  const { checkChat, createChat, sendMessage } = useSocket();
  const router = useRouter();
  const searchConditions = useSelector(getSearchConditions);
  const client = useSelector(getUser);
  const paymentData = useSelector(getPaymentData);
  const infoUserId = useSelector(getInfoUserId);
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const [isFilled, setIsFilled] = useState(false);

  const {
    control,
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<IOrder>({
    mode: 'onTouched',
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
        arrivalTime: String('4:00 PM'),
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
            email: String(client.email || ''),
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

    const getCardType = (
      cardNumber: string
    ): 'visa' | 'mastercard' | 'unknown' => {
      const cleaned = cardNumber.replace(/\s/g, '');
      if (/^4\d{0,15}$/.test(cleaned)) return 'visa';
      if (
        /^5[1-5]\d{0,14}$/.test(cleaned) || // MasterCard old range
        /^2(2[2-9]\d{0,13}|[3-6]\d{0,14}|7[01]\d{0,13}|720\d{0,12})$/.test(
          cleaned
        ) // New 2221–2720 range
      ) {
        return 'mastercard';
      }
      return 'unknown';
    };

  const cardNumber = watch('paymentData.paymentMethod.creditCard.cardNumber');
  const rawDigits = cardNumber?.replace(/\s/g, '') || '';
  const cardType = rawDigits.length >= 4 ? getCardType(cardNumber) : 'unknown';

  const cardIcon =
    cardType === 'visa' ? (
      <SiVisa size={35} />
    ) : cardType === 'mastercard' ? (
      <FaCcMastercard size={32} />
    ) : null;


  const onSubmit = (data: IOrder, event?: React.BaseSyntheticEvent) => {
    event?.preventDefault();

    if (!isFilled) {
      dispatch(setTechnicalError('Please select a payment method'));
      return;
    }

    const clientId = client._id;
    const ownerId = paymentData?.owner?.id ?? null;
    const apartmentId = paymentData?.propertyId ?? null;

    // Перевіряємо, щоб усі ID були валідні рядки
    if (!clientId || !ownerId || !infoUserId || !apartmentId) {
      dispatch(
        setTechnicalError('Some user or property information is missing.')
      );
      return;
    }

    const clientText = `📩 Your order was received!\nCheck-in: ${data.clientData.arrivalTime}\nCountry: ${data.clientData.country}`;
    const ownerText = `💼 New booking from ${data.clientData.firstName}!\nCheck-in: ${data.clientData.arrivalTime}`;

    const handleMessageSend = (fromId: string, toId: string, text: string) => {
      checkChat(fromId, toId, apartmentId, (err, response) => {
        if (response?.chatId) {
          sendMessage(fromId, response.chatId, text, () => {});
        } else {
          createChat(fromId, toId, apartmentId, (err, response) => {
            if (response?.chatId) {
              sendMessage(fromId, response.chatId, text, () => {});
            }
          });
        }
      });
    };

    // Надсилаємо повідомлення клієнту
    handleMessageSend(infoUserId, clientId, clientText);

    // Надсилаємо повідомлення овнеру
    handleMessageSend(infoUserId, ownerId, ownerText);

    data.orderCriteria = searchConditions;
    console.log('Form submitted:', data);
    // dispatch(setPaymentStage('stage-3'));
    // router.push('/payment/stage-3');
  };


  // Luhn algorithm — перевірка валідності картки
  const isValidCardNumber = (cardNumber: string): boolean => {
    const digits = cardNumber.replace(/\s/g, '');
    if (digits.length !== 16 || !/^\d+$/.test(digits)) return false;

    let sum = 0;
    for (let i = 0; i < 16; i++) {
      let digit = parseInt(digits.charAt(15 - i), 10);
      if (i % 2 === 1) {
        digit *= 2;
        if (digit > 9) digit -= 9;
      }
      sum += digit;
    }

    return sum % 10 === 0;
  };

  // Форматування номера картки
  const formatCardNumber = (value: string): string => {
    const digitsOnly = value.replace(/\D/g, '').slice(0, 16);
    return digitsOnly.replace(/(.{4})/g, '$1 ').trim();
  };

  const formatExpiryDate = (value: string): string => {
    const digits = value.replace(/\D/g, '').slice(0, 4);
    if (digits.length < 3) return digits;
    return digits.slice(0, 2) + '/' + digits.slice(2);
  };

  // Перевірка дати на валідність MM/YY + не в минулому
  const isValidExpiryDate = (date: string): boolean => {
    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(date)) return false;

    const [month, year] = date.split('/').map(Number);
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear() % 100;
    const currentMonth = currentDate.getMonth() + 1;

    return (
      year > currentYear || (year === currentYear && month >= currentMonth)
    );
  };

  // Перевірка CVV (3 або 4 цифри)
  const isValidCVV = (cvv: string): boolean => {
    return /^\d{3,4}$/.test(cvv);
  };

  // Перевірка імені власника
  const isValidCardHolder = (name: string): boolean => {
    return /^[A-Za-z\s]{2,50}$/.test(name.trim());
  };

  return (
    <section className="w-full flex flex-col justify-between gap-[40px]">
      <Text type="regular" as="h2" fontWeight="bold" className="inline">
        Payment details:
      </Text>
      <form
        className="w-full flex flex-col justify-between gap-[40px]"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="w-full flex flex-row justify-between gap-[40px] items-start">
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
                  name="clientData.email"
                  rules={{
                    required: 'Email is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Invalid email address',
                    },
                  }}
                  render={({ field: { onChange, value }, fieldState }) => (
                    <TextField
                      value={value}
                      handleChange={onChange}
                      error={fieldState.error}
                      {...fields.email}
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

                {/* Arrival Time */}
                <Controller
                  control={control}
                  name="clientData.arrivalTime"
                  render={({ field: { onChange, value } }) => {
                    const selectedTime =
                      arrivalTimes.find(t => t.value === value) || null;
                    return (
                      <div className="flex flex-col gap-[10px] col-span-full mt-[10px] mb-[30px]">
                        <Text as="p" type="small" fontWeight="bold">
                          Your Arrival Time
                        </Text>
                        <Text type="regular" as="span" fontWeight="normal">
                          Your room will be ready for check-in at 4:00 PM.
                        </Text>
                        <div className="w-full grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-x-20 gap-y-0 justify-center">
                          <SelectField
                            name="arrivalTime"
                            value={selectedTime}
                            topPlaceholder={false}
                            width="100%"
                            textAlign="left"
                            handleChange={selectedOption =>
                              onChange(
                                selectedOption ? selectedOption.value : ''
                              )
                            }
                            placeholder="Select Arrival Time"
                            required
                            options={arrivalTimes}
                          />
                        </div>
                      </div>
                    );
                  }}
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
                    <div className="flex flex-col gap-[10px] col-span-full mt-[10px]">
                      <label
                        htmlFor="specialRequests"
                        className="flex flex-col gap-[20px]"
                      >
                        <Text as="p" type="small" fontWeight="bold">
                          Special Reguests
                        </Text>
                        <Text type="regular" as="span" fontWeight="normal">
                          Special requests cannot be guaranteed – but the
                          property will do its best to meet your needs. You can
                          always make a special request after your booking is
                          complete!
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
                          <div className="absolute top-[60px] left-0 w-full">
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
                  {[
                    'Credit / Debit Card',
                    'PayPal Express',
                    'Bank Transfer',
                  ].map(method => (
                    <button
                      key={method}
                      type="button"
                      onClick={() => {
                        setSelectedMethod(prev =>
                          prev === method ? null : method
                        );
                        setIsFilled(true);
                      }}
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
                  ))}

                  {selectedMethod === 'Credit / Debit Card' && (
                    <div className="flex flex-col gap-[5px] mt-[20px] mb-[-40px]">
                      <Controller
                        control={control}
                        name="paymentData.paymentMethod.creditCard.cardNumber"
                        rules={{
                          required: 'Card number is required',
                          validate: value => {
                            const digits = value.replace(/\s/g, '');
                            if (digits.length < 16) return true;
                            const valid = isValidCardNumber(value);
                            return valid || 'Invalid card number';
                          },
                        }}
                        render={({ field, fieldState }) => (
                          <TextField
                            value={field.value}
                            handleChange={e => {
                              const formatted = formatCardNumber(
                                e.target.value
                              );
                              field.onChange(formatted);
                            }}
                            error={fieldState.error}
                            placeholder="Card Number"
                            autoComplete="off"
                            icon={cardIcon}
                          />
                        )}
                      />

                      <div className="flex flex-col md:flex-row gap-[5px]">
                        <Controller
                          control={control}
                          name="paymentData.paymentMethod.creditCard.expirationDate"
                          rules={{
                            required: 'Expiration date is required',
                            validate: value =>
                              isValidExpiryDate(value) ||
                              'Invalid expiration date',
                          }}
                          render={({ field, fieldState }) => (
                            <TextField
                              value={field.value}
                              handleChange={e =>
                                field.onChange(formatExpiryDate(e.target.value))
                              }
                              error={fieldState.error}
                              placeholder="MM/YY"
                              autoComplete="off"
                            />
                          )}
                        />
                        <Controller
                          control={control}
                          name="paymentData.paymentMethod.creditCard.cvv"
                          rules={{
                            required: 'CVV is required',
                            validate: value =>
                              isValidCVV(value) || 'Invalid CVV',
                          }}
                          render={({ field, fieldState }) => (
                            <TextField
                              value={field.value}
                              handleChange={e => {
                                const input = e.target.value
                                  .replace(/\D/g, '')
                                  .slice(0, 4);
                                field.onChange(input);
                              }}
                              error={fieldState.error}
                              placeholder="CVV"
                              autoComplete="off"
                            />
                          )}
                        />
                      </div>
                      <Controller
                        control={control}
                        name="paymentData.paymentMethod.creditCard.cardHolder"
                        rules={{
                          required: 'Cardholder name is required',
                          validate: value =>
                            isValidCardHolder(value) ||
                            'Invalid name (only letters and spaces)',
                        }}
                        render={({ field, fieldState }) => (
                          <TextField
                            value={field.value}
                            handleChange={field.onChange}
                            error={fieldState.error}
                            placeholder="Name on Card"
                            autoComplete="off"
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
                            autoComplete="off"
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
                            autoComplete="off"
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
                            autoComplete="off"
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
                            autoComplete="off"
                          />
                        )}
                      />
                    </div>
                  )}

                  {/* Special Requests */}
                  <Controller
                    control={control}
                    name="paymentData.paymentComment"
                    rules={{
                      maxLength: {
                        value: 500,
                        message: 'Maximum 500 characters allowed',
                      },
                    }}
                    render={({ field: { onChange, value }, fieldState }) => (
                      <div className="flex flex-col gap-[10px] col-span-full mt-[10px]">
                        <label
                          htmlFor="paymentComment"
                          className="flex flex-col gap-[20px]"
                        >
                          <Text type="regular" as="span" fontWeight="normal">
                            You can provide a comment for the payment.
                          </Text>
                        </label>
                        <div className="relative">
                          <textarea
                            id="paymentComment"
                            value={value}
                            onChange={onChange}
                            rows={3}
                            className="w-full regular-border outline-none p-[10px]"
                          />
                          {fieldState.error && (
                            <div className="absolute top-[60px] left-0 w-full">
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
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-full flex justify-center">
          <Button text="Proceed to Payment" btnClass="btnDark" width='200px'/>
        </div>
      </form>
    </section>
  );
};

export default PaymentDetails;
