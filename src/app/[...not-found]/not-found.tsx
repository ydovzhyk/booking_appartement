'use client';

import BackLink from '../../components/shared/back-link/back-link';
import Text from '@/components/shared/text/text';

const NotFound = () => {
  const width = 550;
  const height = width * 0.85;

  return (
    <section>
      <div className="container">
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full">
          <div className="flex flex-row justify-center items-center mt-[20px] tablet:mt-[50px] desktop:mt-[70px] mb-[20px] tablet:mb-[30px] desktop:mb-[40px]">
            <div
              className="flex flex-col justify-center items-center w-full h-full text-white text-[40px] tablet:text-[60px] desktop:text-[180px] stroke-text"
              style={{ width: width, height: height }}
            >
              <p>404</p>
              <p className="text-[24px] tablet:text-[32px] desktop:text-[70px]">
                Page not found
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-[15px] w-full items-end pr-[180px] stroke-text">
            <Text
              type="normal"
              as="p"
              fontWeight="medium"
              className="text-left text-white"
            >
              Hi, this page is on vacation
            </Text>
            <Text
              type="title"
              as="h1"
              fontWeight="bold"
              className="text-left text-white"
            >
              You should be too
            </Text>
            <div className="flex flex-row justify-between items-center gap-[10px] text-white">
              <Text
                type="small"
                as="span"
                fontWeight="normal"
                className="text-left text-white"
              >
                Find the best stay
              </Text>
              <BackLink />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NotFound;
