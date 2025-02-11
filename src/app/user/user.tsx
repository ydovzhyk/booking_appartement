'use client';
import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import TextField from '../../components/shared/text-field/text-field';
import { fields } from '../../components/shared/text-field/fields';
import Button from '../../components/shared/button/button';
import FormInputFile from '../../components/shared/form-input-file/form-input-file';
import SelectField from '../../components/shared/select-field/select-field';
import { IAuthUserData } from '@/types/auth/auth';
import { getUser } from '@/redux/auth/auth-selectors';
import Image from 'next/image';
import Text from '@/components/shared/text/text';

const UserPageComponent = () => {
  const dispatch = useDispatch();
  const user = useSelector(getUser);
  const [file, setFile] = useState<File | null>(null);
  const [isVerified, setIsVerified] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState<string | ArrayBuffer | null>(null);

  const sexTypes = [
    { label: 'Male', value: 'male' },
    { label: 'Female', value: 'female' },
  ];

  const countries = [
    { label: 'Ukraine', value: 'Ukraine' },
    { label: 'USA', value: 'USA' },
    { label: 'Canada', value: 'Canada' },
    { label: 'Germany', value: 'Germany' },
    { label: 'United Kingdom', value: 'United Kingdom' },
    { label: 'France', value: 'France' },
    { label: 'Italy', value: 'Italy' },
    { label: 'Spain', value: 'Spain' },
    { label: 'Netherlands', value: 'Netherlands' },
    { label: 'Sweden', value: 'Sweden' },
    { label: 'Norway', value: 'Norway' },
    { label: 'Denmark', value: 'Denmark' },
    { label: 'Finland', value: 'Finland' },
    { label: 'Poland', value: 'Poland' },
    { label: 'Switzerland', value: 'Switzerland' },
    { label: 'Belgium', value: 'Belgium' },
    { label: 'Austria', value: 'Austria' },
    { label: 'Australia', value: 'Australia' },
    { label: 'New Zealand', value: 'New Zealand' },
    { label: 'Japan', value: 'Japan' },
    { label: 'South Korea', value: 'South Korea' },
    { label: 'China', value: 'China' },
    { label: 'India', value: 'India' },
    { label: 'Brazil', value: 'Brazil' },
    { label: 'Mexico', value: 'Mexico' },
    { label: 'Argentina', value: 'Argentina' },
    { label: 'Chile', value: 'Chile' },
    { label: 'South Africa', value: 'South Africa' },
    { label: 'Turkey', value: 'Turkey' },
    { label: 'United Arab Emirates', value: 'United Arab Emirates' },
    { label: 'Saudi Arabia', value: 'Saudi Arabia' },
    { label: 'Thailand', value: 'Thailand' },
    { label: 'Indonesia', value: 'Indonesia' },
    { label: 'Malaysia', value: 'Malaysia' },
    { label: 'Singapore', value: 'Singapore' },
    { label: 'Vietnam', value: 'Vietnam' },
    { label: 'Portugal', value: 'Portugal' },
    { label: 'Greece', value: 'Greece' },
    { label: 'Ireland', value: 'Ireland' },
    { label: 'Czech Republic', value: 'Czech Republic' },
  ];

  const { control, register, handleSubmit, reset, setValue } =
    useForm<IAuthUserData>({
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
        about: user.about || '',
      },
    });

  const onSubmit = async (data: IAuthUserData) => {
    // const dataForUpload = new FormData();

    // dataForUpload.append('username', data.username ?? '');
    // dataForUpload.append('country', data.country ?? '');
    // dataForUpload.append('city', data.city ?? '');
    // dataForUpload.append('address', data.address ?? '');
    // dataForUpload.append('phone', data.phone ?? '');
    // dataForUpload.append('verified', isVerified);
    // dataForUpload.append('sex', data.sex ?? '');
    // dataForUpload.append('about', data.about ?? '');

    // if (selectedAvatar) {
    //   dataForUpload.append('userAvatar', selectedAvatar as string);
    // }

    const userInfo = { 'username': data.username ?? '', 'country': data.country ?? '', 'city': data.city ?? '', 'address': data.address ?? '', 'phone': data.phone ?? '', 'verified': isVerified, 'userAvatar': selectedAvatar as string};
    console.log(userInfo);

    setFile(null);
    setSelectedAvatar(null);
    setIsVerified(false);
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

        canvas.toBlob(
          blob => {
            if (blob) {
              const fileResized = new File([blob], file.name, {
                type: 'image/jpeg',
              });
              setFile(fileResized);
            }
          },
          'image/jpeg',
          0.8
        );
      };
    };

    reader.readAsDataURL(file);
  };



  const handleVerify = () => {
    setIsVerified(true);
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
            <Text
              type="regular"
              as="span"
              fontWeight="light"
              className="text-white"
            >
              Verify email:
            </Text>
            <Text
              type="regular"
              as="span"
              fontWeight="normal"
              className="text-white"
            >
              {`${user.email}`}
            </Text>
          </div>
          <Button
            text="Verify"
            btnClass="btnLight"
            textColor="text-white"
            onClick={handleVerify}
          />
        </div>
      </div>

      <Text>Update your information</Text>

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
          name="about"
          rules={{
            maxLength: {
              value: 500,
              message: 'Maximum 500 characters allowed',
            },
          }}
          render={({ field: { onChange, value }, fieldState }) => (
            <div className="flex flex-col gap-[10px] col-span-full mt-[40px] mb-[30px]">
              <label htmlFor="about">
                <Text type="regular" as="span" fontWeight="normal">
                  Leave a short review about yourself
                </Text>
              </label>
              <div className="relative">
                <textarea
                  id="about"
                  value={value}
                  onChange={onChange}
                  rows={4}
                  className="w-full regular-border outline-none p-[10px]"
                />
                {fieldState.error && (
                  <div className='absolute top-[78px] left-0 w-full'>
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
    </section>
  );
};

export default UserPageComponent;
