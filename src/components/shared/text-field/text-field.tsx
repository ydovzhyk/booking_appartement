'use client';
import { forwardRef, ChangeEventHandler } from 'react';
import { FieldError, Control } from 'react-hook-form';
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
  control?: Control<any>;
  autoComplete?: string;
}

const TextField = forwardRef<HTMLInputElement, ITextFieldProps>(
  (props, ref) => {
    const labelBase =
      'relative inline-block w-full h-[35px] text-[var(--text-color)] mb-[45px] md:mb-[45px] lg:mb-[50px]';
    const inputBase =
      'absolute top-0 left-0 pl-[10px] w-full h-[40px] font-normal text-base leading-none regular-border border-opacity-50 tracking-[1px] transition-all duration-300 ease-in-out outline-none';
    const emptyInputClass = 'regular-border border-opacity-50 outline-none';

    const labelClass = clsx(labelBase, props.className);
    const inputClass = clsx(inputBase, props.className);

    return (
      <label className={labelClass}>
        <input
          ref={ref}
          className={
            props.value !== null && props.value !== ''
              ? clsx(inputBase, emptyInputClass)
              : inputClass
          }
          type={props.type}
          name={props.name}
          value={props.value}
          onChange={props.handleChange}
          required={props.required}
          title={props.title}
          autoComplete={props.autoComplete}
        />
        {props.value !== '' && (
          <Text
            type="small"
            as="span"
            fontWeight="normal"
            className="absolute top-[-25px] left-0.25"
          >
            {props.placeholder}
          </Text>
        )}
        {props.value === '' && (
          <Text
            type="small"
            as="span"
            fontWeight="normal"
            className="absolute top-[6px] left-0.25 ml-2.5"
          >
            {props.placeholder}
          </Text>
        )}
        {props.error && (
          <Text
            type="extraSmall"
            as="span"
            fontWeight="normal"
            className="absolute top-10 text-red-500"
          >
            {props.title ? props.title : ''}
          </Text>
        )}
      </label>
    );
  }
);

TextField.displayName = 'TextField';

export default TextField;
