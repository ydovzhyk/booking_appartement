import React from 'react';
import Text from '../text/text';

interface IButtonProps {
  text: string;
  type?: 'submit' | 'button' | 'reset';
  btnClass: string;
  onClick?: () => void;
  id?: string;
  image?: string;
  disabled?: boolean;
}

const Button: React.FC<IButtonProps> = ({
  text = '',
  type = 'submit',
  btnClass = 'btnDark',
  onClick,
  id = '',
  image = null,
  disabled = false,
}) => {
  const baseClasses =
    'flex items-center justify-center gap-2.5 hover-transition group w-[150px] h-[40px] md:w-[170px]';
  const btnDarkClasses = 'regular-border';
  const btnLightClasses = 'accent-border bg-[var(--accent)] text-white';
  const btnDisabledClasses =
    'bg-text-color border border-text-color text-main-color cursor-not-allowed';

  let buttonClasses = '';
  if (disabled) {
    buttonClasses = btnDisabledClasses;
  } else if (btnClass === 'btnDark') {
    buttonClasses = btnDarkClasses;
  } else if (btnClass === 'btnLight') {
    buttonClasses = btnLightClasses;
  }

  return (
    <>
      {!disabled && (
        <button
          id={id}
          className={`${baseClasses} ${buttonClasses}`}
          onClick={onClick}
          type={type}
        >
          {image && <img src={image} alt="icon" className="w-5 h-5" />}
          {text && (
            <Text
              type="small"
              as="span"
              fontWeight="normal"
              className="group-hover:font-bold"
            >
              {text}
            </Text>
          )}
        </button>
      )}
      {disabled && (
        <div className={`${baseClasses} ${buttonClasses}`}>
          {image && <img src={image} alt="icon" className="w-5 h-5" />}
          {text && (
            <Text
              type="small"
              as="span"
              fontWeight="normal"
              className="group-hover:font-bold"
            >
              {text}
            </Text>
          )}
        </div>
      )}
    </>
  );
};

export default Button;
