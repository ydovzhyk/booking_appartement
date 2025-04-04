'use client';

import Text from '@/components/shared/text/text';
import freeWiFi from '../../../../public/images/services_icons/free_wi-fi.png';
import airportShuttle from '../../../../public/images/services_icons/airport_shuttle.png';
import bathRoom from '../../../../public/images/services_icons/bath_room.png';
import cityCenter from '../../../../public/images/services_icons/city_center.png';
import conditioner from '../../../../public/images/services_icons/conditioner.png';
import familyRooms from '../../../../public/images/services_icons/family_rooms.png';
import fireplace from '../../../../public/images/services_icons/fireplace.png';
import gardenView from '../../../../public/images/services_icons/garden_view.png';
import gym from '../../../../public/images/services_icons/gym.png';
import historicCityCenter from '../../../../public/images/services_icons/historic_city_center.png';
import householdAppliances from '../../../../public/images/services_icons/household_appliances.png';
import kingSizeBedroom from '../../../../public/images/services_icons/king_size_bedroom.png';
import lift from '../../../../public/images/services_icons/lift.png';
import nearMetro from '../../../../public/images/services_icons/near_metro.png';
import nearBusStop from '../../../../public/images/services_icons/near_bus_stop.png';
import netflixTV from '../../../../public/images/services_icons/netflix_TV.png';
import nonSmokingRoom from '../../../../public/images/services_icons/non_smoking_rooms.png';
import petsAllowed from '../../../../public/images/services_icons/pets_allowed.png';
import privateBeach from '../../../../public/images/services_icons/private_beach.png';
import privateParking from '../../../../public/images/services_icons/private_parking.png';
import seaView from '../../../../public/images/services_icons/sea_view.png';
import selfCheckIn from '../../../../public/images/services_icons/self_check-in.png';
import sharedBathroom from '../../../../public/images/services_icons/shared_bathroom.png';
import swimmingPool from '../../../../public/images/services_icons/swimming_pool.png';
import terrace from '../../../../public/images/services_icons/terrace.png';
import nearSupermarket from '../../../../public/images/services_icons/near_supermarket.png';

export const services = [
  { icon: freeWiFi, name: 'Free Wi-Fi' },
  { icon: airportShuttle, name: 'Airport Shuttle' },
  { icon: bathRoom, name: 'Private Bathroom' },
  { icon: cityCenter, name: 'City Center' },
  { icon: conditioner, name: 'Air Conditioning' },
  { icon: familyRooms, name: 'Family Rooms' },
  { icon: fireplace, name: 'Fireplace' },
  { icon: gardenView, name: 'Garden View' },
  { icon: gym, name: 'Gym' },
  { icon: historicCityCenter, name: 'Historic City Center' },
  { icon: householdAppliances, name: 'Fully Equipped' },
  { icon: kingSizeBedroom, name: 'King Size Bed' },
  { icon: lift, name: 'Lift / Elevator' },
  { icon: nearMetro, name: 'Near Metro Station' },
  { icon: nearBusStop, name: 'Near Bus Stop' },
  { icon: netflixTV, name: 'Netflix / Smart TV' },
  { icon: nonSmokingRoom, name: 'Non-Smoking Room' },
  { icon: petsAllowed, name: 'Pets Allowed' },
  { icon: privateBeach, name: 'Private Beach' },
  { icon: privateParking, name: 'Private Parking' },
  { icon: seaView, name: 'Sea View' },
  { icon: selfCheckIn, name: 'Self Check-In' },
  { icon: sharedBathroom, name: 'Shared Bathroom' },
  { icon: swimmingPool, name: 'Swimming Pool' },
  { icon: terrace, name: 'Terrace' },
  { icon: nearSupermarket, name: 'Near Supermarket' },
];

interface ServiceProps {
  icon: any;
  name: string;
  isChecked: boolean;
  onToggle?: (name: string) => void;
  mode: 'select' | 'view';
}

const Service: React.FC<ServiceProps> = ({
  icon,
  name,
  isChecked,
  onToggle,
  mode,
}) => {
  return (
    <div
      className={`flex flex-row items-center gap-[20px]
      ${mode === 'select' ? 'p-[10px] cursor-pointer border rounded-[5px] ' : 'p-[5px] border border-gray-200 shadow rounded-lg'}
      ${isChecked ? 'border-[#0f1d2d]' : 'border-gray-300'}`}
      onClick={() => mode === 'select' && onToggle && onToggle(name)}
    >
      {mode === 'select' && (
        <div
          className={`w-5 h-5 border border-gray-400 flex items-center justify-center transition-all
            ${isChecked ? 'bg-[#0f1d2d] border-[#0f1d2d] text-white' : 'bg-white'}`}
        >
          {isChecked && <span className="text-white text-sm font-bold">✓</span>}
        </div>
      )}
      <img
        src={icon.src}
        alt={name}
        className={`${mode === 'select' ? 'w-10 h-10' : 'w-6 h-6'}`}
      />
      <Text type="small" fontWeight="normal" className="text-center mt-[3px]">
        {name}
      </Text>
    </div>
  );
};

interface ServicesPartProps {
  selectedServices?: string[];
  setSelectedServices?: React.Dispatch<React.SetStateAction<string[]>>;
  mode: 'select' | 'view';
  servicesArray?: string[];
}

const ServicesPart: React.FC<ServicesPartProps> = ({
  selectedServices = [],
  setSelectedServices,
  mode,
  servicesArray = [],
}) => {
  const handleToggle = (serviceName: string) => {
    if (mode === 'select' && setSelectedServices) {
      setSelectedServices((prev: string[]) =>
        prev.includes(serviceName)
          ? prev.filter((name: string) => name !== serviceName)
          : [...prev, serviceName]
      );
    }
  };

  return (
    <div className="w-full flex flex-col gap-[20px]">
      {mode === 'select' ? (
        <Text type="regular" as="span" fontWeight="normal">
          Select the service options that are relevant to your accommodation:
        </Text>
      ) : (
        <Text type="regular" as="span" fontWeight="bold">
          Available Services:
        </Text>
      )}

      <div
        className={`grid grid-cols-2 md:grid-cols-3 ${mode === 'view' ? 'lg:grid-cols-3 px-[20px] gap-[15px]' : 'lg:grid-cols-4 gap-[20px]'}`}
      >
        {services
          .filter(service =>
            mode === 'select' ? true : servicesArray.includes(service.name)
          )
          .map((service, index) => (
            <Service
              key={index}
              icon={service.icon}
              name={service.name}
              isChecked={
                mode === 'select'
                  ? selectedServices.includes(service.name)
                  : true
              }
              onToggle={mode === 'select' ? handleToggle : undefined}
              mode={mode}
            />
          ))}
      </div>
    </div>
  );
};

export default ServicesPart;
