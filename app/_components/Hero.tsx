'use client';

import React, { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Send, Globe2, CarFront, Plane, Landmark } from 'lucide-react';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

const suggestions = [
  {
    title: 'Travel',
    icon: <Globe2 className='text-blue-400 h-5 w-5' />,
  },
  {
    title: 'Flights',
    icon: <Plane className='text-green-500 h-5 w-5' />,
    link: 'https://www.skyscanner.com.tw/?previousCultureSource=COOKIE&redirectedFrom=www.skyscanner.net',
  },
  {
    title: 'Activities',
    icon: <Landmark className='text-orange-500 h-5 w-5' />,
    link: 'https://www.klook.com/zh-TW/experiences/?spm=TNA_Vertical.TopNavigation.SelectCurrency&clickId=cdbeaf9897',
  },
  {
    title: 'Car Rental',
    icon: <CarFront className='text-yellow-600 h-5 w-5' />,
    link: 'https://www.klook.com/zh-TW/car-rentals/',
  },
];

function Hero() {
  const { user } = useUser();
  const router = useRouter();
  const [userInput, setUserInput] = useState('');

  const onSend = () => {
    if (!user) {
      router.push('/sign-in');
      return;
    }

    if (!userInput.trim()) return;

    router.push(`/create-new-trip?prompt=${encodeURIComponent(userInput)}`);
  };

  return (
    <div className='mt-24 w-full flex justify-center'>
      <div className='max-w-3xl w-full text-center space-y-5'>
        <h1 className='text-2xl md:text-5xl font-bold'>
          Let's find your <span className='text-primary'>Neverland</span>
        </h1>

        <p className='text-lg'>
          Tell me what you are looking for, travel, flights, activities, or
          hotels.
        </p>

        {/* Input Box */}
        <div>
          <div className='relative border rounded-2xl p-4 shadow'>
            <Textarea
              placeholder='Create a trip for Paris from Taiwan'
              className='w-full h-28 bg-transparent border-none focus:ring-0 shadow-none resize-none'
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
            />
            <Button
              size='icon'
              className='absolute bottom-6 right-6'
              onClick={onSend}
            >
              <Send className='h-4 w-4' />
            </Button>
          </div>
        </div>

        {/* Suggestion List */}
        <div className='flex gap-5 justify-center'>
          {suggestions.map((suggestion, index) => {
            const isExternal = !!suggestion.link;

            return (
              <div
                key={index}
                onClick={() => {
                  if (isExternal && suggestion.link) {
                    window.open(
                      suggestion.link,
                      '_blank',
                      'noopener,noreferrer'
                    );
                  } else {
                    setUserInput(suggestion.title);
                  }
                }}
                className='flex items-center gap-2 border rounded-full p-2 cursor-pointer transition duration-300 hover:bg-gray-100'
              >
                {suggestion.icon}
                <h2 className='text-xs'>{suggestion.title}</h2>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Hero;
