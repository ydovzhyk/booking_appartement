import Select, { SingleValue, StylesConfig } from 'react-select';
import Text from '../text/text';

interface ISelectFieldProps {
  name: string;
  value: { value: string; label: string } | null;
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
  topPlaceholder?: boolean;
  textAlign?: 'center' | 'left' | 'right';
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
  topPlaceholder = false,
  showLabelWithValue = false,
  textAlign = 'center',
}) => {
  const customStyles: StylesConfig<{ value: string; label: string }, false> = {
    container: provided => ({
      ...provided,
      width: width,
    }),
    control: (provided, state) => ({
      ...provided,
      outline: 'none',
      cursor: 'pointer',
      height: '40px',
      backgroundColor: 'white',
      borderColor: state.isFocused
        ? provided.borderColor
        : 'var(--accent-background)',
      boxShadow: state.isFocused ? 'var(--accent-background)' : 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      '&:hover': { borderColor: 'var(--accent-background)' },
    }),
    singleValue: provided => ({
      ...provided,
      paddingTop: '4px',
      textAlign: textAlign,
      color: 'black',
    }),
    input: provided => ({
      ...provided,
      padding: '0px',
      marginTop: "5px",
      fontSize: '16px',
      textAlign: textAlign,
      color: 'black',
      
    }),
    placeholder: provided => ({
      ...provided,
      fontSize: '16px',
      textAlign: textAlign,
      color: 'black',
      marginTop: '4px',
    }),
  };

  const valueId = `select-${name}`;

  const dynamicValue = textAlign === 'center' ? 'center' : 'flex-start';

  return (
    <label className="relative w-full flex flex-col items-center gap-[0px]">
      {(topPlaceholder || value) && (
        <div
          className="absolute top-[-23px] left-0 w-full flex items-center"
          style={{ justifyContent: dynamicValue }}
        >
          <Text
            type="small"
            as="span"
            fontWeight="normal"
            className={`${topPlaceholder ? 'text-white' : 'text-black'}`}
          >
            {placeholder}
          </Text>
        </div>
      )}
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
