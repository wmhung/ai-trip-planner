'use client';

import { SignInButton, UserButton, useUser } from '@clerk/nextjs';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { usePathname } from 'next/navigation';
import { useTripDetail } from '../provider';
import { Menu, X } from 'lucide-react';

const menuOptions = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Pricing', path: '/pricing' },
];

function Header() {
  const { setTripDetailInfo } = useTripDetail();
  const { user } = useUser();
  const path = usePathname();

  const [open, setOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [hideHeader, setHideHeader] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Blur after 20px scroll
      setIsScrolled(currentScrollY > 20);

      // Hide header after half page height
      const halfPage = window.innerHeight / 2;
      if (currentScrollY > halfPage && currentScrollY > lastScrollY) {
        setHideHeader(true); // scrolling down
      } else {
        setHideHeader(false); // scrolling up
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const userDisplayName =
    user?.firstName ||
    user?.fullName ||
    user?.username ||
    user?.emailAddresses?.[0]?.emailAddress?.split('@')[0] ||
    'User';

  return (
    <header
      className={`sticky top-0 z-50 transition-transform duration-300 ${
        isScrolled ? 'backdrop-blur-md bg-white/70 shadow-md' : 'bg-white'
      } ${hideHeader ? '-translate-y-full' : 'translate-y-0'}`}
    >
      {/* Top Bar */}
      <div className='flex justify-between items-center p-5'>
        {/* Logo */}
        <div className='flex gap-2 items-center'>
          <Image src='/logo.svg' alt='logo' width={30} height={30} />
          <h2 className='hidden font-bold md:block md:text-xl'>
            Finding Neverland
          </h2>
        </div>

        {/* Desktop Menu */}
        <div className='hidden md:flex gap-5 items-center '>
          {menuOptions.map((menu) => (
            <Link
              className='px-3 py-2 rounded-full transition duration-300 hover:bg-gray-100 '
              key={menu.name}
              href={menu.path}
            >
              <h2>{menu.name}</h2>
            </Link>
          ))}
        </div>

        {/* Desktop Actions */}
        <div className='hidden md:flex gap-2 items-center'>
          {!user ? (
            <SignInButton mode='modal'>
              <Button className='text-black bg-gray-100 hover:bg-gray-100 hover:font-bold rounded-full'>
                Login / Sign Up
              </Button>
            </SignInButton>
          ) : path === '/create-new-trip' ? (
            <Link href='/my-trips'>
              <Button className='rounded-full text-black bg-gray-100 transition duration-300 hover:text-white '>
                My Trips
              </Button>
            </Link>
          ) : (
            <Link href='/create-new-trip'>
              <Button
                className='rounded-full bg-gray-100 text-black transition duration-300 hover:text-white'
                onClick={() => setTripDetailInfo(null)}
              >
                Create New trip
              </Button>
            </Link>
          )}
          <div className='flex items-center mx-2'>
            <UserButton />
          </div>
        </div>

        {/* Mobile Hamburger */}
        <button className='md:hidden' onClick={() => setOpen(!open)}>
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className='md:hidden absolute top-full left-0 w-full bg-white shadow-lg border-t z-50'>
          <div className='flex flex-col gap-4 p-5'>
            {menuOptions.map((menu) => (
              <Link
                key={menu.name}
                href={menu.path}
                onClick={() => setOpen(false)}
              >
                <h2 className='text-lg hover:text-primary'>{menu.name}</h2>
              </Link>
            ))}

            <div className='border-t pt-4 flex flex-col gap-4'>
              {!user ? (
                <SignInButton mode='modal'>
                  <span
                    onClick={() => setOpen(false)}
                    className='text-lg font-medium cursor-pointer hover:text-primary'
                  >
                    Get Started
                  </span>{' '}
                </SignInButton>
              ) : path === '/create-new-trip' ? (
                <Link
                  className='text-lg font-medium hover:text-primary'
                  href='/my-trips'
                  onClick={() => setOpen(false)}
                >
                  <Button>My Trips</Button>
                </Link>
              ) : (
                <Link
                  className='text-lg font-medium hover:text-primary'
                  href='/create-new-trip'
                  onClick={() => {
                    setTripDetailInfo(null);
                    setOpen(false);
                  }}
                >
                  Create New trip
                </Link>
              )}
              <Link
                href='/user'
                onClick={() => setOpen(false)}
                className='text-lg font-medium hover:text-primary'
              >
                <span className='font-bold text-primary'>
                  {userDisplayName}
                </span>
                &apos;s Account
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
