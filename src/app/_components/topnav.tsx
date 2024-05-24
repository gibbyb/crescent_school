import Link from 'next/link';
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs';

export function TopNav() {
    return (
        <nav className="navbar w-full px-6 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
            <div className="container max-w-7xl mx-auto flex items-center justify-between flex-wrap">
                <div className="flex items-center flex-shrink-0">
                    <Link href="/">
                        <img src="/favicon.ico" alt="Crescent School" className="w-12 h-12 mr-2" />
                    </Link>
                    <span className="font-semibold text-xl hidden lg:block">Crescent School</span>
                </div>
                <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
                    <div className="text-sm lg:flex-grow">
                        <Link href="/" className="block lg:inline-block text-white hover:text-gray-400 px-4">
                            Administrative
                        </Link>
                        <Link href="/" className="block lg:inline-block text-white hover:text-gray-400 px-4">
                            Gaming
                        </Link>
                        <Link href="/" className="block lg:inline-block text-white hover:text-gray-400 px-4">
                            Bartending
                        </Link>
                        <Link href="/" className="block lg:inline-block text-white hover:text-gray-400 px-4">
                            Special Programs
                        </Link>
                        <Link href="/" className="block lg:inline-block text-white hover:text-gray-400 px-4">
                            Disbursements
                        </Link>
                        <Link href="/" className="block lg:inline-block text-white hover:text-gray-400 px-4">
                            Reports
                        </Link>
                    </div>
                    <div>
                        <Link href="/" className="inline-block text-sm px-4 py-2 leading-none border rounded 
                        text-white border-white hover:border-transparent hover:text-gray-400 hover:bg-white mt-4 lg:mt-0">
                          <SignedOut><SignInButton/></SignedOut>
                          <SignedIn><UserButton/></SignedIn>
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}

