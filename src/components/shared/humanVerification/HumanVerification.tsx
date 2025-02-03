import { useState, useEffect } from 'react';
import AirplaneIcon from '../../../images/icon-human/airplane.svg';
import BicycleIcon from '../../../images/icon-human/bicycle.svg';
import BusIcon from '../../../images/icon-human/bus.svg';
import CarIcon from '../../../images/icon-human/car.svg';
import DisplayIcon from '../../../images/icon-human/display.svg';
import EarthIcon from '../../../images/icon-human/earth.svg';
import HelicopterIcon from '../../../images/icon-human/helicopter.svg';
import GasStationIcon from '../../../images/icon-human/gas-station.svg';
import HeartIcon from '../../../images/icon-human/heart.svg';
import ParkIcon from '../../../images/icon-human/park.svg';
import RiverIcon from '../../../images/icon-human/river.svg';
import TaxiIcon from '../../../images/icon-human/taxi.svg';
import ShipIcon from '../../../images/icon-human/ship.svg';
import ScooterIcon from '../../../images/icon-human/scooter.svg';
import TruckIcon from '../../../images/icon-human/truck.svg';
import UfoIcon from '../../../images/icon-human/ufo.svg';
import CompassIcon from '../../../images/icon-human/compass.svg';
import RocketIcon from '../../../images/icon-human/rocket.svg';
import ForkliftIcon from '../../../images/icon-human/forklift.svg';
import ElectricCarIcon from '../../../images/icon-human/electric-car.svg';
import PoliceCarIcon from '../../../images/icon-human/police-car.svg';
import Route66Icon from '../../../images/icon-human/route-66.svg';
import ChainIcon from '../../../images/icon-human/chain.svg';
import SpaceShuttleIcon from '../../../images/icon-human/space-shuttle.svg';
import CanoeIcon from '../../../images/icon-human/canoe.svg';
import EscalatorIcon from '../../../images/icon-human/escalator.svg';
import VeniceIcon from '../../../images/icon-human/venice.svg';
import Text from '../text/text';

type IconType = {
  name: string;
  component: React.FC<React.SVGProps<SVGSVGElement>>;
};

const icons: IconType[] = [
  { name: 'airplane', component: AirplaneIcon },
  { name: 'bicycle', component: BicycleIcon },
  { name: 'bus', component: BusIcon },
  { name: 'car', component: CarIcon },
  { name: 'display', component: DisplayIcon },
  { name: 'earth', component: EarthIcon },
  { name: 'helicopter', component: HelicopterIcon },
  { name: 'gas-station', component: GasStationIcon },
  { name: 'heart', component: HeartIcon },
  { name: 'park', component: ParkIcon },
  { name: 'river', component: RiverIcon },
  { name: 'taxi', component: TaxiIcon },
  { name: 'ship', component: ShipIcon },
  { name: 'scooter', component: ScooterIcon },
  { name: 'truck', component: TruckIcon },
  { name: 'ufo', component: UfoIcon },
  { name: 'compass', component: CompassIcon },
  { name: 'rocket', component: RocketIcon },
  { name: 'forklift', component: ForkliftIcon },
  { name: 'electric-car', component: ElectricCarIcon },
  { name: 'police-car', component: PoliceCarIcon },
  { name: 'route 66', component: Route66Icon },
  { name: 'chain', component: ChainIcon },
  { name: 'space shuttle', component: SpaceShuttleIcon },
  { name: 'canoe', component: CanoeIcon },
  { name: 'escalator', component: EscalatorIcon },
  { name: 'venice', component: VeniceIcon },
];

type HumanVerificationProps = {
  onVerify: (isVerified: boolean) => void;
};

const HumanVerification: React.FC<HumanVerificationProps> = ({ onVerify }) => {
  const [images, setImages] = useState<IconType[]>([]);
  const [isVerified, setIsVerified] = useState(false);
  const [verifiedName, setVerifiedName] = useState('');
  const [targetIcon, setTargetIcon] = useState<IconType | null>(null);

  const getRandomIcons = (): IconType[] => {
    const randomIcons = new Set<IconType>();
    while (randomIcons.size < 5) {
      const randomIcon = icons[Math.floor(Math.random() * icons.length)];
      randomIcons.add(randomIcon);
    }
    return Array.from(randomIcons);
  };

  const resetImages = () => {
    const newIcons = getRandomIcons();
    setImages(newIcons);
    setTargetIcon(newIcons[Math.floor(Math.random() * newIcons.length)]);
  };

  useEffect(() => {
    resetImages();
    setVerifiedName('');
  }, []);

  const handleImageClick = (iconName: string): void => {
    const isCorrect = iconName === targetIcon?.name;
    setIsVerified(isCorrect);
    onVerify(isCorrect);
    if (!isCorrect) {
      resetImages();
      setVerifiedName('');
    } else {
      setVerifiedName(iconName);
    }
  };

  return (
    <div className="w-[300px] regular-border">
      <div className="p-[10px] flex flex-col items-center gap-[10px]">
        <div className="text-center">
          <Text type="small" as="span" fontWeight="normal">
            Please prove you are human by selecting the
          </Text>{' '}
          <Text
            type="small"
            as="span"
            fontWeight="bold"
            className="text-[green]"
          >
            {`${targetIcon?.name}.`}
          </Text>
        </div>
        <div className="flex flex-row items-center gap-[15px]">
          {images.map((icon, index) => (
            <div
              key={index}
              onClick={() => handleImageClick(icon.name)}
              style={{
                cursor: 'pointer',
                border:
                  isVerified && verifiedName === icon.name
                    ? '1px solid green'
                    : '1px solid black',
                color:
                  isVerified && verifiedName === icon.name ? 'green' : 'black',
              }}
              className="p-[5px]"
            >
              <icon.component width={30} height={30} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HumanVerification;
