'use client';

import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Image from 'next/image';
import Text from '../shared/text/text';
import { setUpdatedWeather } from '@/redux/technical/technical-slice';
import { getUpdatedWeather } from '@/redux/technical/technical-selectors';
import { IUpdatedWeather } from '@/types/technical/technical';
import { AiOutlineFullscreen } from 'react-icons/ai';
import { useLanguage } from '@/utils/helpers/translating/language-context';
import languageData from '@/utils/helpers/translating/languagesAndCodes';

const GOOGLE_MAPS_WEATHER_API_KEY =
  process.env.NEXT_PUBLIC_GOOGLE_MAPS_WEATHER_API_KEY || '';

interface GeoCoords {
  lat: number;
  lng: number;
  comments: string;
}

interface MapProps {
  address: string;
  title: string;
  geoCoords?: GeoCoords;
  id: string;
}

const defaultGeoCoords: GeoCoords = {
  lat: 50.4501,
  lng: 30.5234,
  comments: 'false',
};

const Map = ({
  address,
  geoCoords = defaultGeoCoords,
  id,
}: MapProps) => {
  const dispatch = useDispatch();
  const { languageIndex } = useLanguage();
  const updatedWeather = useSelector(getUpdatedWeather);
  const [weatherData, setWeatherData] = useState<IUpdatedWeather>({
    id: '',
    time: '',
    temperature: 0,
    icon: '',
    city: '',
    description: '',
  });
  const [isFullScreen, setIsFullScreen] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [currentLanguage, setCurrentLanguage] = useState('en');

  const generateMapSrc = ({ lat, lng, zoom, language }) => {
    return `https://maps.google.com/maps?q=${lat},${lng}&z=${zoom}&hl=${language}&output=embed&t=m`;
  };

  const mapSrc = generateMapSrc({
    lat: geoCoords.lat,
    lng: geoCoords.lng,
    zoom: geoCoords.comments === 'true' ? 14 : 10,
    language: currentLanguage,
  });

  const fetchWeather = async (fullAddress: string) => {
    const parts = fullAddress.split(',').map(part => part.trim());
    const cityName = parts[0];
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${GOOGLE_MAPS_WEATHER_API_KEY}`;

    try {
      const responseWeather = await fetch(weatherUrl);
      const dataWeather = await responseWeather.json();

      if (!dataWeather || dataWeather.cod !== 200) {
        console.error(`❌ Error fetching weather data: ${dataWeather.message}`);
        return;
      }

      if (!dataWeather.weather || dataWeather.weather.length === 0) {
        console.error('❌ Weather data is missing in the API response');
        return;
      }

      const description = dataWeather.weather[0].description;
      const temperature = dataWeather.main.temp;
      const iconGoogle = `https://openweathermap.org/img/wn/${dataWeather.weather[0]['icon']}@2x.png`;

      dispatch(
        setUpdatedWeather({
          id,
          time: new Date().toISOString(),
          temperature,
          icon: iconGoogle,
          city: cityName,
          description: description,
        })
      );
    } catch (error) {
      console.error('❌ Error getting weather data:', error);
    }
  };

  useEffect(() => {
    const selectedLanguage =
      languageData.languages[languageIndex]?.code || 'en';
    setCurrentLanguage(selectedLanguage);
  }, [languageIndex]);

  useEffect(() => {
    const savedWeatherData = updatedWeather.find(weather => weather.id === id);
    if (savedWeatherData && isWeatherDataValid(savedWeatherData.time)) {
      setWeatherData(savedWeatherData);
    } else {
      fetchWeather(address);
    }
  }, [id, address, updatedWeather]);

  const isWeatherDataValid = (time: string): boolean => {
    const lastUpdate = new Date(time).getTime();
    const timeElapsed = Date.now() - lastUpdate;
    const isDataValid = timeElapsed < 3600000;
    return isDataValid;
  };

  const handleFullScreen = () => {
    setIsFullScreen(true);
    if (iframeRef.current) {
      iframeRef.current.focus();
    }
  };

  const handleCloseFullScreen = () => {
    setIsFullScreen(false);
  };

  return (
    <>
      {!isFullScreen && (
        <div
          id="MAP"
          className="relative w-full h-[340px] overflow-hidden rounded-lg shadow-md flex flex-row items-center justify-center"
        >
          <iframe
            ref={iframeRef}
            title="Google Maps"
            src={mapSrc}
            width="100%"
            height="350px"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              outline: 'none',
              border: 'none',
            }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
            aria-hidden="false"
            tabIndex={0}
          ></iframe>
          <button
            onClick={handleFullScreen}
            aria-label={
              !isFullScreen
                ? 'Map full screen mode'
                : 'Close map full screen mode'
            }
            className="absolute top-[10px] right-[10px] w-[40px] h-[40px] flex flex-row items-center justify-center bg-white border-2 border-gray-200 z-10 outline-none cursor-pointer shadow-md"
          >
            <AiOutlineFullscreen style={{ width: '25px', height: '25px' }} />
          </button>
          {weatherData.icon && (
            <div className="absolute left-[10px] bottom-[10px] p-[10px] w-[150px] flex flex-col justify-between items-center bg-white border-gray-200 z-10 shadow-md">
              <Text
                as="p"
                type="tiny"
                fontWeight="normal"
                className="text-center"
              >
                Weather in {weatherData.city}
              </Text>
              <div className="flex flex-row items-center">
                <Image
                  src={weatherData.icon}
                  alt="Weather icon"
                  width={60}
                  height={60}
                  priority
                  className="mt-[-10px] mb-[-10px]"
                  style={{
                    filter: 'drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.4))',
                  }}
                />
                <Text
                  as="p"
                  type="normal"
                  fontWeight="normal"
                  className="text-center mt-[5px]"
                >
                  {Math.round(weatherData.temperature)}°С
                </Text>
              </div>
              <Text as="p" type="tiny" fontWeight="normal">
                {weatherData.description}
              </Text>
            </div>
          )}
        </div>
      )}

      {isFullScreen && (
        <div className="fixed top-0 left-0 w-full h-full flex flex-row items-center justify-center z-50">
          <iframe
            ref={iframeRef}
            title="Google Maps"
            src={mapSrc}
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              width: '100%',
              height: '100%',
              border: 'none',
            }}
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
            aria-hidden="false"
            tabIndex={0}
          ></iframe>
          <button
            onClick={handleCloseFullScreen}
            aria-label={
              !isFullScreen
                ? 'Map full screen mode'
                : 'Close map full screen mode'
            }
            className="absolute top-[10px] right-[10px] w-[40px] h-[40px] flex flex-row items-center justify-center bg-white border-2 border-gray-200 z-10 outline-none cursor-pointer shadow-md"
          >
            <AiOutlineFullscreen style={{ width: '25px', height: '25px' }} />
          </button>

          {weatherData.icon && (
            <div className="absolute left-[10px] p-[10px] w-[150px] flex flex-col justify-between items-center bg-white border-gray-200 z-10 shadow-md">
              <Text
                as="p"
                type="tiny"
                fontWeight="normal"
                className="text-center"
              >
                Weather in {weatherData.city}
              </Text>
              <div className="flex flex-row items-center">
                <Image
                  src={weatherData.icon}
                  alt="Weather icon"
                  width={60}
                  height={60}
                  priority
                  className="mt-[-10px] mb-[-10px]"
                  style={{
                    filter: 'drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.4))',
                  }}
                />
                <Text
                  as="p"
                  type="normal"
                  fontWeight="normal"
                  className="text-center mt-[5px]"
                >
                  {Math.round(weatherData.temperature)}°С
                </Text>
              </div>
              <Text as="p" type="tiny" fontWeight="normal">
                {weatherData.description}
              </Text>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Map;
