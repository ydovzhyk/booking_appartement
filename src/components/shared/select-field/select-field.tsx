import Select, { GroupBase, SingleValue, StylesConfig } from 'react-select';

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
  const customStyles: StylesConfig<
    { value: string; label: string },
    false,
    GroupBase<{ value: string; label: string }>
  > = {
    control: (provided, state) => ({
      ...provided,
      fontSize: '16px',
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
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      '&:hover': { borderColor: 'var(--accent-background)' },
    }),
  };

  const valueId = `select-${name}`;

  return (
    <label className="block w-full">
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
