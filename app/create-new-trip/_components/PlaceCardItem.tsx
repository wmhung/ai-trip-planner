'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Ticket, Clock, Eye, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Activity } from './ChatBox';
import axios from 'axios';

type Props = { activity: Activity };

function PlaceCardItem({ activity }: Props) {
  const [photoUrl, setPhotoUrl] = useState<string>();
  useEffect(() => {
    activity && GetGooglePlaceDetail();
  }, [activity]);

  const GetGooglePlaceDetail = async () => {
    const result = await axios.post('/api/google-place-detail', {
      placeName: activity?.place_name + ':' + activity?.place_address,
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
          className='object-cover'
          src={photoUrl ? photoUrl : '/placeholder.jpg'}
          alt={activity?.place_name}
          fill
        />
      </div>
      {/* Content Section */}
      <div className='p-4 flex flex-col gap-2'>
        <h2 className='font-semibold text-lg'>{activity?.place_name}</h2>
        {/* Details */}

        <p className='text-gray-500 line-clamp-2'>{activity?.place_details}</p>
        <p className='flex line-clamp-1 gap-2'>
          <Ticket /> {activity?.ticket_pricing}
        </p>
        <p className='flex line-clamp-1 gap-2'>
          <Clock />
          {activity?.time_travel_each_location}
        </p>
        <p className='flex text-primary line-clamp-1 gap-2'>
          <span>Best Time to Visit:</span>
          {activity?.best_time_to_visit}
        </p>
        <Link
          href={`https://www.google.com/maps/search/?api=1&query=${activity?.place_name}`}
          target='_blank'
          rel='noopener noreferrer'
        >
          <Button className='w-full mt-2' size={'sm'} variant={'outline'}>
            View <ExternalLink />
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default PlaceCardItem;
