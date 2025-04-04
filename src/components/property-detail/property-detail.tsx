'use client';

import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useAppDispatch } from '@/utils/helpers/hooks';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { likeProperty } from '@/redux/property/property-operations';
import { Tooltip } from 'react-tooltip';
import Image from 'next/image';
import Text from '../shared/text/text';
import Button from '../shared/button/button';
import CalendarPart from '../calendar-part/calendar-part';
import { IProperty } from '@/types/property/property';
import { FaLocationDot } from 'react-icons/fa6';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { RxShare1 } from 'react-icons/rx';
import { FaStar, FaRegStar } from 'react-icons/fa';
import { getUser, getLogin } from '@/redux/auth/auth-selectors';
import {
  getCurrency,
  getExchangeRate,
} from '@/redux/technical/technical-selectors';
import { setPaymentData } from '@/redux/technical/technical-slice';
import { getSearchConditions, getAvailable } from '@/redux/search/search-selectors';
import { clearAvailable } from '@/redux/search/search-slice';
import { useHeaderHeight } from '../../utils/helpers/HeaderContext';
import Map from '../map/map';
import ReviewsSection from '../shared/slider-review/slider-review';
import ServicesPart from '../shared/services-part/services-part';
import { FaInfo } from 'react-icons/fa6';
import { IoMdClose } from 'react-icons/io';
import { ISearchConditions } from '@/types/search/search';
import Chat from '../chat/chat';
import left from '@/images/left_inactive.png';
import right from '@/images/right_inactive.png';

const PropertyDetail: React.FC<IProperty> = ({
  _id,
  title,
  mainImage,
  imagesLink,
  price,
  ranking,
  location,
  description,
  geoCoords,
  servicesList,
  owner,
  usersFeedback,
}) => {
  const headerHeight = useHeaderHeight();
  const appDispatch = useAppDispatch();
  const dispatch = useDispatch();
  const pathname = usePathname();
  const router = useRouter();
  const user = useSelector(getUser);
  const isLogin = useSelector(getLogin);
  const currency = useSelector(getCurrency);
  const exchangeRate = useSelector(getExchangeRate);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [copied, setCopied] = useState(false);
  const [showed, setShowed] = useState(false);
  const isAvailable = useSelector(getAvailable);
  const allImages = [mainImage, ...imagesLink];
  const priceTextConditions = useSelector(getSearchConditions);
  const [priceText, setPriceText] = useState<string>('');
  const [convertedPrice01, setConvertedPrice01] = useState<string>(
    (Number(price.value) * exchangeRate * priceTextConditions.days).toFixed(0)
  );
  const [convertedPrice02, setConvertedPrice02] = useState<string>(
    (
      Number(price.value) * exchangeRate * priceTextConditions.days +
      Number(price.value) * exchangeRate * priceTextConditions.days * 0.1
    ).toFixed(0)
  );
  const selectedImage =
    selectedIndex !== null ? allImages[selectedIndex] : null;

  useEffect(() => {
    dispatch(clearAvailable());
    // dispatch(clearPropertyDetail());
  }, [dispatch]);

  useEffect(() => {
    setPriceText(generatePriceSentence(priceTextConditions));
    setConvertedPrice01(
      (Number(price.value) * exchangeRate * priceTextConditions.days).toFixed(0)
    );
    setConvertedPrice02(
      (
        Number(price.value) * exchangeRate * priceTextConditions.days +
        Number(price.value) * exchangeRate * priceTextConditions.days * 0.1
      ).toFixed(0)
    );
  }, [priceTextConditions, exchangeRate]);

  const handlePrev = () => {
    setSelectedIndex(prev => {
      if (prev === null) return 0;
      return (prev - 1 + allImages.length) % allImages.length;
    });
  };

  const handleNext = () => {
    setSelectedIndex(prev => {
      if (prev === null) return 0;
      return (prev + 1) % allImages.length;
    });
  };

  function generatePriceSentence(searchConditions: ISearchConditions): string {
    const { numberAdults, numberChildren, numberRooms, petsAllowed, days } =
      searchConditions;
    const nightsText = `for ${days} ${days === 1 ? 'night' : 'nights'}`;
    const adultsText = `${numberAdults} ${numberAdults === 1 ? 'adult' : 'adults'}`;
    const childrenText =
      numberChildren > 0
        ? ` ${numberChildren} ${numberChildren === 1 ? 'child' : 'children'}`
        : '';
    const roomsText = `${numberRooms} ${numberRooms === 1 ? 'room' : 'rooms'}`;
    const petsText = petsAllowed ? ' with a pet' : '';

    return `(${nightsText}, including accommodation for ${adultsText}${childrenText} in ${roomsText}${petsText})`.replace(
      /\s+/g,
      ' '
    );
  }

  useEffect(() => {
    setIsLiked(user.likedApartments?.includes(_id) || false);
  }, [user.likedApartments, _id]);

  const toggleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    appDispatch(likeProperty({ propertyId: _id }));
  };

  const openModalWithImages = (imageUrl: string) => {
    const index = allImages.findIndex(img => img === imageUrl);
    setSelectedIndex(index);
  };

  const closeModal = () => {
    setSelectedIndex(null);
  };

  const handleCopyLink = () => {
    const currentURL = `${window.location.origin}${pathname}`;
    navigator.clipboard
      .writeText(currentURL)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 3000);
      })
      .catch(err => console.error('Failed to copy link: ', err)); // eslint-disable-line
  };

  const remainingImagesCount = allImages.length - 5;
  const formattedAddress = `${location.city}, ${location.street}, ${location.building}`;

  const handleScrollToYourStay = () => {
    let correctionScroll = 92;
    if (selectedImage) {
      setSelectedIndex(null);
      correctionScroll = 0;
    }

    const element = document.getElementById('your-stay-section');

    if (element && headerHeight !== undefined && headerHeight !== null) {
      const offsetTop =
        element.getBoundingClientRect().top +
        window.scrollY -
        headerHeight +
        correctionScroll;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth',
      });
    }
  };

  const handleNavigate = async (typePayment: string, totalAmount: string) => {
    await dispatch(
      setPaymentData({
        propertyId: _id,
        propertyName: title,
        propertyImg: mainImage,
        location,
        ranking,
        servicesList,
        pricePerNight: price.value,
        usersFeedback,
        typePayment,
        owner,
      })
    );

    const currentPath = window.location.pathname;
    await localStorage.setItem('lastPropertyPage', currentPath);
    router.push('/payment/stage-1');
  };

  return (
    <section className="w-full my-[40px] mx-auto flex flex-col gap-[30px]">
      <div className="w-full flex flex-row items-center justify-between gap-[15px]">
        <div className="w-[65%]">
          <div className="flex flex-row justify-between items-center">
            <div className="flex flex-col gap-[10px]">
              <Text as="h1" fontWeight="bold">
                {title}
              </Text>
              <div className="flex items-center gap-2">
                <FaLocationDot size={22} />
                <Text type="regular" className="text-gray-600">
                  {formattedAddress}
                </Text>
              </div>
            </div>

            <div className="flex flex-row items-center gap-[10px]">
              {/* Лайк */}
              {isLogin && (
                <div
                  className="flex items-center justify-center w-[45px] h-[45px] rounded-full cursor-pointer z-10 hover:scale-110 transition-transform duration-200 ease-in-out backdrop-blur-sm bg-white/20"
                  onClick={toggleLike}
                >
                  {isLiked ? (
                    <AiFillHeart size={26} color="var(--accent-background)" />
                  ) : (
                    <AiOutlineHeart
                      size={26}
                      color="var(--accent-background)"
                    />
                  )}
                </div>
              )}
              <div
                className="flex items-center justify-center w-[45px] h-[45px] rounded-full cursor-pointer z-10 hover:scale-110 transition-transform duration-200 ease-in-out backdrop-blur-sm bg-white/20"
                data-tooltip-id="copy-tooltip"
                onClick={handleCopyLink}
              >
                <RxShare1 size={26} color="var(--accent-background)" />
              </div>

              <Tooltip
                id="copy-tooltip"
                place="top"
                isOpen={copied}
                style={{
                  transform: 'translateY(-0px)',
                  backgroundColor: '#0f1d2d',
                  borderRadius: '5px',
                  padding: '6px 10px',
                  fontSize: '14px',
                }}
              >
                <Text
                  type="small"
                  as="span"
                  fontWeight="light"
                  className="text-white"
                >
                  Link copied
                </Text>
              </Tooltip>
            </div>
          </div>

          {/* Фото */}
          <div className="mt-4 flex flex-col gap-4">
            <div className="flex gap-4">
              <div
                className="flex-1 bg-cover bg-center rounded-lg cursor-pointer"
                style={{
                  backgroundImage: `url(${mainImage})`,
                  borderRadius: '5px',
                }}
                onClick={() => openModalWithImages(mainImage)}
              ></div>

              {/* Два додаткових фото праворуч */}
              <div className="flex flex-col gap-4 w-[266px]">
                {allImages.slice(1, 3).map((image, index) => (
                  <div
                    key={index}
                    className="w-[266px] h-[188px] bg-cover bg-center rounded-lg cursor-pointer"
                    style={{ backgroundImage: `url(${image})` }}
                    onClick={() => openModalWithImages(image)}
                  />
                ))}
              </div>
            </div>

            {/* Три фото знизу */}
            <div className="w-full flex gap-[15px] relative">
              {allImages.slice(3, 6).map((image, index) => (
                <div
                  key={index}
                  className="relative cursor-pointer rounded-lg bg-cover bg-center"
                  style={{
                    width: 'calc(100%/3)',
                    height: '188px',
                    backgroundImage: `url(${image})`,
                  }}
                  onClick={() => openModalWithImages(image)}
                >
                  {/* Лічильник, якщо є ще фото */}
                  {index === 2 && remainingImagesCount > 0 && (
                    <div className="absolute bottom-4 right-4 bg-black/60 text-white px-3 py-1 rounded-md text-sm">
                      <Text as="span" type="tiny" fontWeight="normal">
                        +{remainingImagesCount} photos
                      </Text>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Права панаель */}
        <div className="w-[35%] h-full flex flex-col gap-[15px] justify-between">
          <div className="w-full h-[65px] flex justify-center items-center">
            <Button
              text="Reserve your stay"
              btnClass="btnDark"
              onClick={handleScrollToYourStay}
            />
          </div>
          <Map
            address={formattedAddress}
            title={title}
            id={_id}
            geoCoords={geoCoords}
          />
          <div className="w-full h-[240px] flex flex-col gap-[10px]">
            {/* Рейтинг */}
            <div className="flex flex-row items-center gap-[10px]">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, index) =>
                  index < ranking ? (
                    <FaStar
                      key={index}
                      size={16}
                      className="text-[var(--accent)]"
                    />
                  ) : (
                    <FaRegStar
                      key={index}
                      size={16}
                      className="text-gray-300"
                    />
                  )
                )}
              </div>
              <p className="text-gray-600 mt-[4px] text-xl font-medium">
                {ranking}
              </p>
              <Text type="small" className="text-gray-400 mt-[4px]">
                ({usersFeedback?.length} reviews)
              </Text>
            </div>
            <ReviewsSection reviews={usersFeedback} />
          </div>
        </div>
      </div>

      <div className="w-full flex flex-row items-start justify-between gap-[15px]">
        <div className="w-[65%] flex flex-col gap-[30px]">
          <ServicesPart mode="view" servicesArray={servicesList} />
          {/* Опис */}
          <div className="flex flex-col gap-[15px]">
            <Text type="regular" as="h2" fontWeight="bold">
              Description:
            </Text>
            <Text type="small" className="text-gray-700 whitespace-pre-wrap">
              {description}
            </Text>
          </div>
          {user._id !== owner.id && (
            <Chat userId={user._id} ownerId={owner.id} apartmentId={_id} />
          )}
        </div>
        <div className="w-[35%] h-full flex flex-col gap-[15px] justify-between">
          <div id="your-stay-section" className="flex flex-col gap-[15px]">
            <Text type="regular" as="h2" fontWeight="bold">
              Your Stay:
            </Text>
            <CalendarPart
              type="vertical"
              btnText="check availability"
              city={location.city}
              apartmentId={_id}
            />
          </div>
          <div className="flex flex-col gap-[15px]">
            <div style={{ display: isAvailable === 'none' ? 'none' : 'block' }}>
              {isAvailable === 'false' && (
                <Text
                  as="span"
                  type="small"
                  lineHeight="none"
                  fontWeight="normal"
                  className="text-red-600"
                >
                  Unfortunately, it is not possible to book an apartment based
                  on the selected criteria. Please try choosing different
                  criteria or another apartment.
                </Text>
              )}
              {isAvailable === 'true' && (
                <Text
                  as="span"
                  type="small"
                  lineHeight="none"
                  fontWeight="normal"
                  className="text-green-600"
                >
                  This apartment can be booked and meets the selected criteria
                  for accommodation.
                </Text>
              )}
            </div>
            <div className="flex flex-col">
              <div className="w-full inline">
                <Text
                  type="regular"
                  as="h2"
                  fontWeight="bold"
                  className="inline"
                >
                  Price:
                </Text>
                <Text
                  as="span"
                  type="small"
                  lineHeight="none"
                  fontWeight="normal"
                  className="inline break-words"
                >
                  {` ${priceText}`}
                </Text>
              </div>
            </div>

            <div className="w-full flex flex-col gap-[10px] border border-gray-200 shadow rounded-lg p-[15px]">
              <div className="flex flex-row items-center justify-between">
                <Text type="regular" className="text-gray-600 ">
                  Non-refundable:
                </Text>
                <Text as="p" type="small" fontWeight="bold">
                  from {convertedPrice01} {currency}
                </Text>
              </div>
              <div className="w-full flex justify-center items-center">
                <Button
                  text="Book now"
                  btnClass="btnDark"
                  disabled={isAvailable !== 'true' ? true : false}
                  onClick={() =>
                    handleNavigate('Non-refundable', convertedPrice01)
                  }
                />
              </div>
            </div>

            <div className="w-full flex flex-col gap-[10px] border border-gray-200 shadow rounded-lg p-[15px]">
              <div className="flex flex-row items-center justify-between">
                <div className="flex flex-row items-center gap-2">
                  <Text type="regular" className="text-green-600 ">
                    Refundable:
                  </Text>
                  <div
                    className="flex items-center justify-center mb-[15px] w-[20px] h-[20px] rounded-full bg-[#f0f0f0] regular-border cursor-pointer hover:scale-110 transition-transform duration-200 ease-in-out"
                    data-tooltip-id="info-tooltip"
                    onMouseEnter={() => setShowed(true)}
                    onMouseLeave={() => setShowed(false)}
                  >
                    <FaInfo size={14} />
                  </div>
                  <Tooltip
                    id="info-tooltip"
                    place="top"
                    isOpen={showed}
                    style={{
                      maxWidth: '200px',
                      backgroundColor: '#0f1d2d',
                      borderRadius: '5px',
                      padding: '6px 10px',
                      fontSize: '14px',
                    }}
                  >
                    <Text
                      type="small"
                      as="span"
                      fontWeight="light"
                      className="text-white"
                    >
                      If you cancel the reservation with this option selected,
                      you will receive a full refund.
                    </Text>
                  </Tooltip>
                </div>
                <Text as="p" type="small" fontWeight="bold">
                  from {convertedPrice02} {currency}
                </Text>
              </div>
              <div className="w-full flex justify-center items-center">
                <Button
                  text="Book now"
                  btnClass="btnDark"
                  disabled={isAvailable !== 'true' ? true : false}
                  onClick={() => handleNavigate('Refundable', convertedPrice02)}
                />
              </div>
            </div>

            {currency !== 'UAH' && (
              <div className="w-full m-b-[15px]">
                <Text type="small" className="text-gray-600">
                  The price is converted to show you the approximate cost in{' '}
                  {currency}. Your card will be charged in {currency} or UAH.
                  The exchange rate may change before you pay.
                </Text>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Модальне вікно для фото */}
      {selectedImage && (
        <div className="fixed inset-0 w-screen h-screen flex items-center justify-center backdrop-blur-[3px] bg-white/70 z-50">
          <div className="relative w-[80vw] h-[90vh] bg-white rounded-lg shadow-lg p-4 flex">
            {/* Кнопка закриття */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-500 hover:text-black text-2xl"
              aria-label="Close modal window"
            >
              <IoMdClose />
            </button>

            <div className="w-full h-full flex flex-col gap-[10px]">
              <Text type="regular" as="h2" fontWeight="bold" className="inline">
                {title}
              </Text>
              <div className="w-full h-full flex flex-row items-center justify-between gap-[20px]">
                <div className="relative w-[70%] h-full flex flex-row align-ceter">
                  <div className="absolute top-0 left-0 z-10 h-full flex justify-center items-center">
                    <button
                      type="button"
                      className="ml-[20px] flex items-center justify-center w-[45px] h-[45px] rounded-full shadow-md disabled:opacity-50 hover:scale-110 transition-transform duration-200 ease-in-out"
                      onClick={handlePrev}
                    >
                      <Image
                        src={left}
                        alt={'Arrow left'}
                        className="w-[45px] h-[45px]"
                      />
                    </button>
                  </div>
                  <div
                    className="w-[45%] h-[170px] bg-center bg-cover bg-no-repeat bg-white rounded-lg border border-gray-200 shadow"
                    style={{ backgroundImage: `url(${selectedImage})` }}
                  ></div>
                  <div className="absolute top-0 right-0 z-10 h-full flex justify-center items-center">
                    <button
                      type="button"
                      className="mr-[20px] flex items-center justify-center w-[45px] h-[45px] bg-[#D1D5DB] rounded-full shadow-md disabled:opacity-50 hover:scale-110 transition-transform duration-200 ease-in-out"
                      onClick={handleNext}
                    >
                      <Image
                        src={right}
                        alt={'Arrow left'}
                        className="w-[45px] h-[45px]"
                      />
                    </button>
                  </div>
                </div>

                <div className="w-[30%] h-full p-[20px] flex flex-row justify-center items-center bg-white rounded-lg border border-gray-200 shadow">
                  <div className="w-full">
                    <div className="w-full flex flex-col gap-[20px] justify-center items-center">
                      <Button
                        text="Reserve your stay"
                        btnClass="btnDark"
                        onClick={handleScrollToYourStay}
                      />
                      <div className="p-[10px] w-full flex flex-col gap-[5px] border bg-gray-100 rounded-lg">
                        <Text type="small" className="text-gray-900 text-left">
                          Owner Information:
                        </Text>
                        <Text type="small" className="text-gray-600  text-left">
                          Name: {owner.name}
                        </Text>
                        <div className="flex flex-row items-center gap-[5px]">
                          <Text
                            type="small"
                            className="text-gray-600  text-left"
                          >
                            email:
                          </Text>
                          <a
                            href={`mailto:${owner.email}`}
                            className=" text-gray-600 hover:text-gray-900"
                          >
                            {owner.email}
                          </a>
                        </div>
                        <div className="flex flex-row items-center gap-[5px]">
                          <Text
                            type="small"
                            className="text-gray-600  text-left"
                          >
                            tel:
                          </Text>
                          <a
                            href={`tel:${owner.phone}`}
                            className=" text-gray-600 hover:text-gray-900"
                          >
                            {owner.phone}
                          </a>
                        </div>
                      </div>
                      <div className="w-full flex flex-col gap-[5px]">
                        {/* Рейтинг */}
                        <div className="flex flex-row items-center gap-[10px]">
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, index) =>
                              index < ranking ? (
                                <FaStar
                                  key={index}
                                  size={16}
                                  className="text-[var(--accent)]"
                                />
                              ) : (
                                <FaRegStar
                                  key={index}
                                  size={16}
                                  className="text-gray-300"
                                />
                              )
                            )}
                          </div>
                          <p className="text-gray-600 mt-[4px] text-xl font-medium">
                            {ranking}
                          </p>
                          <Text type="small" className="text-gray-400 mt-[4px]">
                            ({usersFeedback?.length} reviews)
                          </Text>
                        </div>
                        <ReviewsSection reviews={usersFeedback} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default PropertyDetail;
