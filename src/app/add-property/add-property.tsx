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
import { getUser } from '@/redux/auth/auth-selectors';
import { getProperty } from '@/redux/property/property-selectors';
import ServicesPart from '@/components/shared/services-part/services-part';
import Text from '@/components/shared/text/text';
import { IProperty } from '@/types/property/property';
import { IPropertyRegister } from '@/types/property/axios-property';
import { registerProperty } from '@/redux/property/property-operations';
import { resizeImage } from '@/utils/helpers/resize-img';
import Slider from '@/components/shared/slider/slider';

export const ukrainianCities = [
  {
    label: 'Kyiv',
    value: 'Kyiv',
    coordinates: { lat: 50.4501, lon: 30.5234 }
  },
  {
    label: 'Kharkiv',
    value: 'Kharkiv',
    coordinates: { lat: 49.9935, lon: 36.2304 },
  },
  {
    label: 'Odesa',
    value: 'Odesa',
    coordinates: { lat: 46.4825, lon: 30.7233 },
  },
  {
    label: 'Dnipro',
    value: 'Dnipro',
    coordinates: { lat: 48.4647, lon: 35.0462 },
  },
  {
    label: 'Lviv',
    value: 'Lviv',
    coordinates: { lat: 49.8397, lon: 24.0297 }
  },
  {
    label: 'Zaporizhzhia',
    value: 'Zaporizhzhia',
    coordinates: { lat: 47.8388, lon: 35.1396 },
  },
  {
    label: 'Kryvyi Rih',
    value: 'Kryvyi Rih',
    coordinates: { lat: 47.9105, lon: 33.3918 },
  },
  {
    label: 'Mykolaiv',
    value: 'Mykolaiv',
    coordinates: { lat: 46.975, lon: 31.9946 },
  },
  {
    label: 'Mariupol',
    value: 'Mariupol',
    coordinates: { lat: 47.0971, lon: 37.5434 },
  },
  {
    label: 'Vinnytsia',
    value: 'Vinnytsia',
    coordinates: { lat: 49.2331, lon: 28.4682 },
  },
  {
    label: 'Kherson',
    value: 'Kherson',
    coordinates: { lat: 46.6354, lon: 32.6169 },
  },
  {
    label: 'Poltava',
    value: 'Poltava',
    coordinates: { lat: 49.5883, lon: 34.5514 },
  },
  {
    label: 'Chernihiv',
    value: 'Chernihiv',
    coordinates: { lat: 51.4982, lon: 31.2893 },
  },
  {
    label: 'Cherkasy',
    value: 'Cherkasy',
    coordinates: { lat: 49.4444, lon: 32.0598 },
  },
  {
    label: 'Zhytomyr',
    value: 'Zhytomyr',
    coordinates: { lat: 50.2547, lon: 28.6587 },
  },
  {
    label: 'Sumy',
    value: 'Sumy',
    coordinates: { lat: 50.9077, lon: 34.7981 }
  },
  {
    label: 'Rivne',
    value: 'Rivne',
    coordinates: { lat: 50.6199, lon: 26.2516 },
  },
  {
    label: 'Ivano-Frankivsk',
    value: 'Ivano-Frankivsk',
    coordinates: { lat: 48.9226, lon: 24.7103 },
  },
  {
    label: 'Ternopil',
    value: 'Ternopil',
    coordinates: { lat: 49.5535, lon: 25.5948 },
  },
  {
    label: 'Lutsk',
    value: 'Lutsk',
    coordinates: { lat: 50.7472, lon: 25.3254 },
  },
  {
    label: 'Uzhhorod',
    value: 'Uzhhorod',
    coordinates: { lat: 48.6208, lon: 22.2879 },
  },
  {
    label: 'Chernivtsi',
    value: 'Chernivtsi',
    coordinates: { lat: 48.2908, lon: 25.9345 },
  },
  {
    label: 'Kropyvnytskyi',
    value: 'Kropyvnytskyi',
    coordinates: { lat: 48.5079, lon: 32.2623 },
  },
  {
    label: 'Kramatorsk',
    value: 'Kramatorsk',
    coordinates: { lat: 48.7194, lon: 37.6086 },
  },
  {
    label: 'Bila Tserkva',
    value: 'Bila Tserkva',
    coordinates: { lat: 49.795, lon: 30.1306 },
  },
  {
    label: 'Melitopol',
    value: 'Melitopol',
    coordinates: { lat: 46.8489, lon: 35.3659 },
  },
  {
    label: 'Sloviansk',
    value: 'Sloviansk',
    coordinates: { lat: 48.8661, lon: 37.6282 },
  },
  {
    label: 'Severodonetsk',
    value: 'Severodonetsk',
    coordinates: { lat: 48.9482, lon: 38.4911 },
  },
  {
    label: 'Uman',
    value: 'Uman',
    coordinates: { lat: 48.748, lon: 30.2219 }
  },
  {
    label: 'Kamianets-Podilskyi',
    value: 'Kamianets-Podilskyi',
    coordinates: { lat: 48.6845, lon: 26.5854 },
  },
];


const AddProperty = () => {
  const dispatch = useAppDispatch();
  const user = useSelector(getUser);
  const property = useSelector(getProperty);
  const [mainImageName, setMainImageName] = useState<string>('');
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [urlMainImage, setUrlMainImage] = useState<string>('');
  const [urlImages, setUrlImages] = useState<string[]>([]);

  const category = [
    { label: 'hotel', value: 'hotel' },
    { label: 'apartment', value: 'apartment' },
    { label: 'resort', value: 'resort' },
    { label: 'cottages', value: 'cottages' },
    { label: 'holiday home', value: 'holiday home' },
    { label: 'villas', value: 'villas' },
  ];

  const formDefaultValues = {
    title: property?.title || '',
    location: {
      city: property?.location.city || 'Kyiv',
      street: property?.location.street || '',
      building: property?.location.building || '',
      apartment: property?.location.apartment || '',
    },
    accommodation: {
      livingRooms: property?.accommodation.livingRooms || '',
      qtyAdults: property?.accommodation.qtyAdults || '',
      qtyChildrens: property?.accommodation.qtyChildrens || '',
    },
    description: property?.description || '',
    owner: {
      email: user.email || '',
      name: user.username || '',
      phone: user.phone || '',
    },
    price: {
      value: property?.price.value || '',
      currency: 'UAH',
    },
    category: property?.category || 'Apartment',
  };

  const { control, register, handleSubmit, reset } = useForm<IProperty>({
    defaultValues: {
      ...formDefaultValues,
    },
  });

  useEffect(() => {
    reset({
      ...formDefaultValues,
    });
  }, [property, reset]);

  const onSubmit = async (data: IPropertyRegister) => {
    const dataForUpload = new FormData();
    dataForUpload.append('title', data.title);
    dataForUpload.append('location', JSON.stringify(data.location));
    dataForUpload.append('description', data.description);
    dataForUpload.append('owner', JSON.stringify(data.owner));
    dataForUpload.append('accommodation', JSON.stringify(data.accommodation));
    dataForUpload.append('price', JSON.stringify(data.price));
    dataForUpload.append('category', data.category);
    dataForUpload.append('servicesList', selectedServices.join(','));
    dataForUpload.append(
      'mainImage',
      mainImageName ? mainImageName : property?.mainImage || ''
    );

    if (imageFiles.length > 0) {
      imageFiles.forEach(file => {
        dataForUpload.append('files', file);
      });
    } else {
      dataForUpload.append(
        'imagesLink',
        JSON.stringify(property?.imagesLink || [])
      );
    }
    dispatch(registerProperty(dataForUpload));
    setSelectedServices([]);
    setMainImageName('');
    setImageFiles([]);
    setUrlMainImage('');
    setUrlImages([]);
    reset();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setMainImageName(file.name);

    resizeImage(file, 500, 500, (base64Data: string) => {
      setUrlMainImage(base64Data);
      setImageFiles([file]);
    });
  };

  const handleFilesUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;
    const newFiles: File[] = Array.from(files);

    const uniqueFiles = newFiles.filter(
      file => !imageFiles.some(f => f.name === file.name)
    );
    const base64Promises: Promise<string>[] = [];
    uniqueFiles.forEach(file => {
      setImageFiles(prevFiles => [...prevFiles, file]);

      base64Promises.push(
        new Promise((resolve, reject) => {
          resizeImage(file, 500, 500, (base64Data: string) => {
            resolve(base64Data);
          });
        })
      );
    });

    Promise.all(base64Promises).then(resizedImages => {
      setUrlImages(prev => [...prev, ...resizedImages]);
    });
  };

  return (
    <section className="section flex flex-col gap-[40px]">
      <Text as="h1" fontWeight="bold">
        Register your accommodation.
      </Text>
      <form
        className="w-full flex flex-col regular-border py-[40px] px-[35px]"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* Title */}
        <div className="flex flex-col gap-[30px]">
          <Text type="regular" as="span" fontWeight="normal">
            Give a unique name to your accommodation
          </Text>
          <Controller
            control={control}
            name="title"
            rules={{
              required: 'Title is required',
              minLength: {
                value: 2,
                message: 'Title must have at least 2 characters',
              },
              maxLength: {
                value: 200,
                message: 'Title must have no more than 200 characters',
              },
            }}
            render={({ field: { onChange, value }, fieldState }) => (
              <TextField
                value={value}
                handleChange={onChange}
                error={fieldState.error}
                autoComplete="off"
                {...fields.title}
              />
            )}
          />
        </div>

        {/* location */}
        <div className="flex flex-col gap-[30px]">
          <Text type="regular" as="span" fontWeight="normal">
            Enter the actual address of the property's location
          </Text>
          <div className="w-full grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-20 gap-y-0 justify-center ">
            {/* City */}
            <Controller
              control={control}
              name={'location.city'}
              render={({ field: { onChange, value } }) => {
                const selectedCountry =
                  ukrainianCities.find(c => c.value === value) || null;
                return (
                  <SelectField
                    name="city"
                    value={selectedCountry}
                    topPlaceholder={false}
                    width="100%"
                    textAlign="left"
                    handleChange={selectedOption =>
                      onChange(selectedOption ? selectedOption.value : '')
                    }
                    placeholder="Select City"
                    required
                    options={ukrainianCities}
                  />
                );
              }}
            />

            {/* Street */}
            <Controller
              control={control}
              name="location.street"
              rules={{
                required: 'Street is required',
                minLength: {
                  value: 2,
                  message: 'Street must have at least 2 characters',
                },
                maxLength: {
                  value: 50,
                  message: 'Street must have no more than 50 characters',
                },
              }}
              render={({ field: { onChange, value }, fieldState }) => (
                <TextField
                  value={value}
                  handleChange={onChange}
                  error={fieldState.error}
                  autoComplete="off"
                  {...fields.street}
                />
              )}
            />

            {/* Building */}
            <Controller
              control={control}
              name="location.building"
              rules={{
                required: false,
                minLength: {
                  value: 1,
                  message: 'Building must have at least 1 characters',
                },
                maxLength: {
                  value: 4,
                  message: 'Building must have no more than 4 characters',
                },
              }}
              render={({ field: { onChange, value }, fieldState }) => (
                <TextField
                  value={value}
                  handleChange={onChange}
                  error={fieldState.error}
                  autoComplete="off"
                  {...fields.building}
                />
              )}
            />

            {/* Apartment */}
            <Controller
              control={control}
              name="location.apartment"
              rules={{
                required: false,
                minLength: {
                  value: 1,
                  message: 'Apartment must have at least 1 characters',
                },
                maxLength: {
                  value: 4,
                  message: 'Apartment must have no more than 4 characters',
                },
              }}
              render={({ field: { onChange, value }, fieldState }) => (
                <TextField
                  value={value}
                  handleChange={onChange}
                  error={fieldState.error}
                  autoComplete="off"
                  {...fields.apartment}
                />
              )}
            />
          </div>
        </div>

        {/* Description */}
        <div className="flex flex-col gap-[30px] mb-[40px]">
          <Text type="regular" as="span" fontWeight="normal">
            Add a detailed description of the property
          </Text>
          <Controller
            control={control}
            name="description"
            rules={{
              maxLength: {
                value: 5000,
                message: 'Maximum 5000 characters allowed',
              },
            }}
            render={({ field: { onChange, value }, fieldState }) => (
              <div className="flex flex-col gap-[10px] col-span-full">
                <div className="relative">
                  <textarea
                    id="description"
                    value={value}
                    onChange={onChange}
                    rows={5}
                    className="w-full regular-border outline-none p-[10px] mb-[-10px]"
                  />
                  {fieldState.error && (
                    <div className="absolute bot-[10px] left-0 w-full">
                      <Text
                        type="extraSmall"
                        as="span"
                        fontWeight="normal"
                        className=" text-red-500"
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

        {/* Owner */}
        <div className="flex flex-col gap-[30px]">
          <Text type="regular" as="span" fontWeight="normal">
            Verify the contact information
          </Text>
          <div className="w-full grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-20 gap-y-0 justify-center ">
            {/* Name */}
            <Controller
              control={control}
              name="owner.name"
              rules={{
                required: 'Name is required',
                minLength: {
                  value: 2,
                  message: 'Name must have at least 2 characters',
                },
                maxLength: {
                  value: 50,
                  message: 'Name must have no more than 50 characters',
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

            {/* Phone */}
            <Controller
              control={control}
              name="owner.phone"
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

            {/* Email */}
            <Controller
              control={control}
              name="owner.email"
              rules={{
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address',
                },
              }}
              render={({ field: { onChange, value }, fieldState }) => (
                <TextField
                  value={value ?? ''}
                  handleChange={onChange}
                  error={fieldState.error}
                  {...fields.email}
                />
              )}
            />
          </div>
        </div>

        {/* Accommodation */}
        <div className="flex flex-col gap-[30px]">
          <Text type="regular" as="span" fontWeight="normal">
            Indicate accommodation options
          </Text>
          <div className="w-full grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-20 gap-y-0 justify-center ">
            {/* livingRooms */}
            <Controller
              control={control}
              name="accommodation.livingRooms"
              rules={{
                required: 'Number of living rooms is required',
                maxLength: {
                  value: 2,
                  message:
                    'Number of living rooms field must have no more than 2 characters',
                },
              }}
              render={({ field: { onChange, value }, fieldState }) => (
                <TextField
                  value={value}
                  handleChange={onChange}
                  error={fieldState.error}
                  autoComplete="off"
                  {...fields.livingRooms}
                />
              )}
            />

            {/* qtyAdults */}
            <Controller
              control={control}
              name="accommodation.qtyAdults"
              rules={{
                required: 'Number of adults is required',
                maxLength: {
                  value: 2,
                  message:
                    'Number of adults field must have no more than 2 characters',
                },
              }}
              render={({ field: { onChange, value }, fieldState }) => (
                <TextField
                  value={value}
                  handleChange={onChange}
                  error={fieldState.error}
                  autoComplete="off"
                  {...fields.qtyAdults}
                />
              )}
            />
            {/* qtyChildrens */}
            <Controller
              control={control}
              name="accommodation.qtyChildrens"
              rules={{
                required: 'Number of childrens is required',
                maxLength: {
                  value: 2,
                  message:
                    'Number of childrens field must have no more than 2 characters',
                },
              }}
              render={({ field: { onChange, value }, fieldState }) => (
                <TextField
                  value={value}
                  handleChange={onChange}
                  error={fieldState.error}
                  autoComplete="off"
                  {...fields.qtyChildrens}
                />
              )}
            />
          </div>
        </div>

        {/* Price */}
        <div className="flex flex-col gap-[30px]">
          <Text type="regular" as="span" fontWeight="normal">
            Specify the price per night of accommodation
          </Text>
          <div className="w-full grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-x-20 gap-y-0 justify-center">
            <div className="flex flex-row items-center gap-[5px]">
              <Controller
                control={control}
                name="price.value"
                rules={{
                  required: 'Price per night is required',
                  maxLength: {
                    value: 4,
                    message:
                      'Price per night field must have no more than 4 characters',
                  },
                }}
                render={({ field: { onChange, value }, fieldState }) => (
                  <TextField
                    value={value}
                    handleChange={onChange}
                    error={fieldState.error}
                    autoComplete="off"
                    {...fields.value}
                  />
                )}
              />
              <Text
                type="regular"
                as="span"
                fontWeight="normal"
                className="whitespace-nowrap mb-[20px]"
              >
                , UAH
              </Text>
            </div>

            {/* Category */}
            <Controller
              control={control}
              name={'category'}
              render={({ field: { onChange, value } }) => {
                const selectedCategory =
                  category.find(c => c.value === value) || null;
                return (
                  <SelectField
                    name="category"
                    value={selectedCategory}
                    topPlaceholder={false}
                    width="100%"
                    textAlign="left"
                    handleChange={selectedOption =>
                      onChange(selectedOption ? selectedOption.value : '')
                    }
                    placeholder="Select Categpry"
                    required
                    options={category}
                  />
                );
              }}
            />
          </div>
        </div>

        <ServicesPart
          selectedServices={selectedServices}
          setSelectedServices={setSelectedServices}
        />

        {/* PhotoPart */}
        <div className="w-full flex flex-col gap-[30px] mt-[40px] mb-[40px]">
          <Text type="regular" as="span" fontWeight="normal">
            Add high-quality photos of your accommodation
          </Text>
          <div className="w-full flex flex-col gap-[30px]">
            {urlMainImage && (
              <div
                className="h-[420px] bg-cover bg-center bg-no-repeat shadow-md "
                style={{
                  backgroundImage: `url(${urlMainImage})`,
                  width: 'calc(50% - 20px)',
                  borderRadius: '5px',
                }}
              ></div>
            )}
            <FormInputFile
              name="mainPhoto"
              accept="image/png, image/jpeg"
              register={register}
              onChange={handleFileUpload}
              multiple={false}
              label={'Main photo'}
            />
          </div>

          <div className="w-full flex flex-col gap-[30px]">
            {urlImages.length > 0 && <Slider images={urlImages} />}
            <FormInputFile
              name="otherPhotos"
              accept="image/png, image/jpeg"
              register={register}
              onChange={handleFilesUpload}
              multiple={true}
              label={'Other photo'}
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="col-span-full flex justify-center">
          <Button text="Add Property" btnClass="btnDark" />
        </div>
      </form>
    </section>
  );
};

export default AddProperty;
