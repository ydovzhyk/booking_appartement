import React, { useState, useEffect } from 'react';
import { SingleValue } from 'react-select';
import { useDispatch, useSelector } from 'react-redux';
import SelectField from '../shared/select-field/select-field';
import {
  setUpdateExchangeRate,
  setExchangeRateData,
} from '@/redux/technical/technical-slice';
import { getExchangeRateData } from '@/redux/technical/technical-selectors';

interface CurrenciesProps {
  showLabelWithValue?: boolean;
  initialCurrency?: string;
}

const Currencies: React.FC<CurrenciesProps> = ({
  showLabelWithValue = false,
  initialCurrency = 'UAH',
}) => {
  const dispatch = useDispatch();
  const exchangeRateDate = useSelector(getExchangeRateData);

  const popularCurrencies = [
    { value: 'UAH', label: '₴' },
    { value: 'USD', label: '$' },
    { value: 'EUR', label: '€' },
    { value: 'GBP', label: '£' },
    { value: 'JPY', label: '¥' },
    { value: 'CAD', label: 'CA$' },
    { value: 'AUD', label: 'AU$' },
    { value: 'CHF', label: 'CHF' },
    { value: 'CNY', label: '¥' },
    { value: 'SEK', label: 'kr' },
    { value: 'NZD', label: 'NZ$' },
    { value: 'MXN', label: 'MX$' },
    { value: 'SGD', label: 'S$' },
    { value: 'HKD', label: 'HK$' },
    { value: 'NOK', label: 'kr' },
    { value: 'KRW', label: '₩' },
    { value: 'TRY', label: '₺' },
    { value: 'INR', label: '₹' },
    { value: 'RUB', label: '₽' },
    { value: 'ZAR', label: 'R' },
    { value: 'BRL', label: 'R$' },
  ];

  type CurrencyOption = { value: string; label: string };

  const [selectedCurrency, setSelectedCurrency] = useState<CurrencyOption>(
    () => {
      const found = popularCurrencies.find(c => c.value === initialCurrency);
      return found || popularCurrencies[0];
    }
  );

  const API_KEY01 = 'c387761eefc91005f40db998'; // 1500 free requests per month https://app.exchangerate-api.com
  const API_KEY02 = 'ed07810753df7f892d787233'; // 1500 free requests per month https://app.exchangerate-api.com

  useEffect(() => {
    const fetchCurrencies = async (key: string) => {
      try {
        const response = await fetch(
          `https://v6.exchangerate-api.com/v6/${key}/latest/UAH`
        );

        const data = await response.json();
        if (!data.conversion_rates) {
          throw new Error('Invalid API response');
        }

        // const currencyList = Object.keys(data.conversion_rates).map(code => ({
        //   value: code,
        //   label: code,
        // }));

        dispatch(setExchangeRateData(data.conversion_rates));
      } catch (error) {
        console.error(
          `Error with API key (${key}):`,
          error instanceof Error ? error.message : error
        );
        throw error;
      }
    };

    const fetchWithFallback = async () => {
      try {
        await fetchCurrencies(API_KEY01);
      } catch {
        console.warn('Switching to the backup API key...');
        try {
          await fetchCurrencies(API_KEY02);
        } catch (finalError) {
          console.error(
            `Both API keys failed::`,
            finalError instanceof Error ? finalError.message : finalError
          );
        }
      }
    };

    if (Object.keys(exchangeRateDate).length === 0) {
      fetchWithFallback();
    } else {
      return;
    }
  }, [dispatch, exchangeRateDate]);

  const handleCurrencyChange = (
    selectedOption: SingleValue<{ value: string; label: string }>
  ) => {
    if (selectedOption) {
      dispatch(setUpdateExchangeRate(selectedOption.value));
      setSelectedCurrency(selectedOption);
    }
  };

  return (
    <div>
      <SelectField
        name="currency"
        value={selectedCurrency}
        handleChange={handleCurrencyChange}
        placeholder="Currency"
        required={true}
        options={popularCurrencies}
        width="135px"
        topPlaceholder={false}
        showLabelWithValue={showLabelWithValue}
      />
    </div>
  );
};

export default Currencies;
