import { CalendarDaysIcon, HomeIcon, UserIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';
import { SignOutButton } from './SignOutButton';

const navLinks = [
  {
    name: "Home",
    href: "/account",
    icon: <HomeIcon className="h-5 w-5 text-primary-600" />,
  },
  {
    name: "Reservations",
    href: "/account/reservations",
    icon: <CalendarDaysIcon className="h-5 w-5 text-primary-600" />,
  },
  {
    name: "Guest profile",
    href: "/account/profile",
    icon: <UserIcon className="h-5 w-5 text-primary-600" />,
  },
];

export default function SideNavigation() {
  return (
    <nav>
      <ul className='flex flex-col gap-2 h-full text-lg'>
        {navLinks.map((link) => (
          <li key={link.name}>             
          <Link
            className={`py-3 px-3 hover:bg-primary-900 hover:text-primary-100 transition-colors flex items-center gap-4 font-semibold text-primary-200`}
            href={link.href}
          >
            {link.icon}
            <span>{link.name}</span>
          </Link></li>
        ))}
        <li className="mt-auto"><SignOutButton/></li>
      </ul>
    </nav>
  );
}