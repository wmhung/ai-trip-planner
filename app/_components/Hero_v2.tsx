'use client';

import React, { useState } from 'react';

import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Send, Globe2, Plane, Landmark } from 'lucide-react';
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
  },
  {
    title: 'Activities',
    icon: <Landmark className='text-orange-500 h-5 w-5' />,
  },
  {
    title: 'Hotels',
    icon: <Globe2 className='text-yellow-600 h-5 w-5' />,
  },
];

function Hero() {
  const { user } = useUser();
  const router = useRouter();
  const [userInput, setUserInput] = useState<string>('');

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
      {/* Content */}
      <div className='max-w-3xl w-full text-center space-y-5'>
        <h1 className='text-2xl md:text-5xl font-bold'>
          Hi, I'm your personal{' '}
          <span className='text-primary'>Trip Planner</span>
        </h1>
        <p className='text-lg'>
          Tell me what you want, and I will handle the rest: Flights, Hotels
          ...etc.
        </p>

        {/* Input Box */}
        <div>
          <div className='relative border rounded-2xl p-4 shadow'>
            <Textarea
              placeholder='Create a trip for Parise from Taiwan'
              className='w-full h-28 bg-transparent border-none focus:ring-0 shadow-none resize-none'
              onChange={(event) => {
                setUserInput(event.target.value);
              }}
              value={userInput}
            />
            <Button
              size={'icon'}
              className='absolute bottom-6 right-6'
              onClick={() => onSend()}
            >
              <Send className='h-4 w-4' />
            </Button>
          </div>
        </div>

        {/* Suggestion List */}
        <div className='flex gap-5 justify-center'>
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              className='flex items-center gap-2 border rounded-full p-2 cursor-pointer hover:bg-primary hover:text-white'
              onClick={() => setUserInput(suggestion.title)}
            >
              {suggestion.icon}
              <h2 className='text-xs'>{suggestion.title}</h2>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Hero;
