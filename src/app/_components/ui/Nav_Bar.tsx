import Link from 'next/link';
import Image from 'next/image';
import { Nav_Items } from "~/app/_components/ui/Navigation_Menu";
import { User_Menu } from "~/app/_components/ui/User_Menu";
import { Search_Students_Drawer } from "~/app/_components/ui/Search_Students_Drawer";

export async function Nav_Bar() {
  return (
    <div className="navbar p-3">
      <nav className="navbar w-5/6 px-6 m-auto flex items-center
        justify-between bg-gradient-to-br from-gray-800 to-slate-950 text-white border-2 border-slate-800 rounded-2xl">
        <Link href="/">
          <div className="logo_title inline-flex pl-2">
            <Image src="/logo.png" alt="Crescent Logo" width={72}
              height={72} className="logo mr-4 my-2"
            />
            <div className="title font-semibold text-xl w-52 m-auto">
              Crescent School of Gaming & Bartending
            </div>
          </div>
        </Link>
        <Nav_Items />
        <Search_Students_Drawer />
        <User_Menu />
      </nav>
    </div>
  );
}
