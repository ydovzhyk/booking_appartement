import Select, { SingleValue, StylesConfig } from 'react-select';
import Text from '../text/text';

interface ISelectFieldProps {
  name: string;
  value: { value: string; label: string };
  handleChange: (
    selectedOption: SingleValue<{ value: string; label: string }>
  ) => void;
  placeholder: string;
  required: boolean;
  options: { value: string; label: string }[];
  className?: string;
  defaultValue?: { value: string; label: string };
  width?: string;
  showLabelWithValue?: boolean;
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
  showLabelWithValue = false,
}) => {
  const customStyles: StylesConfig<{ value: string; label: string }, false> = {
    control: (provided, state) => ({
      ...provided,
      fontSize: '16px',
      width: width,
      cursor: 'pointer',
      height: '40px',
      color: 'var(--accent-background)',
      backgroundColor: 'white',
      borderColor: state.isFocused
        ? 'var(--accent-background)'
        : provided.borderColor,
      boxShadow: state.isFocused
        ? '0 0 0 2px var(--accent-background)'
        : 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      '&:hover': { borderColor: 'var(--accent-background)' },
    }),
    singleValue: provided => ({
      ...provided,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: '4px',
      color: 'var(--accent-background)',
    }),
    input: provided => ({
      ...provided,
      height: '20px',
      textAlign: 'center',
      color: 'black',
      padding: '0px',
    }),
  };

  const valueId = `select-${name}`;

  return (
    <label className="w-full flex flex-col items-center gap-[0px]">
      <Text type="small" as="span" fontWeight="light" className="text-white">
        {placeholder}
      </Text>
      <Select<{ value: string; label: string }>
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
        formatOptionLabel={option =>
          showLabelWithValue
            ? `${option.value} - ${option.label}`
            : option.label
        }
        theme={theme => ({
          ...theme,
          borderRadius: 5,
          colors: {
            ...theme.colors,
            primary: 'var(--accent-background)',
          },
        })}
      />
    </label>
  );
};

export default SelectField;
