'use client';

import { useEffect, useState } from 'react';
import translate from 'translate';
import languagesAndCodes from './languagesAndCodes';
import SelectField from '../../../components/shared/select-field/select-field';
import { useLanguage } from './language-context';
import { lANGUAGE } from '@/data/languageData';

// translate.key = 'AIzaSyA-LWuIlquldSBDqQWlgr3nJE8h3AMTDCE';
translate.key = 'AIzaSyDLg_xiEx0CEGPUY4zPxiWnwGIQLzUOX-U';

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

      if (lANGUAGE !== Number(savedLanguageIndex)) {
        fetch('/api/settings-api?settingType=language', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ language: Number(savedLanguageIndex) }),
        }).catch(error => {
          console.error('Error saving language preference:', error);
        });
      }
    } else {
      updateLanguageIndex(lANGUAGE);
      setLanguageIndex(lANGUAGE);
    }
  }, []);

  const options = languagesAndCodes.languages.map((language, index) => ({
    value: index.toString(),
    label: language.lang,
  }));

  const handleChange = (selectedOption: any) => {
    setLanguageIndex(Number(selectedOption.value));
    updateLanguageIndex(Number(selectedOption.value));
    localStorage.setItem(
      'languageIndex',
      Number(selectedOption.value).toString()
    );

    fetch('/api/settings-api?settingType=language', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ language: Number(selectedOption.value) }),
    }).catch(error => {
      console.error('Error saving language preference:', error);
    });
  };

  return (
    <div>
      <SelectField
        name="language"
        value={options[languageIndex]}
        handleChange={handleChange}
        placeholder="Select Language"
        required={true}
        options={options}
        width="150px"
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

// 'use client';

// import { useEffect, useState } from 'react';
// import translate from 'translate';
// import languagesAndCodes from './languagesAndCodes';
// import SelectField from '../../../components/shared/select-field/select-field';
// import { useLanguage } from './language-context';
// import { lANGUAGE } from '@/data/languageData';

// // Отримуємо ключі з .env
// const KEY1 = process.env.NEXT_PUBLIC_GOOGLE_TRANSLATE_KEY1;
// const KEY2 = process.env.NEXT_PUBLIC_GOOGLE_TRANSLATE_KEY2;

// // Функція для вибору ключа
// const getTranslationKey = async () => {
//   try {
//     // Перевіряємо, чи працює KEY2
//     translate.key = KEY2!;
//     await translate('test', 'uk');
//     console.log('Using KEY2');
//     return KEY2;
//   } catch (error) {
//     console.warn('KEY2 failed, switching to KEY1');
//     return KEY1;
//   }
// };

// export default function TranslateMe() {
//   const { updateLanguageIndex } = useLanguage();

//   const [languageIndex, setLanguageIndex] = useState(0);
//   const isServer = typeof window === 'undefined';

//   useEffect(() => {
//     const savedLanguageIndex = localStorage.getItem('languageIndex');
//     if (!isServer) {
//       updateLanguageIndex(Number(savedLanguageIndex));

//       if (savedLanguageIndex && Number(savedLanguageIndex) !== languageIndex) {
//         setLanguageIndex(Number(savedLanguageIndex));
//       }

//       if (lANGUAGE !== Number(savedLanguageIndex)) {
//         fetch('/api/settings-api?settingType=language', {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({ language: Number(savedLanguageIndex) }),
//         }).catch(error => {
//           console.error('Error saving language preference:', error);
//         });
//       }
//     } else {
//       updateLanguageIndex(lANGUAGE);
//       setLanguageIndex(lANGUAGE);
//     }
//   }, []);

//   const options = languagesAndCodes.languages.map((language, index) => ({
//     value: index.toString(),
//     label: language.lang,
//   }));

//   const handleChange = (selectedOption: any) => {
//     setLanguageIndex(Number(selectedOption.value));
//     updateLanguageIndex(Number(selectedOption.value));
//     localStorage.setItem(
//       'languageIndex',
//       Number(selectedOption.value).toString()
//     );

//     fetch('/api/settings-api?settingType=language', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ language: Number(selectedOption.value) }),
//     }).catch(error => {
//       console.error('Error saving language preference:', error);
//     });
//   };

//   return (
//     <div>
//       <SelectField
//         name="language"
//         value={options[languageIndex]}
//         handleChange={handleChange}
//         placeholder="Select Language"
//         required={true}
//         options={options}
//         className="language"
//       />
//     </div>
//   );
// }

// export async function translateMyText(text = '', languageIndex: number) {
//   const { languages } = languagesAndCodes;
//   const lang = languages[languageIndex];

//   if (lang) {
//     try {
//       translate.key = await getTranslationKey(); // Вибираємо ключ динамічно
//       const result = await translate(text, lang.code);
//       return result;
//     } catch (error) {
//       console.error('Translation API failed:', error);
//       return text;
//     }
//   } else {
//     throw new Error('Language not found');
//   }
// }

// export const useTranslate = (text: string) => {
//   const [translatedText, setTranslatedText] = useState(text);
//   const { languageIndex } = useLanguage();

//   const normalizeCase = (text: string) => {
//     return text.replace(
//       /(^|\.\s+)([a-z])/g,
//       (_, prefix, letter) => prefix + letter.toUpperCase()
//     );
//   };

//   useEffect(() => {
//     translateMyText(text, languageIndex)
//       .then(res => {
//         const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//         if (emailRegex.test(res)) {
//           setTranslatedText(res);
//         } else {
//           setTranslatedText(normalizeCase(res));
//         }
//       })
//       .catch(err => console.log(err));
//   }, [text, languageIndex]);

//   return translatedText;
// };

// interface TranslatedTextProps {
//   text: string;
// }

// export const TranslatedText: React.FC<TranslatedTextProps> = ({ text }) => {
//   const translatedText = useTranslate(text);
//   return <>{translatedText}</>;
// };
