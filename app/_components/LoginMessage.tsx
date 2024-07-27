import Link from "next/link";
import { Paths } from '../_constants/paths';

export const  LoginMessage = () => {
  return (
    <div className="grid bg-primary-800 ">
      <p className="text-center text-xl py-12 self-center">
        Please{" "}
        <Link href={Paths.LOGIN} className="underline text-accent-500">
          login
        </Link>{" "}
        to reserve this
        <br /> cabin right now
      </p>
    </div>
  );
}

