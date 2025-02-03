"use client";

import Select, { StylesConfig } from 'react-select';
import { useMediaQuery } from 'react-responsive';

import s from './select-field.module.scss';

interface ISelectFieldProps {
  name: string;
  value: { value: string; label: string };
  handleChange: (selectedOption: any) => void;
  placeholder: string;
  required: boolean;
  options: { value: string; label: string }[];
  className?: string;
  defaultValue?: { value: string; label: string };
}

const SelectField: React.FC<ISelectFieldProps> = ({
  name,
  value,
  handleChange,
  placeholder,
  required,
  options,
  className,
  defaultValue,
}) => {
  const labelClass = className ? `${s.label} ${s[className]}` : `${s.label}`;
  const selectClass = className ? `${s.select} ${s[className]}` : `${s.select}`;

  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1279 });

  const customStyles: StylesConfig = {
    control: (provided: any, state) => ({
      ...provided,
      fontSize: isMobile ? '14px' : isTablet ? '15px' : '16px',
      height: isMobile ? '35px' : isTablet ? '35px' : '35px',
      color: 'var(--second-text-color)',
      pointerEvents: 'auto',
      borderColor: state.isFocused ? 'white' : provided.borderColor,
    }),
    option: (styles, { isDisabled, isFocused, isSelected }) => {
      const backgroundColor = isSelected
        ? 'black'
        : isFocused
        ? 'rgba(0, 0, 0, 0.3)'
        : 'white';

      const textColor = isSelected ? 'white' : 'black';

      return {
        ...styles,
        backgroundColor: isDisabled ? undefined : backgroundColor,
        color: isDisabled ? '#ccc' : textColor,
        height: isMobile ? '35px' : isTablet ? '35px' : '35px',
        display: 'flex',
        alignItems: 'center',
        cursor: isDisabled ? 'not-allowed' : 'default',
        ':active': {
          ...styles[':active'],
          backgroundColor: !isDisabled
            ? isSelected
              ? 'black'
              : 'rgba(0, 0, 0, 0.3)'
            : undefined,
        },
      };
    },
    menu: (provided, state) => ({
      ...provided,
      marginTop: isMobile ? '-8px' : isTablet ? '-8px' : '2px',
    }),
    indicatorsContainer: (provided, state) => ({
      ...provided,
      padding: '0 6px',
    }),
  };

  const valueId = `select-${name}`;
  return (
    <label className={labelClass}>
      <Select
        id={valueId}
        instanceId={valueId}
        className={selectClass}
        name={name}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        required={required}
        options={options}
        styles={customStyles}
        defaultValue={defaultValue}
        theme={(theme) => ({
          ...theme,
          borderRadius: 0,
          colors: {
            ...theme.colors,
            primary: 'black',
          },
        })}
      />
      {!defaultValue && value.value === '' && (
        <span className={s.spanClass}>{placeholder}</span>
      )}
    </label>
  );
};

export default SelectField;
