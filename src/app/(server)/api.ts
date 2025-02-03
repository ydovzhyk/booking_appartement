import { ERRORS } from '../helpers/errors';
import articles from '../../data/db.json';
import { delayed } from './delay';

import fs from 'fs';
import path from 'path';

export function getAllArticles() {
  return delayed(articles, { timeout: 0 });
}

export function getArticleByName(articleName: string) {
  const article = articles.find((x) => x.name === articleName);

  if (!article) {
    throw new Error(ERRORS.NOT_FOUND);
  }

  return delayed(article);
}

//Work with settings
export function saveHeaderHeight(height: number) {
  const filePath = path.resolve(process.cwd(), 'src/app/data/headerData.ts');
  try {
    const data = `export const HEADER_HEIGHT = ${height};\n`;
    fs.writeFileSync(filePath, data, 'utf-8');
    return { code: "200" };
  } catch (error) {
    console.error('Error writing header height data:', error);
    return { code: "500" };
  }
}

export function savelanguage(language: number) {
  const filePath = path.resolve(process.cwd(), 'src/app/data/languageData.ts');
  try {
    const data = `export const lANGUAGE = ${language};\n`;
    fs.writeFileSync(filePath, data, 'utf-8');
    return { code: "200" };
  } catch (error) {
    console.error('Error writing header height data:', error);
    return { code: "500" };
  }
}

