import { ukrainianCities } from '@/app/add-property/add-property';

export const fetchCoordinates = async (
  fullAddress: string
): Promise<{ lat: number; lng: number; comments: string }> => {
  const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '';

  const parts = fullAddress.split(',').map(part => part.trim());
  const city = parts[0];
  const street = parts[1] || '';
  const houseNumber = parts[2] || '';

  const formattedAddress = `${houseNumber} ${street}, ${city}, Ukraine`.trim();

  const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
    formattedAddress
  )}&key=${GOOGLE_MAPS_API_KEY}`;

  try {
    const responseGeocode = await fetch(geocodeUrl);
    const dataGeo = await responseGeocode.json();

    if (dataGeo.results.length > 0) {
      const { lat, lng } = dataGeo.results[0].geometry.location;
      return { lat: lat, lng: lng, comments: 'true' };
    }
  } catch (error) {
    console.error('❌ Error getting google data:', error);
  }

  const cityData = ukrainianCities.find(
    c => c.value.toLowerCase() === city.toLowerCase()
  );

  return cityData
    ? {
        lat: cityData.coordinates.lat,
        lng: cityData.coordinates.lon,
        comments: 'false',
      }
    : { lat: 50.4501, lng: 30.5234, comments: 'false' };
};
