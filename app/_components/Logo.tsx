import Image from "next/image";
import Link from "next/link";
import logo from "@/public/logo.png";
import { Paths } from '../_constants/paths';

export default function Logo() {
  return <Link href={Paths.MAIN} className="flex items-center ml-2 gap-4 m z-10 w-16 h-16 sm:w-auto">
    <Image
      src={logo}
      height="60"
      quality={100}
      width="60"
      alt="The Wildhood Oasis logo"
    />
    <span className="hidden sm:block sm:text-xl sm:font-semibold sm:text-primary-100">
      The Wildhood Oasis
    </span>
  </Link>
}