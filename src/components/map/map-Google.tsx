'use client';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  GoogleMap,
  Marker,
  useJsApiLoader,
  Libraries,
} from '@react-google-maps/api';
import Image from 'next/image';
import Text from '../shared/text/text';
import markerIcon from '../../images/pin.png';
import { setUpdatedWeather } from '@/redux/technical/technical-slice';
import { getUpdatedWeather } from '@/redux/technical/technical-selectors';
import { IUpdatedWeather } from '@/types/technical/technical';

const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '';
const GOOGLE_MAPS_WEATHER_API_KEY =
  process.env.NEXT_PUBLIC_GOOGLE_MAPS_WEATHER_API_KEY || '';

const LIBRARIES: Libraries = [
  'places',
  'geometry',
  'drawing',
  'visualization',
  'maps',
];

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
  title,
  geoCoords = defaultGeoCoords,
  id,
}: MapProps) => {

  const dispatch = useDispatch();
  const updatedWeather = useSelector(getUpdatedWeather);
  const [weatherData, setWeatherData] = useState<IUpdatedWeather>({
    id: '',
    time: '',
    temperature: 0,
    icon: '',
    city: '',
    description: '',
  });

const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
    libraries: LIBRARIES,
});

  const fetchWeather = async (fullAddress: string) => {
    const parts = fullAddress.split(',').map(part => part.trim());
    const cityName = parts[0];
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${GOOGLE_MAPS_WEATHER_API_KEY}`;

    try {
      const responseWeather = await fetch(weatherUrl);
      const dataWeather = await responseWeather.json();
      if (dataWeather) {
        const temperature = dataWeather.main.temp;
        const iconGoogle = `https://openweathermap.org/img/wn/${dataWeather.weather[0]['icon']}@2x.png`;

        dispatch(
          setUpdatedWeather({
            id,
            time: new Date().toISOString(),
            temperature,
            icon: iconGoogle,
            city: cityName,
          })
        );
        setWeatherData({
          id: id,
          time: new Date().toISOString(),
          temperature,
          icon: iconGoogle,
          city: cityName,
          description: dataWeather.weather[0].description,
        });
        console.log('🌤️ Отримано погоду і записано');
      }
    } catch (error) {
      console.error('❌ Error getting weather data:', error);
    }
  };

  useEffect(() => {
    const savedWeatherData = updatedWeather.find(
      weather => weather.id === id
    );
    if (savedWeatherData && isWeatherDataValid(savedWeatherData.time)) {
      setWeatherData(savedWeatherData);
    } else {
      fetchWeather(address);
    }
  }, [id]);

  const isWeatherDataValid = (time: string): boolean => {
    console.log('Перевіряємо час 🕒');
    const lastUpdate = new Date(time).getTime();
    const timeElapsed = Date.now() - lastUpdate;
    return timeElapsed < 3600000;
  };

  return (
    <div className="relative w-full h-[250px] overflow-hidden rounded-lg">
      {isLoaded && (
        <GoogleMap
          mapContainerStyle={{ width: '101%', height: '101%' }}
          center={{ lat: geoCoords.lat, lng: geoCoords.lng }}
          zoom={geoCoords.comments === 'true' ? 14 : 12}
          options={{
            mapTypeControl: false,
            styles: [],
          }}
        >
          {typeof window !== 'undefined' &&
          typeof window.google !== 'undefined' &&
          typeof window.google.maps !== 'undefined' ? (
            <Marker
              position={{ lat: geoCoords.lat, lng: geoCoords.lng }}
              title={title}
              icon={{
                url: markerIcon.src,
                scaledSize: new window.google.maps.Size(70, 70),
                anchor: new window.google.maps.Point(20, 40),
              }}
            />
          ) : (
            <Marker
              position={{ lat: geoCoords.lat, lng: geoCoords.lng }}
              title={title}
            />
          )}
        </GoogleMap>
      )}
      {weatherData.icon && (
        <div
          className="absolute left-[10px] bottom-[10px] p-[5px] w-[150px] h-[110px] flex flex-col justify-between items-center"
          style={{
            background: 'rgba(0, 0, 0, 0.15)',
            border: '1px solid white',
            borderRadius: '5px',
            backdropFilter: 'blur(30px)',
          }}
        >
          <Text as="p" type="tiny" fontWeight="bold" className="text-center">
            Weather in {weatherData.city}
          </Text>
          <Image
            src={weatherData.icon}
            alt="Weather icon"
            width={60}
            height={60}
            priority
            className="mt-[-10px] mb-[-10px]"
          />
          <Text
            as="p"
            type="normal"
            fontWeight="normal"
            className="text-center"
          >
            {Math.round(weatherData.temperature)}°С
          </Text>
        </div>
      )}
    </div>
  );
};

export default Map;
