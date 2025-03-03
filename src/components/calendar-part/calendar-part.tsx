'use client';

import SelectField from '@/components/shared/select-field/select-field';
import Text from '@/components/shared/text/text';
import { searchProperty } from '@/redux/search/search-operations';
import { getSearchConditions } from '@/redux/search/search-selectors';
import { setSearchConditions } from '@/redux/search/search-slice';
import { ISearchConditions } from '@/types/search/search';
import { useLanguage } from '@/utils/helpers/translating/language-context';
import { translateMyText } from '@/utils/helpers/translating/translating';
import moment from 'moment';
import { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Controller, useForm } from 'react-hook-form';
import { IoIosArrowDown, IoIosArrowUp, IoMdPeople } from 'react-icons/io';
import { VscCalendar } from 'react-icons/vsc';
import { useDispatch, useSelector } from 'react-redux';
import { ukrainianCities } from '../../app/add-property/add-property';
import { useAppDispatch } from '../../utils/helpers/hooks';
import Button from '../shared/button/button';
import Conditions from './conditions/conditions';

const CalendarPart = () => {
  const dispatch = useDispatch();
  const appDispatch = useAppDispatch();
  const { languageIndex } = useLanguage();
  const conditions = useSelector(getSearchConditions);
  const [placeholderText1, setPlaceholderText1] = useState('Date from');
  const [placeholderText2, setPlaceholderText2] = useState('Date to');
  const [placeholderText3, setPlaceholderText3] = useState('Select city');
  const [openConditions, setOpenConditions] = useState(false);

  const [startDate, setStartDate] = useState<Date | undefined>(
    conditions.dateFrom
      ? moment(conditions.dateFrom, 'MM/DD/YYYY').toDate()
      : undefined
  );

  const [endDate, setEndDate] = useState<Date | undefined>(
    conditions.dateTo
      ? moment(conditions.dateTo, 'MM/DD/YYYY').toDate()
      : undefined
  );

  const formDefaultValues = {
    numberAdults: 1,
    numberChildren: 0,
    numberRooms: 1,
    petsAllowed: false,
    dateFrom: startDate ? moment(startDate).format('YYYY-MM-DD') : undefined,
    dateTo: endDate ? moment(endDate).format('YYYY-MM-DD') : undefined,
    city: '',
  };

  useEffect(() => {
    const fetchPlaceholders = async () => {
      try {
        const langIndex = Number(languageIndex) || 0;
        const [text1, text2, text3] = await Promise.all([
          translateMyText('Date from', langIndex),
          translateMyText('Date to', langIndex),
          translateMyText('Select city', langIndex),
        ]);

        setPlaceholderText1(text1);
        setPlaceholderText2(text2);
        setPlaceholderText3(text3);
      } catch (error) {
        console.error('Error translating placeholders:', error);
      }
    };

    fetchPlaceholders();
  }, [languageIndex]);

  const pluralize = (count: number, singular: string, plural: string) => {
    return count === 1 ? singular : count === 0 ? plural : plural;
  };

  const textConditions: string = `${conditions.numberAdults} ${pluralize(conditions.numberAdults, 'Adult', 'Adults')},
      ${conditions.numberChildren} ${pluralize(conditions.numberChildren, 'Child', 'Children')},
      ${conditions.numberRooms} ${pluralize(conditions.numberRooms, 'Room', 'Rooms')}`;

  const { control, handleSubmit } = useForm<ISearchConditions>({
    defaultValues: {
      ...formDefaultValues,
    },
  });

  const onSubmit = (data: ISearchConditions) => {
    const searchData = {
      city: data.city,
      numberAdults: conditions?.numberAdults || data.numberAdults,
      numberChildren: conditions?.numberChildren || data.numberChildren,
      numberRooms: conditions?.numberRooms || data.numberRooms,
      petsAllowed: conditions?.petsAllowed || data.petsAllowed,
      dateFrom: startDate ? moment(startDate).format('MM/DD/YYYY') : undefined,
      dateTo: endDate ? moment(endDate).format('MM/DD/YYYY') : undefined,
      propertyType: conditions?.propertyType || '',
    };

    dispatch(setSearchConditions({ ...searchData }));
    appDispatch(searchProperty({ searchConditions: searchData }));
  };

  return (
    <div className="w-fll flex flex-row items-center justify-center mr-[auto] ml-[auto] py-[40px]">
      <form
        className="w-[70%] flex flex-row items-center justify-center gap-[5px]"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div style={{ width: 'calc(100%/5)' }}>
          <Controller
            control={control}
            name={'city'}
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
                  placeholder={value !== '' ? '' : placeholderText3}
                  required
                  options={ukrainianCities}
                />
              );
            }}
          />
        </div>

        <div
          className="relative h-[40px] flex flex-row items-center justify-left bg-white regular-border"
          style={{ width: 'calc(100%/5)', borderRadius: '5px' }}
        >
          <DatePicker
            selected={startDate}
            onChange={date => {
              setStartDate(date ?? new Date());
            }}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            placeholderText={placeholderText1}
            className="w-full h-[38px] ml-[10px] bg-transparent border-none outline-none p-[5px] text-[#0f1d2d] text-left placeholder-[#0f1d2d]"
          />
          <div className="absolute right-0 top-0 bottom-0 flex items-center justify-center pr-[10px]">
            <VscCalendar size={24} />
          </div>
        </div>
        <div
          className="relative h-[40px] flex flex-row items-center justify-left bg-white regular-border"
          style={{ width: 'calc(100%/5)', borderRadius: '5px' }}
        >
          <DatePicker
            selected={endDate}
            onChange={date => {
              setEndDate(date ?? new Date());
            }}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
            placeholderText={placeholderText2}
            className="w-full h-[38px] ml-[10px] bg-transparent border-none outline-none p-[5px] text-[#0f1d2d] text-left placeholder-[#0f1d2d]"
          />
          <div className="absolute right-0 top-0 bottom-0 flex items-center justify-center pr-[10px]">
            <VscCalendar size={24} />
          </div>
        </div>
        <div
          className="h-[40px] flex flex-row items-center justify-left bg-white regular-border"
          style={{ width: 'calc(100%/5)', borderRadius: '5px' }}
        >
          <div
            className="relative w-full h-full"
            style={{ borderRadius: '5px' }}
          >
            <button
              type="button"
              className="group flex flex-row items-center justify-between px-[10px] gap-[10px]"
              onClick={() => setOpenConditions(!openConditions)}
            >
              <IoMdPeople size={28} />
              <Text
                type="tiny"
                as="span"
                fontWeight="normal"
                className="mt-[4px]"
              >
                {textConditions}
              </Text>
              {!openConditions && (
                <IoIosArrowDown
                  size={20}
                  className="transition-transform duration-200 ease-in-out group-hover:scale-125"
                />
              )}
              {openConditions && (
                <IoIosArrowUp
                  size={20}
                  className="transition-transform duration-200 ease-in-out group-hover:scale-125"
                />
              )}
            </button>
            {openConditions && (
              <div className="absolute top-[40px] left-0 w-full">
                <Conditions onClose={() => setOpenConditions(false)} />
              </div>
            )}
          </div>
        </div>
        <Button text="Search" btnClass="btnDark" />
      </form>
    </div>
  );
};

export default CalendarPart;
