import { getArticleByName } from '@/app/(server)/api';
import s from './articles.module.scss';

export default async function ArticlePage({ params }: Params) {
  const { articleName } = params;
  const article = await getArticleByName(articleName);

  return (
    <div className={s.article}>
      <div className='container'>
        <div className={s.article__content}>
          <h1>{article.header}</h1>     
          {article.text.map((line, i) => (
            <p key={i}>{line}</p>
          ))}
          </div>
      </div>
    </div>
  );
}
