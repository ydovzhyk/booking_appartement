import React from 'react';
import Text from '../text/text';

interface FormInputFileProps {
  register: any;
  name: string;
  accept: string;
  multiple?: boolean;
  onChange: (event: any) => void;
  label: string;
}

export default function FormInputFile({
  register,
  name,
  accept,
  multiple = false,
  onChange,
  label,
}: FormInputFileProps) {
  const handleFileChange = (event: any) => {
    if (onChange) {
      onChange(event);
    }
  };

  return (
    <div className="relative inline-flex justify-center items-center w-[170px] h-[40px] bg-[--accent] regular-border rounded-[5px] group cursor-pointer">
      <label
        htmlFor={name}
        className="flex justify-center items-center cursor-pointer"
      >
        <Text
          type="small"
          as="span"
          fontWeight="normal"
          lineHeight="none"
          className={`text-white group-hover:font-bold cursor-pointer mt-[3px]`}
        >
          {label}
        </Text>
      </label>
      <input
        type="file"
        id={name}
        accept={accept}
        className="hidden"
        {...register(name)}
        multiple={multiple}
        onChange={handleFileChange}
      />
    </div>
  );
}
