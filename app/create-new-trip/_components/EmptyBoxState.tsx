import React from 'react';
import { Globe2, Plane, Landmark } from 'lucide-react';

const suggestions = [
  {
    title: 'Travel',
    icon: <Globe2 className='text-blue-400 h-4 w-4 sm:h-5 sm:w-5' />,
  },
  {
    title: 'Flights',
    icon: <Plane className='text-green-500 h-4 w-4 sm:h-5 sm:w-5' />,
    link: 'https://www.skyscanner.com.tw/?previousCultureSource=COOKIE&redirectedFrom=www.skyscanner.net',
  },
  {
    title: 'Activities',
    icon: <Landmark className='text-orange-500 h-4 w-4 sm:h-5 sm:w-5' />,
    link: 'https://www.klook.com/zh-TW/experiences/?spm=TNA_Vertical.TopNavigation.SelectCurrency&clickId=cdbeaf9897',
  },
  {
    title: 'Hotels',
    icon: <Globe2 className='text-yellow-600 h-4 w-4 sm:h-5 sm:w-5' />,
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
    <div className='mt-6 px-1 sm:px-2 md:px-4'>
      <h2 className='font-bold text-xl sm:text-2xl text-center'>
        Start Planning new Trip using{' '}
        <strong className='text-primary'>Finding Neverland</strong>
      </h2>

      <p className='text-center mt-3 text-gray-400 text-xs sm:text-sm'>
        Plan your dream trip in seconds! Explore top destinations, find the best
        experiences, and let AI handle the details—so you can just enjoy the
        journey.
      </p>

      <div className='flex flex-col gap-3 mt-5 sm:flex-row sm:flex-wrap justify-center'>
        {suggestions.map((suggestion, index) => {
        

          return (
            <div
              key={index}
              onClick={() => handleClick(suggestion)}
              className='flex items-center gap-2 border rounded-xl p-1 cursor-pointer transition w-full sm:w-[200px] sm:p-3 duration-300 hover:bg-gray-100' 
            >
              {suggestion.icon}
              <h2 className='text-sm sm:text-base flex items-center gap-1 truncate'>
                {suggestion.title}
              </h2>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default EmptyBoxState;
