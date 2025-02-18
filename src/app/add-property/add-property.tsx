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
import {registerProperty} from '@/redux/property/property-operations';

const AddProperty = () => {
  const dispatch = useAppDispatch();
  const user = useSelector(getUser);
  const property = useSelector(getProperty);
  const [mainImageName, setMainImageName] = useState<string>('');
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [servicesList, setServicesList] = useState<string[]>([]);

  const ukrainianCities = [
    { label: 'Kyiv', value: 'Kyiv' },
    { label: 'Kharkiv', value: 'Kharkiv' },
    { label: 'Odesa', value: 'Odesa' },
    { label: 'Dnipro', value: 'Dnipro' },
    { label: 'Lviv', value: 'Lviv' },
    { label: 'Zaporizhzhia', value: 'Zaporizhzhia' },
    { label: 'Kryvyi Rih', value: 'Kryvyi Rih' },
    { label: 'Mykolaiv', value: 'Mykolaiv' },
    { label: 'Mariupol', value: 'Mariupol' },
    { label: 'Vinnytsia', value: 'Vinnytsia' },
    { label: 'Kherson', value: 'Kherson' },
    { label: 'Poltava', value: 'Poltava' },
    { label: 'Chernihiv', value: 'Chernihiv' },
    { label: 'Cherkasy', value: 'Cherkasy' },
    { label: 'Zhytomyr', value: 'Zhytomyr' },
    { label: 'Sumy', value: 'Sumy' },
    { label: 'Rivne', value: 'Rivne' },
    { label: 'Ivano-Frankivsk', value: 'Ivano-Frankivsk' },
    { label: 'Ternopil', value: 'Ternopil' },
    { label: 'Lutsk', value: 'Lutsk' },
    { label: 'Uzhhorod', value: 'Uzhhorod' },
    { label: 'Chernivtsi', value: 'Chernivtsi' },
    { label: 'Kropyvnytskyi', value: 'Kropyvnytskyi' },
    { label: 'Kramatorsk', value: 'Kramatorsk' },
    { label: 'Bila Tserkva', value: 'Bila Tserkva' },
    { label: 'Melitopol', value: 'Melitopol' },
    { label: 'Sloviansk', value: 'Sloviansk' },
    { label: 'Severodonetsk', value: 'Severodonetsk' },
    { label: 'Uman', value: 'Uman' },
    { label: 'Kamianets-Podilskyi', value: 'Kamianets-Podilskyi' },
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
    dataForUpload.append('servicesList', servicesList.join(','));
    dataForUpload.append('mainImage', mainImageName ? mainImageName : property?.mainImage || '');

    if (imageFiles.length > 0) {
      imageFiles.forEach(file => {
        dataForUpload.append('files', file);
    });
    } else {
      dataForUpload.append('imagesLink', JSON.stringify(property?.imagesLink || []));
    }
    dispatch(registerProperty(dataForUpload));
    reset();
  };

  return (
    <section className="section flex flex-col gap-[40px]">
      <Text as="h1" fontWeight="bold">
        Register your accommodation.
      </Text>

      <form
        className="w-full grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-20 gap-y-0 justify-center py-[40px] px-[35px] regular-border"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* Submit Button */}
        <div className="col-span-full flex justify-center">
          <Button text="Update" btnClass="btnDark" />
        </div>
      </form>

      <ServicesPart />
    </section>
  );
};

export default AddProperty;
