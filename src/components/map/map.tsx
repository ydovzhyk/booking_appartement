'use client';

import { useState, useEffect } from 'react';
import {
  GoogleMap,
  LoadScript,
  Marker,
  useJsApiLoader,
  Libraries,
} from '@react-google-maps/api';
import { ukrainianCities } from '@/app/add-property/add-property';
import Image from 'next/image';
import Text from '../shared/text/text';
import markerIcon from '../../images/pin.png';

interface MapProps {
  address: string;
  title: string;
}

const GOOGLE_MAPS_API_KEY = 'AIzaSyAe8LgD2Pc3BC2hmnxfVPEAwRQkRI60Hpk';
const GOOGLE_MAPS_WEATHER_API_KEY = '1828ad4fcb19ab8b229ab979593d6cc7';
const LIBRARIES: Libraries = [
  'places', // Автодоповнення місць та пошук
  'geometry', // Робота з геометрією (відстані, площі, тощо)
  'drawing', // Інструменти малювання на карті (лінії, маркери, полігони)
  'visualization', // Теплові карти (heatmaps) // Контекст місць поблизу
  'maps', // Основна карта (іноді використовується для деяких API)
];



const Map = ({ address, title }: MapProps) => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
    libraries: LIBRARIES,
  });

  const [coordinates, setCoordinates] = useState<{ lat: number; lng: number }>({
    lat: 50.4501,
    lng: 30.5234,
  });
  const [weather, setWeather] = useState({
    city: '',
    temperature: 0,
    icon: '',
  });
  const [isRealCoordinates, setIsRealCoordinates] = useState(false);

  // Функція отримання координат і погоди
  const fetchCoordinates = async (fullAddress: string) => {
    const parts = fullAddress.split(',').map(part => part.trim());
    const city = parts[0];
    const street = parts[1] || '';
    const houseNumber = parts[2] || '';

    const formattedAddress =
      `${houseNumber} ${street}, ${city}, Ukraine`.trim();

    const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      formattedAddress
    )}&key=${GOOGLE_MAPS_API_KEY}`;

    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${GOOGLE_MAPS_WEATHER_API_KEY}`;

    try {
      const responseGeocode = await fetch(geocodeUrl);
      const responseWeather = await fetch(weatherUrl);

      const dataGeo = await responseGeocode.json();
      const dataWeather = await responseWeather.json();

      if (dataWeather) {
        const { main } = dataWeather.weather[0];
        const temperature = dataWeather.main.temp;
        const iconGoogle = `https://openweathermap.org/img/wn/${dataWeather.weather[0]['icon']}@2x.png`;

        setWeather({city: city, temperature: temperature, icon: iconGoogle});
        console.log('🌤️ Отримано погоду:', dataWeather);
      }

      if (dataGeo.results.length > 0) {
        const { lat, lng } = dataGeo.results[0].geometry.location;
        console.log('🌍 Отримано координати:', lat, lng);
        setCoordinates({ lat, lng });
        setIsRealCoordinates(true);
      } else {
        const cityData = ukrainianCities.find(
          c => c.value.toLowerCase() === city.toLowerCase()
        );
        const cityCoords = cityData
          ? { lat: cityData.coordinates.lat, lng: cityData.coordinates.lon }
          : { lat: 50.4501, lng: 30.5234 };
        console.log('🌍 Координати міста:', cityCoords);
        setCoordinates(cityCoords);
      }
    } catch (error) {
      console.error('❌ Error getting google data:', error);
    }
  };

  useEffect(() => {
    const getCoordinates = async () => {
      await fetchCoordinates(address);
    };
    getCoordinates();
  }, [coordinates]);

  return (
    <div className="relative w-full h-[250px] overflow-hidden rounded-lg">
      {isLoaded && (
        <GoogleMap
          mapContainerStyle={{ width: '101%', height: '101%' }}
          center={{ lat: coordinates.lat, lng: coordinates.lng }}
          zoom={isRealCoordinates ? 16 : 12}
          options={{
            mapTypeControl: false,
            styles: [],
          }}
        >
          {typeof window !== 'undefined' &&
          typeof window.google !== 'undefined' &&
          typeof window.google.maps !== 'undefined' ? (
            <Marker
              position={{ lat: coordinates.lat, lng: coordinates.lng }}
              title={title}
              icon={{
                url: markerIcon.src,
                scaledSize: new window.google.maps.Size(70, 70),
                anchor: new window.google.maps.Point(20, 40),
              }}
            />
          ) : (
            <Marker
              position={{ lat: coordinates.lat, lng: coordinates.lng }}
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
        <Text
          as="p"
          type="tiny"
          fontWeight="bold"
          className="text-center"
        >
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
        <Text
          as="p"
          type="normal"
          fontWeight="normal"
          className="text-center"
        >
          {Math.round(weather.temperature)}°С
        </Text>
      </div>
    </div>
  );
};

export default Map;
