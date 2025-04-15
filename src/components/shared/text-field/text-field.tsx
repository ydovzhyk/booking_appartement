'use client';

import { forwardRef, ChangeEventHandler } from 'react';
import { FieldError } from 'react-hook-form';
import Text from '../text/text';
import clsx from 'clsx';

export interface ITextFieldProps {
  type?: string;
  name?: string;
  value?: string;
  handleChange?: ChangeEventHandler<HTMLInputElement>;
  placeholder: string;
  required?: boolean;
  title?: string;
  className?: string;
  error?: FieldError;
  autoComplete?: string;
  icon?: React.ReactNode;
}

const TextField = forwardRef<HTMLInputElement, ITextFieldProps>(
  (
    {
      type,
      name,
      value,
      handleChange,
      placeholder,
      required,
      title,
      className,
      error,
      autoComplete,
      icon,
    },
    ref
  ) => {
    const labelBase =
      'relative inline-block w-full h-[35px] text-[var(--text-color)] mb-[45px] md:mb-[45px] lg:mb-[50px]';
    const inputBase =
      'absolute top-0 left-0 pl-[10px] w-full h-[40px] font-normal text-base leading-none regular-border border-opacity-50 rounded-[5px] tracking-[1px] transition-all duration-300 ease-in-out outline-none';
    const emptyInputClass = 'regular-border border-opacity-50 outline-none';

    const labelClass = clsx(labelBase, className);
    const inputClass = clsx(inputBase, className);

    return (
      <label className={labelClass}>
        <input
          ref={ref}
          className={value ? clsx(inputBase, emptyInputClass) : inputClass}
          type={type}
          name={name}
          value={value}
          onChange={handleChange}
          required={required}
          title={title}
          autoComplete={autoComplete}
        />
        {value && (
          <div className="absolute top-[-26px] left-0.2 flex flex-row items-center gap-[10px]">
            <Text type="small" as="span" fontWeight="normal">
              {placeholder}
            </Text>
            {icon && (
              <div className="relative first-letter:w-[40px] flex flex-row items-center justify-center">
                <div className='absolute top-[-19px] left-0'>{icon}</div>
              </div>
            )}
          </div>
        )}
        {!value && (
          <Text
            type="small"
            as="span"
            fontWeight="normal"
            className="absolute top-[10px] left-0.25 ml-2.5"
          >
            {placeholder}
          </Text>
        )}
        {error && (
          <Text
            type="extraSmall"
            as="span"
            fontWeight="normal"
            className="absolute top-10 text-red-500"
          >
            {error.message ? error.message : title ? title : ''}
          </Text>
        )}
      </label>
    );
  }
);

TextField.displayName = 'TextField';

export default TextField;
