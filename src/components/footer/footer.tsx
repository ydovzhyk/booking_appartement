'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Logo from '../shared/logo/logo';
import Text from '../shared/text/text';
import { FaXTwitter } from 'react-icons/fa6';
import { MdOutlineEmail } from 'react-icons/md';
import { FaPhoneVolume } from 'react-icons/fa6';
import { FaWhatsapp } from 'react-icons/fa';
import { FaTelegram } from 'react-icons/fa';
import { SlLocationPin } from 'react-icons/sl';
import { CiFacebook } from 'react-icons/ci';
import { IoLogoInstagram } from 'react-icons/io5';
import { FiYoutube } from 'react-icons/fi';

const allowedRoutes = ['/', '/about', '/articles'];

const isAllowedRoute = (pathname: string) => {
  return allowedRoutes.some(
    route => route === pathname || pathname.startsWith('/articles')
  );
};

const socialLinks = [
  { name: 'Twitter', icon: <FaXTwitter size={20} />, url: '#' },
  { name: 'Facebook', icon: <CiFacebook size={24} />, url: '#' },
  { name: 'Instagram', icon: <IoLogoInstagram size={22} />, url: '#' },
  { name: 'YouTube', icon: <FiYoutube size={22} />, url: '#' },
];

const supportLinks = [
  { name: 'Manage your trips', url: '#' },
  { name: 'Contact Customer Service', url: '#' },
  { name: 'Safety resource centre', url: '#' },
];

const contactsLinks = [
  {
    name: '+380503562938',
    icon: <FaPhoneVolume size={20} />,
    url: 'tel:+380503562938',
  },
  {
    name: 'Whatsapp',
    icon: <FaWhatsapp size={24} />,
    url: 'https://wa.me/380503562938',
  },
  {
    name: 'Telegram',
    icon: <FaTelegram size={22} />,
    url: 'https://t.me/yourusername',
  },
  {
    name: 'ydovzhyk@gmail.com',
    icon: <MdOutlineEmail size={22} />,
    url: 'mailto:ydovzhyk@gmail.com',
  },
  {
    name: 'Ukraine, Kyiv',
    icon: <SlLocationPin size={22} />,
    url: 'https://maps.google.com/?q=Kyiv,Ukraine',
  },
];

const Footer = () => {
  const pathname = usePathname();
  const showHeaderFooter = pathname ? isAllowedRoute(pathname) : false;

  return !showHeaderFooter ? null : (
    <footer className="bg-[var(--accent-background)] pt-[50px] pb-[20px]">
      <div className="container">
        <div className="flex flex-col gap-[20px]">
          <div className="flex flex-col md:flex-row justify-between">
            <div>
              <Logo width={170} height={40} />
            </div>

            <div className="w-[25%] relative ">
              <div className="absolute flex flex-row w-8 h-auto">
                <div className="flex items-center justify-center w-[31px] h-[104px] ">
                  <Text
                    type="extraSmall"
                    as="p"
                    className="text-white normal-case -rotate-90 whitespace-nowrap "
                  >
                    SOCIAL MEDIA
                  </Text>
                </div>
              </div>
              <ul className="ml-[45px] flex flex-col gap-3 z-10">
                {socialLinks.map(({ name, icon, url }) => (
                  <li key={name} className="w-full group cursor-pointer">
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-5 text-white group-hover:text-[var(--accent)] hover-transition"
                    >
                      {icon}
                      <Text
                        type="small"
                        as="p"
                        fontWeight="thin"
                        className="text-base"
                      >
                        {name}
                      </Text>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="w-[25%] relative ">
              <div className="absolute flex flex-row w-8 h-auto">
                <div className="flex items-center justify-center w-[31px] h-[65px] ">
                  <Text
                    type="extraSmall"
                    as="p"
                    className="text-white normal-case -rotate-90 whitespace-nowrap "
                  >
                    SUPPORT
                  </Text>
                </div>
              </div>
              <ul className="ml-[45px] flex flex-col gap-3 z-10">
                {supportLinks.map(({ name, url }) => (
                  <li key={name} className="w-full group cursor-pointer">
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-5 text-white group-hover:text-[var(--accent)] hover-transition"
                    >
                      <Text
                        type="small"
                        as="p"
                        fontWeight="thin"
                        className="text-base"
                      >
                        {name}
                      </Text>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="w-[25%] relative ">
              <div className="absolute flex flex-row w-8 h-auto">
                <div className="flex items-center justify-center w-[31px] h-[77px] ">
                  <Text
                    type="extraSmall"
                    as="p"
                    className="text-white normal-case -rotate-90 whitespace-nowrap "
                  >
                    CONTACTS
                  </Text>
                </div>
              </div>
              <ul className="ml-[45px] flex flex-col gap-3 z-10">
                {contactsLinks.map(({ name, icon, url }) => (
                  <li key={name} className="w-full group cursor-pointer">
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-5 text-white group-hover:text-[var(--accent)] hover-transition"
                    >
                      {icon}
                      <Text
                        type="small"
                        as="p"
                        fontWeight="thin"
                        className="text-base"
                      >
                        {name}
                      </Text>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border-t border-white opacity-40"></div>

          <div className="flex justify-between">
            <Text type="extraSmall" as="p" className="text-white normal-case">
              Copyright © 2024–2025 appartement.com™. All rights reserved.
            </Text>
            <a className="mr-10 group cursor-pointer">
              <Text
                type="extraSmall"
                as="p"
                className="text-white group-hover:text-[var(--accent)] hover-transition"
              >
                Privacy Policy
              </Text>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
