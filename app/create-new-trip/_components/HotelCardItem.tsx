'use client';

import React, { useEffect, useState } from 'react';
import { Hotel } from './ChatBox';
import Image from 'next/image';
import { Star, WalletCards } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import axios from 'axios';

type Props = { hotel: Hotel };

export default function HotelCardItem({ hotel }: Props) {
  const [photoUrl, setPhotoUrl] = useState<string>();
  useEffect(() => {
    hotel && GetGooglePlaceDetail();
  }, [hotel]);

  const GetGooglePlaceDetail = async () => {
    const result = await axios.post('/api/google-place-detail', {
      placeName: hotel?.hotel_name,
    });
    if (result?.data?.e) {
      return;
    }
    setPhotoUrl(result?.data);
  };

  return (
    <div className='bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden'>
      <div className='relative w-full h-48'>
        <Image
          className=' object-cover mb-2'
          src={photoUrl ? photoUrl : '/placeholder.jpg'}
          alt={hotel?.hotel_name || 'Hotel Image'}
          fill
        />
      </div>
      <div className='p-4 flex flex-col gap-2'>
        <h2 className='font-semibold text-lg'>{hotel?.hotel_name}</h2>
        <h2 className='text-gray-500'>{hotel?.hotel_address}</h2>
        <div className='flex justify-between items-center'>
          <p className='flex text-primary gap-2'>
            <WalletCards /> {hotel?.price_per_night}
          </p>
          <p className='flex font-semibold text-lg gap-2'>
            <Star className='text-yellow-600' /> {hotel?.rating}
          </p>
        </div>
        <Link
          href={`https://www.google.com/maps/search/?api=1&query=${hotel?.hotel_name}`}
          target='_blank'
          rel='noopener noreferrer'
        >
          <Button variant={'outline'} className='w-full mt-2'>
            View
          </Button>
        </Link>
      </div>
    </div>
  );
}
