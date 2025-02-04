'use client';

import Select, { StylesConfig } from 'react-select';
import { useMediaQuery } from 'react-responsive';
import Text from '../text/text';

interface ISelectFieldProps {
  name: string;
  value: { value: string; label: string };
  handleChange: (selectedOption: any) => void;
  placeholder: string;
  required: boolean;
  options: { value: string; label: string }[];
  className?: string;
  defaultValue?: { value: string; label: string };
  width?: string;
}

const SelectField: React.FC<ISelectFieldProps> = ({
  name,
  value,
  handleChange,
  placeholder,
  required,
  options,
  width,
  defaultValue,
}) => {
  const isMobile = useMediaQuery({ maxWidth: 425 });
  const isTablet = useMediaQuery({ minWidth: 426, maxWidth: 1279 });

  const customStyles: StylesConfig = {
    control: (provided, state) => ({
      ...provided,
      fontSize: isMobile ? '14px' : isTablet ? '15px' : '16px',
      height: '40px',
      width: width,
      color: 'var(--accent-background)',
      backgroundColor: 'white',
      borderColor: state.isFocused
        ? 'var(--accent-background)'
        : provided.borderColor,
      boxShadow: state.isFocused
        ? '0 0 0 2px var(--accent-background)'
        : 'none',
      '&:hover': {
        borderColor: 'var(--accent-background)',
      },
    }),
    option: (styles, { isDisabled, isFocused, isSelected }) => ({
      ...styles,
      backgroundColor: isSelected
        ? 'var(--accent-background)'
        : isFocused
          ? 'rgba(15,29,45,0.3)'
          : 'var(--background-color)',
      color: isSelected ? 'white' : 'var(--accent-background)',
      height: '35px',
      display: 'flex',
      alignItems: 'center',
      cursor: isDisabled ? 'not-allowed' : 'pointer',
      ':active': {
        ...styles[':active'],
        backgroundColor: !isDisabled
          ? isSelected
            ? 'var(--accent-background)'
            : 'rgba(15,29,45,0.31)'
          : undefined,
      },
    }),
    menu: provided => ({
      ...provided,
      backgroundColor: 'var(--background-color)',
      marginTop: isMobile || isTablet ? '-8px' : '2px',
    }),
    indicatorsContainer: provided => ({
      ...provided,
      padding: '0 6px',
    }),
  };

  const valueId = `select-${name}`;

  return (
    <label className="block w-full">
      <Select
        id={valueId}
        instanceId={valueId}
        name={name}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        required={required}
        options={options}
        styles={customStyles}
        defaultValue={defaultValue}
        theme={theme => ({
          ...theme,
          borderRadius: 5,
          colors: {
            ...theme.colors,
            primary: 'var(--accent-background)',
          },
        })}
      />
      {!defaultValue && value.value === '' && (
        <Text type="small" as="span" className="absolute text-gray-500">
          {placeholder}
        </Text>
      )}
    </label>
  );
};

export default SelectField;
