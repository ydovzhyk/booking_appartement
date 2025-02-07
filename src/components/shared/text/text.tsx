import clsx from 'clsx';
import { TranslatedText } from '../../../utils/helpers/translating/translating';

type TextType = 'title' | 'normal' | 'regular' | 'small' | 'extraSmall';
type TagType = 'h1' | 'h2' | 'h3' | 'p' | 'span';
type FontFamilyType = 'josefin' | 'maven' | 'oblik';
type FontWeightType =
  | 'thin'
  | 'light'
  | 'normal'
  | 'medium'
  | 'bold'
  | 'extrabold';

type LineHeightType =
  | 'none'
  | 'tight'
  | 'snug'
  | 'normal'
  | 'relaxed'
  | 'loose';

interface TextProps {
  type?: TextType;
  as?: TagType;
  fontFamily?: FontFamilyType;
  fontWeight?: FontWeightType;
  lineHeight?: LineHeightType;
  children: string;
  className?: string;
}

const Text: React.FC<TextProps> = ({
  type = 'normal',
  as: Tag = 'p',
  fontFamily = 'josefin',
  fontWeight = 'normal',
  lineHeight = 'tight',
  children,
  className,
}) => {
  const typeClasses = {
    title: 'text-xl sm:text-2xl md:text-3xl lg:text-4xl',
    normal: 'text-base sm:text-lg md:text-xl lg:text-2xl',
    regular: 'text-sm sm:text-base md:text-lg lg:text-xl',
    small: 'text-xs sm:text-sm md:text-base lg:text-lg',
    extraSmall: 'text-[12px] sm:text-[12px] md:text-[12px] lg:text-[12px]',
  };

  const fontClasses = {
    josefin: 'font-josefin',
    maven: 'font-maven',
    oblik: 'font-oblik',
  };

  const fontWeightClasses = {
    thin: 'font-thin',
    light: 'font-light',
    normal: 'font-normal',
    medium: 'font-medium',
    bold: 'font-bold',
    extrabold: 'font-extrabold',
  };

  const lineHeightValues = {
    none: '1',
    tight: '1.2',
    snug: '1.3',
    normal: '1.5',
    relaxed: '1.6',
    loose: '1.7',
  };

  return (
    <Tag
      className={clsx(
        typeClasses[type],
        fontClasses[fontFamily],
        fontWeightClasses[fontWeight],
        className
      )}
      style={{ lineHeight: lineHeightValues[lineHeight] }}
    >
      <TranslatedText text={children} />
    </Tag>
  );
};

export default Text;
