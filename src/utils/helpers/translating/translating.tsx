'use client';

import { useEffect, useState } from 'react';
import translate from 'translate';
import languagesAndCodes from './languagesAndCodes';
import SelectField from '../../../components/shared/select-field/select-field';
import { useLanguage } from './language-context';
import { lANGUAGE_INDEX } from '@/data/languageIndex';

translate.key = process.env.NEXT_PUBLIC_TRANSLATE_API_KEY || '';

export default function TranslateMe() {
  const { updateLanguageIndex } = useLanguage();

  const [languageIndex, setLanguageIndex] = useState(0);
  const isServer = typeof window === 'undefined';

  useEffect(() => {
    const savedLanguageIndex = localStorage.getItem('languageIndex');
    if (!isServer) {
      updateLanguageIndex(Number(savedLanguageIndex));

      if (savedLanguageIndex && Number(savedLanguageIndex) !== languageIndex) {
        setLanguageIndex(Number(savedLanguageIndex));
      }

      if (lANGUAGE_INDEX !== Number(savedLanguageIndex)) {
        const fetchLanguage = async () => {
          try {
            await fetch('/api/language-settings', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ language: Number(savedLanguageIndex)}),
            });
          } catch (error) {
            console.error('Error saving language:', error);
          }
        }
        fetchLanguage();
      }
    } else {
      updateLanguageIndex(lANGUAGE_INDEX);
      setLanguageIndex(lANGUAGE_INDEX);
    }
  }, [isServer, languageIndex, updateLanguageIndex]);

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

    try {
      await fetch('/api/language-settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ language: selectedOption.value}),
      });
    } catch (error) {
      console.error('Error saving language:', error);
    }
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
        topPlaceholder={true}
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

  const normalizeCase = (text: string) => {
    return text.replace(
      /(^|\.\s+)([a-z])/g,
      (_, prefix, letter) => prefix + letter.toUpperCase()
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
