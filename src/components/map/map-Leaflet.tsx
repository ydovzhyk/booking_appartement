'use client';

import { useState, useEffect } from 'react';
import { AiOutlineFullscreen } from 'react-icons/ai';
import { ukrainianCities } from '@/app/add-property/add-property';
import Text from '../shared/text/text';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface MapProps {
  address: string;
  title: string
}

const Map = ({ address, title }: MapProps) => {
  // Кастомна іконка для маркера
  const LeafIcon = L.icon({
    iconUrl:
      'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
    shadowUrl:
      'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [28, 35],
    shadowSize: [41, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  });

  const [coordinates, setCoordinates] = useState<{ lat: number; lon: number }>({
    lat: 50.4501,
    lon: 30.5234,
  });

  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isOverlayVisible, setOverlayVisible] = useState(false);
  const [isRealCoordinates, setIsRealCoordinates] = useState(false);

  const fetchCoordinates = async (fullAddress: string) => {
    const parts = fullAddress.split(',').map(part => part.trim());
    const city = parts[0];
    const street = parts[1] || '';
    const houseNumber = parts[2] || '';

    const formattedAddress =
      `${houseNumber} ${street}, ${city}, Ukraine`.trim();
    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(formattedAddress)}&limit=1&format=json`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.length > 0) {
        const { lat, lon } = data[0];
        setIsRealCoordinates(true);
        return { lat: parseFloat(lat), lon: parseFloat(lon) };
      } else {
        return null;
      }
    } catch (error) {
      return null;
    }
  };

  useEffect(() => {
    setCoordinates({ lat: 50.4501, lon: 30.5234 });
    setIsRealCoordinates(false);

    const getCoordinates = async () => {
      let coords = await fetchCoordinates(address);
      if (!coords) {
        const cityName = address.split(',')[0].trim();

        const cityData = ukrainianCities.find(
          c => c.value.toLowerCase() === cityName.toLowerCase()
        );

        if (cityData) {
          coords = cityData.coordinates;
        } else {
          coords = { lat: 50.4501, lon: 30.5234 };
        }
      }
      setCoordinates(coords);
    };

    getCoordinates();
  }, [address]);

  useEffect(() => {
    let map = L.map('map', { zoomControl: false });
    map.setView([coordinates.lat, coordinates.lon], isRealCoordinates ? 15 : 12);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    L.marker([coordinates.lat, coordinates.lon], { icon: LeafIcon })
      .addTo(map)
      .bindPopup(
        isRealCoordinates
          ? `<div class="custom-popup">
            <h3 style="margin: 0; font-size: 16px; color: #ffcc00;">
              📍 Локація
            </h3>
          </div>`
          : `<div class="custom-popup">
            <h3 style="margin: 0; font-size: 16px; color: #ffcc00;">
              📍 Не локація
            </h3>
          </div>`,
        { minWidth: 150 }
      )
      .openPopup();

    return () => {
      map.remove();
    };
  }, [coordinates, isRealCoordinates]);

  return (
    <>
      {!isFullScreen && (
        <div
          id="MAP"
          className="relative w-full h-[250px] overflow-hidden rounded-lg"
        >
          {/* Кнопка для повноекранного режиму */}
          <button
            onClick={() => setIsFullScreen(true)}
            aria-label="Map full screen mode"
            className="absolute top-[10px] right-[10px] w-[30px] h-[30px] bg-white border border-[var(--accent-background)] z-10 outline-none cursor-pointer flex items-center justify-center"
          >
            <AiOutlineFullscreen className="w-6 h-6" color="black" />
          </button>

          {/* Клік на карту для активації */}
          <div
            className={`absolute top-0 left-0 w-full h-full z-10 bg-transparent ${
              isOverlayVisible ? 'hidden' : 'block'
            }`}
            onClick={() => setOverlayVisible(true)}
          ></div>

          <div className="absolute bottom-2 left-2 test-border">
            <Text as="h2" fontWeight="bold">
              Не коректні координати
            </Text>
          </div>

          {/* Карта */}
          <div
            id="map"
            className="relative w-full h-full"
            onMouseLeave={() => setOverlayVisible(false)}
            style={{ zIndex: '0' }}
          >
            <style>{`.leaflet-control-attribution { display: none !important; }`}</style>
          </div>
        </div>
      )}
    </>
  );
};

export default Map;
