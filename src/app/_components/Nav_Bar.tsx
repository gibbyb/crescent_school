
import Link from 'next/link';
import Image from 'next/image';
import { SignInAZURE } from './auth/sign_in_azure';

const navItems = [
  {
    label: "Administrative",
    href: "/",
    subItems: [
      { label: "Admissions", href: "/forms/administrative/admissions" },
      { label: "Student Info", href: "/" },
      { label: "Accounting", href: "/" },
      { label: "Cash Receipts", href: "/" },
      { label: "Placement", href: "/" },
    ],
  },
  {
    label: "Gaming",
    href: "/",
    subItems: [
      { label: "Gaming Menu", href: "/" },
      { label: "Attendance", href: "/" },
      { label: "All Game Evaluation Report", href: "/" },
      { label: "Two Game Evaluation Report", href: "/" },
    ],
  },
  {
    label: "Bartending",
    href: "/",
    subItems: [
      { label: "Attendance", href: "/" },
      { label: "Bar Menu", href: "/" },
      { label: "Bar Management Evaluation", href: "/" },
    ],
  },
  {
    label: "Special Programs",
    href: "/",
    subItems: [
      { label: "WIN", href: "/" },
      { label: "Badges", href: "/" },
      { label: "Badge Report", href: "/" },
    ],
  },
  {
    label: "Disbursements",
    href: "/",
    subItems: [
      { label: "Default Management Report", href: "/" },
    ],
  },
  {
    label: "Reports",
    href: "/",
    subItems: [
      { label: "Admissions", href: "/" },
      // Admissions submenu: Appointment, Call Report, Status Report
      { label: "Accounting", href: "/" },
      // Accounting submenu: History Report, Collects Report, Director's Report
      { label: "Student Info", href: "/" },
      // Student Info submenu: Studen Info Report, ipedsfrm
      { label: "Financial Aid", href: "/" },
      // Financial Aid submenu: Financial Aid List Reports, Disbursement Report,
      //   Living Expenses Report, 14 Day Report, ipdsfrm, Gainful Employment
      { label: "Statistics", href: "/" },
      // Statistics submenu: CHART GRD/DRP, CHART REF/Enrolled, Active Students Report,
      //   New Stats
    ],
  },
];

export async function Nav_Bar() {
  return (
    <nav className="navbar flex items-center justify-between px-5
    bg-gradient-to-br from-purple-950 to-indigo-950">
      <Link href="/">
        <div className="logo_title inline-flex">
          <Image src="/favicon.ico" alt="Crescent Logo" width={72}
            height={72} className="logo mr-2 my-2"
          />
          <div className="title font-semibold text-xl w-52 m-auto">
            Crescent School of Gaming & Bartending
          </div>
        </div>
      </Link>
      <ul className="nav-links">
        <input type="checkbox" id="nav-toggle" className="nav-toggle hidden" />
        <label htmlFor="nav-toggle" className="hamburger
          hidden text-5xl select-none mr-72">&#9776;
        </label>
        <div className="menu flex gap-4 text-lg">
          {navItems.map((item, index) => (
            <li key={index} className="nav-item hover:text-gray-300
              transition ease-in duration-300 px-1 py-3 relative">
              <Link href={item.href}>{item.label}</Link>
              <ul className="dropdown bg-gradient-to-br from-gray-900 to-indigo-950 absolute hidden text-white rounded-xl top-9">
                {item.subItems.map((subItem, subIndex) => (
                  <li key={subIndex} className="px-2 py-4
                    w-32 text-center hover:bg-gradient-to-tr from-indigo-800 to-gray-800 rounded-xl">
                    <Link href={subItem.href}>{subItem.label}</Link>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </div>
      </ul>
      <SignInAZURE />
    </nav>
  );
}

