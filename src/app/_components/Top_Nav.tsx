import Link from 'next/link';
import Image from 'next/image';
import { SignInAZURE } from './auth/sign_in_azure';

export async function TopNav() {
  return (
    <nav className="navbar flex items-center justify-between 
    px-5 bg-gradient-to-br from-indigo-800 to-purple-800">

      <div className="logo_title inline-flex">
        <Image src="/favicon.ico" alt="Crescent School"
        width={72} height={72} className="logo mr-2 my-2" />
        <div className="title font-semibold text-xl w-52 m-auto">
          Crescent School of Gaming & Bartending
        </div>
      </div>

      <ul className="nav-links">
        <input type="checkbox" id="nav-toggle" className="nav-toggle hidden" />
        <label htmlFor="nav-toggle" className="hamburger hidden 
        text-5xl select-none">&#9776;</label>
        <div className="menu flex gap-4 text-lg">

          <li className="nav-item hover:text-gray-400 transition
          ease-in duration-300 px-1 py-3 relative">
            <Link href="/" className="">Administrative</Link>
            <ul className="dropdown bg-slate-500 absolute hidden rounded top-9">
              <li className="px-2 py-4 w-32 text-center hover:bg-slate-800">
                <Link href="/" className="">Dropdown #1</Link>
              </li> 
            </ul>
          </li>

          <li className="nav-item hover:text-gray-400 transition
          ease-in duration-300 px-1 py-3 relative">
            <Link href="/" className="">Gaming</Link>
            <ul className="dropdown bg-slate-500 absolute hidden rounded top-9">
              <li className="px-2 py-4 w-32 text-center hover:bg-slate-800">
                <Link href="/" className="">Dropdown #1</Link>
              </li> 
            </ul>
          </li>

          <li className="nav-item hover:text-gray-400 transition
          ease-in duration-300 px-1 py-3 relative">
            <Link href="/" className="">Bartending</Link>
            <ul className="dropdown bg-slate-500 absolute hidden rounded top-9">
              <li className="px-2 py-4 w-32 text-center hover:bg-slate-800">
                <Link href="/" className="">Dropdown #1</Link>
              </li> 
            </ul>
          </li>

          <li className="nav-item hover:text-gray-400 transition
          ease-in duration-300 px-1 py-3 relative">
            <Link href="/" className="">Special Programs</Link>
            <ul className="dropdown bg-slate-500 absolute hidden rounded top-9">
              <li className="px-2 py-4 w-32 text-center hover:bg-slate-800">
                <Link href="/" className="">Dropdown #1</Link>
              </li> 
            </ul>
          </li>

          <li className="nav-item hover:text-gray-400 transition
          ease-in duration-300 px-1 py-3 relative">
            <Link href="/" className="">Disbursements</Link>
            <ul className="dropdown bg-slate-500 absolute hidden rounded top-9">
              <li className="px-2 py-4 w-32 text-center hover:bg-slate-800">
                <Link href="/" className="">Dropdown #1</Link>
              </li> 
            </ul>
          </li>
          
          <li className="nav-item hover:text-gray-400 transition
          ease-in duration-300 px-1 py-3 relative">
            <Link href="/" className="">Reports</Link>
            <ul className="dropdown bg-slate-500 absolute hidden rounded top-9">
              <li className="px-2 py-4 w-32 text-center hover:bg-slate-800">
                <Link href="/" className="">Dropdown #1</Link>
              </li> 
            </ul>
          </li>

        </div>
      </ul>
      < SignInAZURE />
    </nav>
  );
}
