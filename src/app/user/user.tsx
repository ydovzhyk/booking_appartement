'use client';

export const dynamic = 'force-dynamic';

import { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../utils/helpers/hooks';
import TextField from '../../components/shared/text-field/text-field';
import { fields } from '../../components/shared/text-field/fields';
import Button from '../../components/shared/button/button';
import FormInputFile from '../../components/shared/form-input-file/form-input-file';
import SelectField from '../../components/shared/select-field/select-field';
import { IAuthUserData } from '@/types/auth/auth';
import { getUser } from '@/redux/auth/auth-selectors';
import Image from 'next/image';
import Text from '@/components/shared/text/text';
import VerifyWindow from './verify-window/verify-window';
import { updateUserInfo } from '@/redux/auth/auth-operations';
import { MdOutlineVerifiedUser } from 'react-icons/md';
import { Tooltip } from 'react-tooltip';

const UserPageComponent = () => {
  const dispatch = useAppDispatch();
  const user = useSelector(getUser);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState<
    string | ArrayBuffer | null
  >(null);

  const sexTypes = [
    { label: 'Male', value: 'male' },
    { label: 'Female', value: 'female' },
  ];

  const countries = [
    {
      label: 'Ukraine',
      value: 'Ukraine',
      flag: 'https://flagcdn.com/w40/ua.png',
    },
    { label: 'USA', value: 'USA', flag: 'https://flagcdn.com/w40/us.png' },
    {
      label: 'Canada',
      value: 'Canada',
      flag: 'https://flagcdn.com/w40/ca.png',
    },
    {
      label: 'Germany',
      value: 'Germany',
      flag: 'https://flagcdn.com/w40/de.png',
    },
    {
      label: 'United Kingdom',
      value: 'United Kingdom',
      flag: 'https://flagcdn.com/w40/gb.png',
    },
    {
      label: 'France',
      value: 'France',
      flag: 'https://flagcdn.com/w40/fr.png',
    },
    { label: 'Italy', value: 'Italy', flag: 'https://flagcdn.com/w40/it.png' },
    { label: 'Spain', value: 'Spain', flag: 'https://flagcdn.com/w40/es.png' },
    {
      label: 'Netherlands',
      value: 'Netherlands',
      flag: 'https://flagcdn.com/w40/nl.png',
    },
    {
      label: 'Sweden',
      value: 'Sweden',
      flag: 'https://flagcdn.com/w40/se.png',
    },
    {
      label: 'Norway',
      value: 'Norway',
      flag: 'https://flagcdn.com/w40/no.png',
    },
    {
      label: 'Denmark',
      value: 'Denmark',
      flag: 'https://flagcdn.com/w40/dk.png',
    },
    {
      label: 'Finland',
      value: 'Finland',
      flag: 'https://flagcdn.com/w40/fi.png',
    },
    {
      label: 'Poland',
      value: 'Poland',
      flag: 'https://flagcdn.com/w40/pl.png',
    },
    {
      label: 'Switzerland',
      value: 'Switzerland',
      flag: 'https://flagcdn.com/w40/ch.png',
    },
    {
      label: 'Belgium',
      value: 'Belgium',
      flag: 'https://flagcdn.com/w40/be.png',
    },
    {
      label: 'Austria',
      value: 'Austria',
      flag: 'https://flagcdn.com/w40/at.png',
    },
    {
      label: 'Australia',
      value: 'Australia',
      flag: 'https://flagcdn.com/w40/au.png',
    },
    {
      label: 'New Zealand',
      value: 'New Zealand',
      flag: 'https://flagcdn.com/w40/nz.png',
    },
    { label: 'Japan', value: 'Japan', flag: 'https://flagcdn.com/w40/jp.png' },
    {
      label: 'South Korea',
      value: 'South Korea',
      flag: 'https://flagcdn.com/w40/kr.png',
    },
    { label: 'China', value: 'China', flag: 'https://flagcdn.com/w40/cn.png' },
    { label: 'India', value: 'India', flag: 'https://flagcdn.com/w40/in.png' },
    {
      label: 'Brazil',
      value: 'Brazil',
      flag: 'https://flagcdn.com/w40/br.png',
    },
    {
      label: 'Mexico',
      value: 'Mexico',
      flag: 'https://flagcdn.com/w40/mx.png',
    },
    {
      label: 'Argentina',
      value: 'Argentina',
      flag: 'https://flagcdn.com/w40/ar.png',
    },
    { label: 'Chile', value: 'Chile', flag: 'https://flagcdn.com/w40/cl.png' },
    {
      label: 'South Africa',
      value: 'South Africa',
      flag: 'https://flagcdn.com/w40/za.png',
    },
    {
      label: 'Turkey',
      value: 'Turkey',
      flag: 'https://flagcdn.com/w40/tr.png',
    },
    {
      label: 'United Arab Emirates',
      value: 'United Arab Emirates',
      flag: 'https://flagcdn.com/w40/ae.png',
    },
    {
      label: 'Saudi Arabia',
      value: 'Saudi Arabia',
      flag: 'https://flagcdn.com/w40/sa.png',
    },
    {
      label: 'Thailand',
      value: 'Thailand',
      flag: 'https://flagcdn.com/w40/th.png',
    },
    {
      label: 'Indonesia',
      value: 'Indonesia',
      flag: 'https://flagcdn.com/w40/id.png',
    },
    {
      label: 'Malaysia',
      value: 'Malaysia',
      flag: 'https://flagcdn.com/w40/my.png',
    },
    {
      label: 'Singapore',
      value: 'Singapore',
      flag: 'https://flagcdn.com/w40/sg.png',
    },
    {
      label: 'Vietnam',
      value: 'Vietnam',
      flag: 'https://flagcdn.com/w40/vn.png',
    },
    {
      label: 'Portugal',
      value: 'Portugal',
      flag: 'https://flagcdn.com/w40/pt.png',
    },
    {
      label: 'Greece',
      value: 'Greece',
      flag: 'https://flagcdn.com/w40/gr.png',
    },
    {
      label: 'Ireland',
      value: 'Ireland',
      flag: 'https://flagcdn.com/w40/ie.png',
    },
    {
      label: 'Czech Republic',
      value: 'Czech Republic',
      flag: 'https://flagcdn.com/w40/cz.png',
    },
  ];

  const { control, register, handleSubmit, reset } = useForm<IAuthUserData>({
    defaultValues: {
      username: user.username || '',
      userAvatar: user.userAvatar || '',
      surname: user.surname || '',
      country: user.country || '',
      city: user.city || '',
      address: user.address || '',
      phone: user.phone || '',
      verified: user.verified || false,
      sex: user.sex || '',
      aboutUser: user.aboutUser || '',
    },
  });

  useEffect(() => {
    reset({
      username: user?.username || '',
      userAvatar: user?.userAvatar || '',
      surname: user?.surname || '',
      country: user?.country || '',
      city: user?.city || '',
      address: user?.address || '',
      phone: user?.phone || '',
      verified: user?.verified || false,
      sex: user?.sex || '',
      aboutUser: user?.aboutUser || '',
    });
  }, [user, reset]);

  const onSubmit = async (data: IAuthUserData) => {
    const userInfo = {
      username: data.username ? data.username : (user.username ?? ''),
      surname: data.surname ? data.surname : (user.surname ?? ''),
      country: data.country ? data.country : (user.country ?? ''),
      city: data.city ? data.city : (user.city ?? ''),
      address: data.address ? data.address : (user.address ?? ''),
      phone: data.phone ? data.phone : (user.phone ?? ''),
      sex: data.sex ? data.sex : (user.sex ?? ''),
      userAvatar: selectedAvatar
        ? (selectedAvatar as string)
        : (user.userAvatar ?? ''),
      aboutUser: data.aboutUser ? data.aboutUser : (user.aboutUser ?? ''),
      email: user.email ?? '',
      password: '',
    };

    dispatch(updateUserInfo(userInfo));
    setSelectedAvatar(null);
    reset();
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const img = document.createElement('img');
      img.src = reader.result as string;

      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        if (!ctx) return;

        const newSize = 200;
        canvas.width = newSize;
        canvas.height = newSize;

        ctx.drawImage(img, 0, 0, newSize, newSize);
        const resizedDataURL = canvas.toDataURL('image/jpeg', 0.8);
        setSelectedAvatar(resizedDataURL);

        // canvas.toBlob(
        //   blob => {
        //     if (blob) {
        //       const fileResized = new File([blob], file.name, {
        //         type: 'image/jpeg',
        //       });
        //       setFile(fileResized);
        //     }
        //   },
        //   'image/jpeg',
        //   0.8
        // );
      };
    };

    reader.readAsDataURL(file);
  };

  const handleVerify = () => {
    setIsModalOpen(true);
  };

  return (
    <section className="section flex flex-col gap-[40px]">
      <div className="w-full flex flex-row justify-between regular-border py-[25px] px-[35px] bg-[var(--accent-background)]">
        <div className="h-full flex flex-row gap-[30px]">
          <div className="flex flex-row items-center justify-center">
            <div className="flex flex-row items-center justify-between gap-[10px] w-[70px] h-[70px] bg-white rounded-full regular-border">
              {typeof user.userAvatar === 'string' &&
                user.userAvatar.trim() !== '' && (
                  <Image
                    src={
                      typeof selectedAvatar === 'string'
                        ? selectedAvatar
                        : user.userAvatar
                    }
                    alt="Userphoto"
                    width={70}
                    height={70}
                    className="rounded-full"
                  />
                )}
            </div>
          </div>
          <div className="flex flex-col items-center gap-[10px]">
            <Text
              type="regular"
              as="span"
              fontWeight="light"
              className="text-white"
            >
              Change profile photo
            </Text>
            <FormInputFile
              name="photo"
              accept="image/png, image/jpeg"
              register={register}
              onChange={handleFileUpload}
              multiple={false}
              label={'Upload photo'}
            />
          </div>
        </div>
        <div className="flex flex-col items-center gap-[10px]">
          <div className="flex flex-row items-center gap-[10px]">
            {!user.verified && (
              <Text
                type="regular"
                as="span"
                fontWeight="light"
                className="text-white"
              >
                Verify email:
              </Text>
            )}
            <Text
              type="regular"
              as="span"
              fontWeight="normal"
              className="text-white"
            >
              {`${user.email}`}
            </Text>
            {user.verified && (
              <>
                <MdOutlineVerifiedUser
                  size={24}
                  color="#66ff00"
                  data-tooltip-id="verified-tooltip"
                />
                <Tooltip
                  id="verified-tooltip"
                  place="top"
                  style={{
                    transform: 'translateY(-25px)',
                    backgroundColor: '#0f1d2d',
                    borderRadius: '5px',
                  }}
                >
                  <Text
                    type="small"
                    as="span"
                    fontWeight="light"
                    className="text-white"
                  >
                    User verified
                  </Text>
                </Tooltip>
              </>
            )}
          </div>
          <Button
            text={user.verified ? 'Re-verify' : 'Verify'}
            btnClass="btnLight"
            textColor="text-white"
            onClick={handleVerify}
          />
        </div>
      </div>

      <Text as="h1" fontWeight="bold">
        Update your information
      </Text>

      <form
        className="w-full grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-20 gap-y-0 justify-center py-[40px] px-[35px] regular-border"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* Username */}
        <Controller
          control={control}
          name="username"
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
          name="surname"
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
          name="phone"
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
          name="country"
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
          name="city"
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
          name="address"
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

        {/* Sex */}
        <Controller
          control={control}
          name="sex"
          render={({ field: { onChange, value } }) => {
            const selectedSex = sexTypes.find(s => s.value === value) || null;
            return (
              <div className="w-full">
                <SelectField
                  name="sex"
                  value={selectedSex}
                  width="100%"
                  topPlaceholder={false}
                  textAlign="left"
                  handleChange={selectedOption =>
                    onChange(selectedOption ? selectedOption.value : '')
                  }
                  placeholder="Select Sex"
                  required
                  options={sexTypes}
                />
              </div>
            );
          }}
        />

        {/* About */}
        <Controller
          control={control}
          name="aboutUser"
          rules={{
            maxLength: {
              value: 500,
              message: 'Maximum 500 characters allowed',
            },
          }}
          render={({ field: { onChange, value }, fieldState }) => (
            <div className="flex flex-col gap-[10px] col-span-full mt-[40px] mb-[30px]">
              <label htmlFor="aboutUser">
                <Text type="regular" as="span" fontWeight="normal">
                  Leave a short review about yourself
                </Text>
              </label>
              <div className="relative">
                <textarea
                  id="aboutUser"
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
      </form>
      {isModalOpen && <VerifyWindow onClose={() => setIsModalOpen(false)} />}
    </section>
  );
};

export default UserPageComponent;
