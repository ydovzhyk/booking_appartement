'use client';

import { useState, useEffect } from 'react';
import {
  GoogleMap,
  Marker,
  useJsApiLoader,
  Libraries,
} from '@react-google-maps/api';
import Image from 'next/image';
import Text from '../shared/text/text';
import markerIcon from '../../images/pin.png';

const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '';
const GOOGLE_MAPS_WEATHER_API_KEY =
  process.env.NEXT_PUBLIC_GOOGLE_MAPS_WEATHER_API_KEY || '';
const LIBRARIES: Libraries = [
  'places', // Автодоповнення місць та пошук
  'geometry', // Робота з геометрією (відстані, площі, тощо)
  'drawing', // Інструменти малювання на карті (лінії, маркери, полігони)
  'visualization', // Теплові карти (heatmaps) // Контекст місць поблизу
  'maps', // Основна карта (іноді використовується для деяких API)
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
}

const defaultGeoCoords: GeoCoords = {
  lat: 50.4501,
  lng: 30.5234,
  comments: 'false',
};

const Map = ({ address, title, geoCoords = defaultGeoCoords }: MapProps) => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
    libraries: LIBRARIES,
  });

  const [weather, setWeather] = useState({
    city: '',
    temperature: 0,
    icon: '',
  });

  // Функція отримання погоди
  const fetchWeather = async (fullAddress: string) => {
    const parts = fullAddress.split(',').map(part => part.trim());
    const city = parts[0];

    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${GOOGLE_MAPS_WEATHER_API_KEY}`;

    try {
      const responseWeather = await fetch(weatherUrl);
      const dataWeather = await responseWeather.json();
      if (dataWeather) {
        const temperature = dataWeather.main.temp;
        const iconGoogle = `https://openweathermap.org/img/wn/${dataWeather.weather[0]['icon']}@2x.png`;

        setWeather({ city: city, temperature: temperature, icon: iconGoogle });
        // console.log('🌤️ Отримано погоду:', dataWeather);
      }
    } catch (error) {
      console.error('❌ Error getting weather data:', error);
    }
  };

  useEffect(() => {
    const getWeather = async () => {
      await fetchWeather(address);
    };
    getWeather();
  }, [weather]);

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
          Weather in {weather.city}
        </Text>
        {weather.icon && (
          <Image
            src={weather.icon}
            alt="Weather icon"
            width={60}
            height={60}
            priority
            className="mt-[-10px] mb-[-10px]"
          />
        )}
        <Text as="p" type="normal" fontWeight="normal" className="text-center">
          {Math.round(weather.temperature)}°С
        </Text>
      </div>
    </div>
  );
};

export default Map;
