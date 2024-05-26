import Link from 'next/link';
import Image from 'next/image';
import { SignInAZURE } from './auth/sign_in_azure';
//import { SignInGH } from './auth/sign_in_gh';
import { Nav_Items } from "./ui/Navigation_Menu";

export async function Nav_Bar() {
  return (
    <div className="navbar p-3">
      <nav className="navbar w-11/12 m-auto flex items-center justify-between px-5 py-3
      bg-gradient-to-br from-gray-950 to-slate-950 text-white border-2 border-slate-800 rounded-md">
        <Link href="/">
          <div className="logo_title inline-flex px-8">
            <Image src="/favicon.ico" alt="Crescent Logo" width={72}
              height={72} className="logo mr-6 my-2"
            />
            <div className="title font-semibold text-xl w-52 m-auto">
              Crescent School of Gaming & Bartending
            </div>
          </div>
        </Link>
        <Nav_Items />
        <SignInAZURE />
      </nav>
    </div>
  );
}
