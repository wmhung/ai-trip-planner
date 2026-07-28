'use client';

import { SignInButton, UserButton, useUser } from '@clerk/nextjs';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { usePathname } from 'next/navigation';
import { useTripDetail } from '../provider';

const menuOptions = [
  { name: 'Home', path: '/' },
  { name: 'Pricing', path: '/pricing' },
  { name: 'FAQS', path: '/faqs' },
];

function Header() {
  const { tripDetailInfo, setTripDetailInfo } = useTripDetail();

  const { user } = useUser();
  const path = usePathname();

  return (
    <div className='flex justify-between items-center p-5'>
      {/* Logo */}
      <div className='flex gap-2 items-center'>
        <Image src={'/logo.svg'} alt='logo' width={30} height={30} />
        <h2 className='hidden font-bold md:block md:text-xl'>
          Finding Neverland
        </h2>
      </div>
      {/* Menu */}
      <div className='flex gap-5 items-center'>
        {menuOptions.map((menu, index) => (
          <Link key={menu.name} href={menu.path}>
            <h2 className='text-lg hover:text-primary'>{menu.name}</h2>
          </Link>
        ))}
      </div>
      {/* Get Started Button */}
      <div className='flex gap-5 items-center'>
        {!user ? (
          <SignInButton mode='modal'>
            <Button>Get Started</Button>
          </SignInButton>
        ) : path == '/create-new-trip' ? (
          <Link href={'/my-trips'}>
            <Button>My Trips</Button>
          </Link>
        ) : (
          <Link href={'/create-new-trip'}>
            <Button onClick={() => setTripDetailInfo(null)}>
              Create New trip
            </Button>
          </Link>
        )}
        <UserButton />
      </div>
    </div>
  );
}

export default Header;
