import React from 'react';
import { Globe2, Plane, Landmark } from 'lucide-react';

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

function EmptyBoxState({ onSelectOption }: any) {
  return (
    <div className='mt-7'>
      <h2 className='font-bold text-2xl text-center'>
        Start Planning new <strong className='text-primary'>Trip</strong> using
        AI
      </h2>
      <p className='text-center mt-4 text-gray-400'>
        Discover persnoal travel itineraries, find the best destinations, and
        plan your dream vacation effortlessly with the power of AI. Let our
        smart assistant do the hard work while you enjoy the journey.
      </p>
      <div className='flex flex-col gap-5 mt-7'>
        {suggestions.map((suggestion, index) => (
          <div
            key={index}
            onClick={() => onSelectOption(suggestion.title)}
            className='flex items-center gap-2 border rounded-xl p-3 cursor-pointer hover:border-primary hover:text-primary'
          >
            {suggestion.icon}
            <h2 className='text-llg'>{suggestion.title}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}

export default EmptyBoxState;
