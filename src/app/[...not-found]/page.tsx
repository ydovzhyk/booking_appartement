import NotFound from "./not-found";
import s from "./not-found.module.scss"

const NotFoundPage = () => {
  return (
    <div className={s.notFound}>
      <NotFound />
    </div>
  );
};

export default NotFoundPage;