import React from 'react';
import { Globe2, Plane, Landmark, ExternalLink } from 'lucide-react';

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
    title: 'Hotels',
    icon: <Globe2 className='text-yellow-600 h-5 w-5' />,
    link: 'https://www.booking.com/index.zh-tw.html?aid=2311236',
  },
];

function EmptyBoxState({ onSelectOption }: any) {
  const handleClick = (suggestion: any) => {
    if (suggestion.link) {
      console.log('[Outbound Click]', {
        title: suggestion.title,
        url: suggestion.link,
      });

      window.open(suggestion.link, '_blank', 'noopener,noreferrer');
    } else {
      onSelectOption(suggestion.title);
    }
  };

  return (
    <div className='mt-7'>
      <h2 className='font-bold text-2xl text-center'>
        Start Planning new Trip using{' '}
        <strong className='text-primary'>Finding Neverland</strong>
      </h2>

      <p className='text-center mt-4 text-gray-400'>
        Plan your dream trip in seconds! Explore top destinations, find the best
        experiences, and let AI handle the details—so you can just enjoy the
        journey."
      </p>

      <div className='flex flex-col gap-5 mt-7'>
        {suggestions.map((suggestion, index) => {
          const isExternal = !!suggestion.link;

          return (
            <div
              key={index}
              onClick={() => handleClick(suggestion)}
              className={`
                flex items-center gap-2 border rounded-xl p-3 cursor-pointer
                transition
                ${
                  isExternal
                    ? 'hover:border-primary/50'
                    : 'hover:border-primary hover:text-primary'
                }
              `}
            >
              {suggestion.icon}

              <h2 className='text-lg flex items-center gap-1'>
                {suggestion.title}
                {isExternal && <ExternalLink className='h-3 w-3 opacity-60' />}
              </h2>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default EmptyBoxState;
