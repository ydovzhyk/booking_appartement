'use client';

import { useEffect, useState } from 'react';
import translate from 'translate';
import languagesAndCodes from './languagesAndCodes';
import SelectField from '../../../components/shared/select-field/select-field';
import { useLanguage } from './language-context';

translate.key = process.env.NEXT_PUBLIC_TRANSLATE_API_KEY || '';
export default function TranslateMe() {
  const { updateLanguageIndex } = useLanguage();
  const [languageIndex, setLanguageIndex] = useState(0);

  useEffect(() => {
    const savedIndex = localStorage.getItem('languageIndex');
    if(Number(savedIndex) !== Number(languageIndex)) {
      setLanguageIndex(Number(savedIndex));
      updateLanguageIndex(Number(savedIndex));
    } else {
      return;
    }
  }, [languageIndex, updateLanguageIndex]);

  const options = languagesAndCodes.languages.map((language, index) => ({
    value: index.toString(),
    label: language.lang,
  }));

  const handleChange = async (selectedOption: any) => {
    setLanguageIndex(Number(selectedOption.value));
    updateLanguageIndex(Number(selectedOption.value));

    localStorage.setItem(
      'languageIndex',
      Number(selectedOption.value).toString()
    );
  };

  return (
    <div>
      <SelectField
        name="language"
        value={options[languageIndex]}
        handleChange={handleChange}
        placeholder="Language"
        required={true}
        options={options}
        width="135px"
        topPlaceholder={false}
      />
    </div>
  );
}

export async function translateMyText(text = '', languageIndex: number) {
  const { languages } = languagesAndCodes;
  const lang = languages[languageIndex];

  if (lang) {
    const result = await translate(text, lang.code);
    return result;
  } else {
    throw new Error('Language not found');
  }
}
export const useTranslate = (text: string) => {
  const [translatedText, setTranslatedText] = useState(text);
  const { languageIndex } = useLanguage();

  const normalizeCase = (text: unknown): string => {
    if (typeof text !== 'string' && text !== null) {
      if (Array.isArray(text)) {
        text = text.join('');
      } else {
        text = '';
      }
    }

    return (text as string).replace(
      /(^|\.\s+)([a-z])/g,
      (_: string, prefix: string, letter: string) => prefix + letter.toUpperCase()
    );
  };


  useEffect(() => {
    translateMyText(text, languageIndex)
      .then(res => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailRegex.test(res)) {
          setTranslatedText(res);
        } else {
          setTranslatedText(normalizeCase(res));
        }
      })
      .catch(err => console.log(err));
  }, [text, languageIndex]);

  return translatedText;
};

interface TranslatedTextProps {
  text: string;
}

export const TranslatedText: React.FC<TranslatedTextProps> = ({ text }) => {
  const translatedText = useTranslate(text);
  return <>{translatedText}</>;
};