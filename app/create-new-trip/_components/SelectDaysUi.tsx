'use client';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';

function SelectDaysUi({ onSelectedOption }: any) {
  const [days, setDays] = useState(1);

  const increment = () => setDays((prev) => prev + 1);
  const decrement = () => setDays((prev) => (prev > 1 ? prev - 1 : 1));

  const handleSubmit = () => {
    onSelectedOption(`${days} days`);
  };

  return (
    <div className='mt-3 p-4 border rounded-xl bg-white'>
      <h2 className='text-lg font-semibold mb-3'>How long is your trip?</h2>

      {/* Counter */}
      <div className='flex items-center justify-center gap-4 mb-4'>
        <Button
          variant='outline'
          onClick={decrement}
          className='w-10 h-10 rounded-full'
        >
          −
        </Button>

        <div className='text-3xl font-bold w-14 text-center'>{days}</div>

        <Button
          variant='outline'
          onClick={increment}
          className='w-10 h-10 rounded-full'
        >
          +
        </Button>
      </div>

      {/* Submit */}
      <Button className='w-full' onClick={handleSubmit}>
        Submit
      </Button>
    </div>
  );
}

export default SelectDaysUi;
